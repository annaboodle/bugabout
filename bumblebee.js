(function exposeBumblebee(global) {
  "use strict";

  // Rimsky-Korsakov's "Flight of the Bumblebee" (1900) is public domain, but any
  // recording of it carries its own copyright. So the piece is synthesised from
  // note data rather than shipped as audio: nothing to license, and no binary in
  // the repo. This is its opening chromatic figure, looped.
  const PHRASE = [
    76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65,
    64, 65, 66, 67, 66, 65, 64, 63, 64, 65, 66, 67,
    68, 69, 70, 71, 72, 73, 74, 75, 76, 75, 74, 73,
    72, 71, 70, 69, 68, 67, 66, 65, 64, 65, 66, 67,
  ];

  const NOTE_SECONDS = 0.075;
  const LOOKAHEAD_SECONDS = 0.25;
  const TICK_MS = 60;

  let context = null;
  let master = null;
  let reverb = null;
  let timer = null;
  let nextNoteAt = 0;
  let step = 0;
  let rate = 1;
  let voiceName = "strings";

  const supported = () =>
    typeof AudioContext === "function" || typeof webkitAudioContext === "function";

  const frequency = (midi) => 440 * 2 ** ((midi - 69) / 12);

  // A short synthetic hall. Nothing reads as "electronic" faster than a note
  // that stops dead the moment it ends.
  function buildReverb(ctx, seconds = 1.6, decay = 3.2) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
      }
    }
    const convolver = ctx.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }

  function harmonicWave(ctx, partials) {
    const real = new Float32Array(partials.length + 1);
    const imag = new Float32Array(partials.length + 1);
    partials.forEach((amplitude, i) => {
      imag[i + 1] = amplitude;
    });
    return ctx.createPeriodicWave(real, imag, { disableNormalization: false });
  }

  // Each voice returns the nodes it wants stopped, so the scheduler stays generic.
  const VOICES = {
    strings: {
      label: "Strings",
      gain: 0.05,
      wet: 0.32,
      build(ctx, midi, at, seconds, out) {
        const hz = frequency(midi);
        const envelope = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2600, at);
        filter.Q.value = 0.8;

        // Two voices a few cents apart: the beating between them is most of what
        // makes an ensemble sound like more than one player.
        const oscillators = [-7, 7].map((detune) => {
          const oscillator = ctx.createOscillator();
          oscillator.type = "sawtooth";
          oscillator.frequency.value = hz;
          oscillator.detune.value = detune;
          oscillator.connect(filter);
          return oscillator;
        });

        envelope.gain.setValueAtTime(0, at);
        envelope.gain.linearRampToValueAtTime(1, at + seconds * 0.35);
        envelope.gain.setValueAtTime(1, at + seconds * 0.72);
        envelope.gain.exponentialRampToValueAtTime(0.001, at + seconds * 1.9);
        filter.connect(envelope).connect(out);
        return { oscillators, stopAt: at + seconds * 1.9 };
      },
    },

    piano: {
      label: "Piano",
      gain: 0.07,
      wet: 0.22,
      build(ctx, midi, at, seconds, out) {
        const oscillator = ctx.createOscillator();
        oscillator.setPeriodicWave(harmonicWave(ctx, [1, 0.55, 0.32, 0.18, 0.1, 0.06]));
        oscillator.frequency.value = frequency(midi);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        // The filter closing as the note decays is what reads as a struck string.
        filter.frequency.setValueAtTime(5200, at);
        filter.frequency.exponentialRampToValueAtTime(900, at + seconds * 2.4);

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0, at);
        envelope.gain.linearRampToValueAtTime(1, at + 0.004);
        envelope.gain.exponentialRampToValueAtTime(0.001, at + seconds * 2.6);

        oscillator.connect(filter).connect(envelope).connect(out);
        return { oscillators: [oscillator], stopAt: at + seconds * 2.6 };
      },
    },

    flute: {
      label: "Flute",
      gain: 0.075,
      wet: 0.38,
      build(ctx, midi, at, seconds, out) {
        const oscillator = ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency(midi);

        // A quiet second partial keeps it from sounding like a test tone.
        const overtone = ctx.createOscillator();
        overtone.type = "sine";
        overtone.frequency.value = frequency(midi + 12);
        const overtoneGain = ctx.createGain();
        overtoneGain.gain.value = 0.12;

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0, at);
        envelope.gain.linearRampToValueAtTime(1, at + seconds * 0.4);
        envelope.gain.exponentialRampToValueAtTime(0.001, at + seconds * 1.6);

        oscillator.connect(envelope);
        overtone.connect(overtoneGain).connect(envelope);
        envelope.connect(out);
        return { oscillators: [oscillator, overtone], stopAt: at + seconds * 1.6 };
      },
    },

    pizzicato: {
      label: "Pizzicato",
      gain: 0.09,
      wet: 0.3,
      build(ctx, midi, at, seconds, out) {
        const oscillator = ctx.createOscillator();
        oscillator.type = "triangle";
        oscillator.frequency.value = frequency(midi);

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = frequency(midi) * 2.4;
        filter.Q.value = 3;

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0, at);
        envelope.gain.linearRampToValueAtTime(1, at + 0.003);
        envelope.gain.exponentialRampToValueAtTime(0.001, at + seconds * 1.4);

        oscillator.connect(filter).connect(envelope).connect(out);
        return { oscillators: [oscillator], stopAt: at + seconds * 1.4 };
      },
    },

    musicbox: {
      label: "Music box",
      gain: 0.085,
      wet: 0.45,
      build(ctx, midi, at, seconds, out) {
        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0, at);
        envelope.gain.linearRampToValueAtTime(1, at + 0.002);
        envelope.gain.exponentialRampToValueAtTime(0.001, at + seconds * 3.2);

        // Struck metal: a bright inharmonic partial over a clean fundamental.
        const oscillators = [
          [12, 1],
          [24, 0.28],
          [31, 0.12],
        ].map(([offset, amplitude]) => {
          const oscillator = ctx.createOscillator();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency(midi + offset);
          const gain = ctx.createGain();
          gain.gain.value = amplitude;
          oscillator.connect(gain).connect(envelope);
          return oscillator;
        });

        envelope.connect(out);
        return { oscillators, stopAt: at + seconds * 3.2 };
      },
    },

    buzz: {
      label: "Synth buzz",
      gain: 0.055,
      wet: 0.1,
      build(ctx, midi, at, seconds, out) {
        const oscillator = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const envelope = ctx.createGain();
        oscillator.type = "sawtooth";
        oscillator.frequency.value = frequency(midi);
        filter.type = "lowpass";
        filter.frequency.value = 1400;
        filter.Q.value = 6;
        envelope.gain.setValueAtTime(0, at);
        envelope.gain.linearRampToValueAtTime(1, at + 0.008);
        envelope.gain.exponentialRampToValueAtTime(0.001, at + seconds * 0.9);
        oscillator.connect(filter).connect(envelope).connect(out);
        return { oscillators: [oscillator], stopAt: at + seconds };
      },
    },
  };

  function ensureContext() {
    if (context) return context;
    const Ctor = global.AudioContext ?? global.webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
    master = context.createGain();
    master.connect(context.destination);
    reverb = buildReverb(context);
    reverb.connect(master);
    return context;
  }

  function playNote(midi, at, seconds, accent) {
    const voice = VOICES[voiceName] ?? VOICES.strings;
    const level = context.createGain();
    // Accent the first of each group of four, and vary the rest slightly. Even
    // rows of identical notes are the giveaway that nobody is playing them.
    level.gain.value = voice.gain * (accent ? 1 : 0.72 + Math.random() * 0.16);

    const wet = context.createGain();
    wet.gain.value = voice.wet;
    level.connect(master);
    level.connect(wet).connect(reverb);

    const { oscillators, stopAt } = voice.build(context, midi, at, seconds, level);
    for (const oscillator of oscillators) {
      oscillator.start(at);
      oscillator.stop(stopAt);
    }
  }

  function schedule() {
    const seconds = NOTE_SECONDS / rate;
    while (nextNoteAt < context.currentTime + LOOKAHEAD_SECONDS) {
      // A hair of timing scatter, for the same reason as the dynamics.
      const jitter = (Math.random() - 0.5) * seconds * 0.06;
      playNote(PHRASE[step % PHRASE.length], nextNoteAt + jitter, seconds, step % 4 === 0);
      nextNoteAt += seconds;
      step += 1;
    }
  }

  function start() {
    if (!ensureContext() || timer) return;
    if (context.state === "suspended") context.resume();
    nextNoteAt = context.currentTime + 0.05;
    timer = global.setInterval(schedule, TICK_MS);
    schedule();
  }

  function stop() {
    if (!timer) return;
    global.clearInterval(timer);
    timer = null;
    step = 0;
  }

  function setVoice(name) {
    if (VOICES[name]) voiceName = name;
  }

  function setRate(value) {
    rate = Math.min(Math.max(value, 0.5), 2);
  }

  const voices = () => Object.entries(VOICES).map(([id, v]) => ({ id, label: v.label }));
  const voice = () => voiceName;
  const playing = () => Boolean(timer);

  global.BugaboutBumblebee = Object.freeze({
    start,
    stop,
    setRate,
    setVoice,
    voice,
    voices,
    playing,
    supported,
  });
})(window);
