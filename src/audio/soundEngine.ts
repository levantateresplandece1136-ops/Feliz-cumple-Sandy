// Web Audio API Synthesizer for "Siempre Estuviste Siendo Amada"

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private padMaster: GainNode | null = null;
  private padOscillators: OscillatorNode[] = [];
  private isPadRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.padMaster && this.ctx) {
      if (this.isMuted) {
        this.padMaster.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
      } else if (this.isPadRunning) {
        this.padMaster.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.8);
      }
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playHeartbeat() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const t = now + i * 0.85;

      // Pulse 1
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(56, t);
      osc1.frequency.exponentialRampToValueAtTime(32, t + 0.35);

      gain1.gain.setValueAtTime(0, t);
      gain1.gain.linearRampToValueAtTime(0.32, t + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.4);

      // Pulse 2 (shorter echo)
      const t2 = t + 0.24;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(48, t2);
      osc2.frequency.exponentialRampToValueAtTime(28, t2 + 0.28);

      gain2.gain.setValueAtTime(0, t2);
      gain2.gain.linearRampToValueAtTime(0.22, t2 + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.3);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.35);
    }
  }

  public startAmbientPad() {
    if (this.isPadRunning) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [130.81, 164.81, 196.0, 261.63]; // C3, E3, G3, C4 warm chord
      this.padMaster = this.ctx.createGain();
      this.padMaster.gain.setValueAtTime(0, this.ctx.currentTime);
      this.padMaster.connect(this.ctx.destination);

      const targetGain = this.isMuted ? 0 : 0.05;
      this.padMaster.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 3);

      this.padOscillators = notes.map((freq) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        g.gain.value = 1 / notes.length;
        osc.connect(g);
        g.connect(this.padMaster!);
        osc.start();
        return osc;
      });

      this.isPadRunning = true;
    } catch {
      // Graceful fallback
    }
  }

  public playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((f, i) => {
      const t = now + i * 0.12;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t);
      osc.stop(t + 1.9);
    });
  }

  public playPianoMelody() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Ascending warm melody
    const notes = [392.0, 440.0, 493.88, 587.33, 659.25]; // G4, A4, B4, D5, E5
    notes.forEach((f, i) => {
      const t = now + i * 0.38;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t);
      osc.stop(t + 1.5);
    });
  }

  public playBirthdayFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Birthday motif: G4 G4 A4 G4 C5 B4
    const sequence = [
      { f: 392.0, d: 0.3, delay: 0 },
      { f: 392.0, d: 0.3, delay: 0.35 },
      { f: 440.0, d: 0.6, delay: 0.7 },
      { f: 392.0, d: 0.6, delay: 1.35 },
      { f: 523.25, d: 0.6, delay: 2.0 },
      { f: 493.88, d: 1.2, delay: 2.65 },
    ];

    sequence.forEach((item) => {
      const t = now + item.delay;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + item.d);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t);
      osc.stop(t + item.d + 0.1);
    });
  }

  public playCandleBlow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Soft wind / sparkle
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(now);

    // Add sparkle chime after blow
    setTimeout(() => {
      this.playChime();
    }, 300);
  }
}

export const soundEngine = new SoundEngine();
