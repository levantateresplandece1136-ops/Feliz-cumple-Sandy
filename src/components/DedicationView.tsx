import React from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, Music } from 'lucide-react';

export const DedicationView: React.FC = () => {
  const triggerCelebration = () => {
    soundEngine.playBirthdayFanfare();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c9a86a', '#f2ecd8', '#b98a95', '#ffffff']
    });
  };

  const acrosticSummary = [
    { letter: 'S', word: 'Sostenida' },
    { letter: 'A', word: 'Amada' },
    { letter: 'N', word: 'Nueva' },
    { letter: 'D', word: 'Dádiva' },
    { letter: 'Y', word: 'Y aún no termina' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-8 pb-24 text-center">
      {/* Decorative Heart Icon Header */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a86a]/20 to-[#b98a95]/20 border border-[#c9a86a] mx-auto flex items-center justify-center text-[#c9a86a] shadow-[0_0_30px_rgba(201,168,106,0.3)] animate-pulse">
        <Heart className="w-10 h-10 text-[#c9a86a] fill-[#c9a86a]/20" />
      </div>

      {/* Main Letter Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#c9a86a]/40 space-y-6 text-left relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#c9a86a]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-1 pb-4 border-b border-[#c9a86a]/20">
          <span className="font-sans text-xs text-[#c9a86a] uppercase tracking-[0.25em] font-medium">
            Carta de Cumpleaños
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#f2ecd8] font-light">
            Para <span className="italic font-semibold text-[#c9a86a]">Sandy</span>
          </h2>
        </div>

        <div className="space-y-4 font-serif text-lg sm:text-xl text-[#f2ecd8] leading-relaxed">
          <p>
            No quería regalarte algo que con el tiempo se rompiera o se quedara olvidado en un cajón.
          </p>

          <p className="italic text-[#d8d3c1]">
            Quería regalarte algo que te recordara siempre lo que Dios ha hecho contigo y el milagro que es tu vida para todos nosotros.
          </p>

          <p>
            Gracias por dejarme escribir algunos capítulos de esta hermosa historia a tu lado, por tu sonrisa que ilumina la casa y por tu amor incondicional.
          </p>
        </div>

        {/* S-A-N-D-Y Acrostic Row */}
        <div className="pt-4 border-t border-[#c9a86a]/20">
          <p className="font-sans text-[11px] text-[#c9a86a] uppercase tracking-widest text-center mb-3">
            El testimonio de tu nombre
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {acrosticSummary.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#131a33] border border-[#c9a86a]/30"
              >
                <span className="w-5 h-5 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-serif font-bold text-xs flex items-center justify-center">
                  {item.letter}
                </span>
                <span className="font-sans text-xs text-[#f2ecd8]">{item.word}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dedication Sign-off */}
        <div className="pt-4 text-center space-y-2 border-t border-[#c9a86a]/20">
          <p className="font-serif italic text-2xl text-[#c9a86a] font-semibold">
            Te amo, Sandy.
          </p>
          <p className="font-sans text-xs text-[#b98a95] tracking-widest uppercase">
            ¡Feliz Cumpleaños!
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={triggerCelebration}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#f2ecd8] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,168,106,0.3)] active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>¡Celebrar con Confeti!</span>
        </button>

        <button
          onClick={() => soundEngine.playPianoMelody()}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#131a33] border border-[#c9a86a]/40 text-[#c9a86a] font-sans text-xs uppercase tracking-widest hover:bg-[#c9a86a]/15 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Music className="w-4 h-4" />
          <span>Escuchar Melodía</span>
        </button>
      </div>
    </div>
  );
};
