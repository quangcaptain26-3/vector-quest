/**
 * Zero-asset Web Audio API synthesizer for cockpit tactile SFX.
 * Every call is guarded against SSR, missing AudioContext, and browser autoplay blocks.
 */

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    if (!sharedContext) {
      const AudioCtor =
        window.AudioContext ??
        (window as WindowWithWebkitAudio).webkitAudioContext;
      if (!AudioCtor) {
        return null;
      }
      sharedContext = new AudioCtor();
    }

    if (sharedContext.state === "suspended") {
      void sharedContext.resume().catch(() => undefined);
    }

    return sharedContext;
  } catch {
    return null;
  }
}

function playTone(
  frequencyHz: number,
  durationSec: number,
  type: OscillatorType,
  gainPeak: number,
  delaySec = 0
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const startTime = ctx.currentTime + delaySec;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequencyHz, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + durationSec + 0.02);
  } catch {
    // Ignore autoplay policy or suspended context errors gracefully
  }
}

/** Subtle cockpit switch click */
export function playClick(enabled = true): void {
  if (!enabled) return;
  playTone(760, 0.055, "triangle", 0.05);
}

/** Ascending emerald chime for correct prediction or successful landing */
export function playSuccess(enabled = true): void {
  if (!enabled) return;
  playTone(523.25, 0.14, "sine", 0.07, 0);
  playTone(659.25, 0.14, "sine", 0.07, 0.09);
  playTone(783.99, 0.22, "sine", 0.08, 0.18);
}

/** Gentle low double-tone alert for wrong answer or failed landing */
export function playAlert(enabled = true): void {
  if (!enabled) return;
  playTone(320, 0.14, "sawtooth", 0.045, 0);
  playTone(240, 0.18, "sawtooth", 0.045, 0.13);
}
