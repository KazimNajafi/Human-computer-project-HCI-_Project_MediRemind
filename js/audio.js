/**
 * MediRemind — Gentle Audio Chime & Voice Guide Helper
 * Uses built-in Web Audio API (no external audio files needed)
 * and browser SpeechSynthesis API when available.
 */

const MediAudio = (function () {
  let audioCtx = null;

  function getContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(function () {});
    }
    return audioCtx;
  }

  /**
   * Play a soft, warm two-note reminder chime.
   */
  function playReminderChime() {
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      playTone(ctx, 523.25, now, 0.22, 0.12);       // C5
      playTone(ctx, 659.25, now + 0.24, 0.30, 0.12); // E5
    } catch (_err) {
      // Audio blocked or unsupported — fail silently without console error
    }
  }

  /**
   * Play a pleasant positive confirmation tone when pressing Taken or Save.
   */
  function playSuccessTone() {
    try {
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      playTone(ctx, 587.33, now, 0.16, 0.1);        // D5
      playTone(ctx, 880.0, now + 0.16, 0.28, 0.1);  // A5
    } catch (_err) {
      // Ignore if audio unavailable
    }
  }

  function playTone(ctx, freq, startTime, duration, volume) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  /**
   * Read text aloud slowly and clearly for elderly users.
   */
  function speak(text, lang) {
    try {
      if (!("speechSynthesis" in window)) return false;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "ur" ? "ur-PK" : "en-US";
      utterance.rate = 0.88; // Slightly slower for elderly clarity
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (_err) {
      return false;
    }
  }

  function stopSpeaking() {
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch (_err) {
      // Ignore
    }
  }

  return {
    playReminderChime: playReminderChime,
    playSuccessTone: playSuccessTone,
    speak: speak,
    stopSpeaking: stopSpeaking
  };
})();
