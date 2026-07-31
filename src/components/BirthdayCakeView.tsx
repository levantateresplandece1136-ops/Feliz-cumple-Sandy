import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RefreshCw, Flame, Gift, Volume2 } from 'lucide-react';

interface BirthdayCakeViewProps {
  onGoToWishes: () => void;
}

export const BirthdayCakeView: React.FC<BirthdayCakeViewProps> = ({ onGoToWishes }) => {
  // 5 candles corresponding to S-A-N-D-Y
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true, true]);
  const [wishRevealed, setWishRevealed] = useState<boolean>(false);

  const candleLetters = ['S', 'A', 'N', 'D', 'Y'];

  const extinguishCandle = (index: number) => {
    if (!candles[index]) return; // Already extinguished

    soundEngine.playCandleBlow();

    const nextState = [...candles];
    nextState[index] = false;
    setCandles(nextState);

    // Check if all are blown out
    if (nextState.every((c) => !c)) {
      setTimeout(() => {
        setWishRevealed(true);
        soundEngine.playBirthdayFanfare();
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#c9a86a', '#f2ecd8', '#b98a95', '#ffffff', '#e2b85c']
        });
      }, 500);
    }
  };

  const relightCandles = () => {
    setCandles([true, true, true, true, true]);
    setWishRevealed(false);
    soundEngine.playChime();
  };

  const blowAllCandles = () => {
    soundEngine.playCandleBlow();
    setCandles([false, false, false, false, false]);
    setTimeout(() => {
      setWishRevealed(true);
      soundEngine.playBirthdayFanfare();
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#c9a86a', '#f2ecd8', '#b98a95', '#ffffff']
      });
    }, 400);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 pb-24 text-center">
      {/* Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 text-[#c9a86a] font-sans text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
          Celebración Especial
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#f2ecd8]">
          Pastel de Cumpleaños para <span className="italic text-[#c9a86a]">Sandy</span>
        </h2>
        <p className="font-sans text-xs text-[#d8d3c1]/70 max-w-sm mx-auto">
          Pide un deseo con todo tu corazón y toca las llamas de las velas <span className="text-[#c9a86a] font-semibold">S-A-N-D-Y</span> para apagarlas.
        </p>
      </div>

      {/* Birthday Cake Interactive Container */}
      <div className="relative py-8 my-4 flex flex-col items-center justify-center">
        {/* Glow behind cake */}
        <div className="absolute w-64 h-64 bg-[#c9a86a]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Candles Row */}
        <div className="flex items-end justify-center gap-4 sm:gap-6 z-20 mb-[-12px]">
          {candles.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => extinguishCandle(idx)}
              className="flex flex-col items-center cursor-pointer group transition-transform active:scale-95"
            >
              {/* Flame element */}
              <div className="h-10 flex items-center justify-center">
                {isLit ? (
                  <div className="relative animate-flicker">
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_15px_#f59e0b,0_0_30px_#fef08a]" />
                    <div className="absolute inset-0 w-2 h-4 m-auto rounded-full bg-white opacity-80 blur-[1px]" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {/* Wispy Smoke line */}
                    <div className="w-1 h-5 bg-[#d8d3c1]/30 rounded-full animate-ping opacity-30" />
                    <Flame className="w-4 h-4 text-[#d8d3c1]/20" />
                  </div>
                )}
              </div>

              {/* Candle Stick */}
              <div className="w-5 h-16 sm:h-20 rounded-t-lg bg-gradient-to-b from-[#f2ecd8] via-[#c9a86a]/80 to-[#b98a95] border border-[#c9a86a] flex flex-col items-center justify-between py-2 shadow-md relative overflow-hidden">
                <span className="font-serif font-bold text-xs text-[#0a0e1f] z-10">
                  {candleLetters[idx]}
                </span>
                <div className="w-full h-1 bg-[#c9a86a]/50" />
              </div>
            </div>
          ))}
        </div>

        {/* Cake Layers */}
        <div className="relative z-10 w-64 sm:w-80">
          {/* Top Layer */}
          <div className="h-12 bg-gradient-to-r from-[#b98a95] via-[#c9a86a] to-[#b98a95] rounded-t-3xl border-t-2 border-[#f2ecd8] shadow-inner relative flex items-center justify-center">
            <div className="absolute inset-x-2 top-0 h-3 bg-[#f2ecd8]/80 rounded-full blur-[1px]" />
            <span className="font-serif italic text-xs text-[#0a0e1f] font-semibold tracking-wider">
              ¡Feliz Cumpleaños!
            </span>
          </div>

          {/* Middle Decorative Icing */}
          <div className="h-4 bg-[#f2ecd8] flex items-center justify-around px-4 border-y border-[#c9a86a]/40">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full bg-[#b98a95]" />
            ))}
          </div>

          {/* Bottom Cake Base */}
          <div className="h-16 bg-gradient-to-r from-[#232c4f] via-[#131a33] to-[#232c4f] rounded-b-2xl border-b-2 border-[#c9a86a] p-3 flex flex-col items-center justify-center shadow-2xl relative">
            <span className="font-serif text-lg text-[#f2ecd8] font-light tracking-widest">
              SIEMPRE AMADA
            </span>
            <div className="w-1/2 h-[1px] bg-[#c9a86a]/40 my-1" />
          </div>

          {/* Cake Plate Stand */}
          <div className="w-72 sm:w-96 h-4 bg-gradient-to-r from-[#c9a86a]/30 via-[#f2ecd8]/80 to-[#c9a86a]/30 rounded-full mx-auto -mt-1 shadow-2xl border border-[#c9a86a]" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3">
        {candles.some((c) => c) ? (
          <button
            onClick={blowAllCandles}
            className="px-5 py-2.5 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#f2ecd8] transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(201,168,106,0.3)] active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>Soplar todas las velas</span>
          </button>
        ) : (
          <button
            onClick={relightCandles}
            className="px-5 py-2.5 rounded-full bg-[#131a33] border border-[#c9a86a] text-[#c9a86a] font-sans text-xs uppercase tracking-widest hover:bg-[#c9a86a]/20 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Volver a encender</span>
          </button>
        )}
      </div>

      {/* Secret Birthday Wish Revealed Card */}
      <AnimatePresence>
        {wishRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="glass-panel-gold p-6 rounded-3xl border-2 border-[#c9a86a] space-y-4 shadow-[0_0_40px_rgba(201,168,106,0.3)] text-left relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#c9a86a]/30">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#c9a86a]" />
                <h3 className="font-serif text-xl font-semibold text-[#f2ecd8]">
                  ¡Deseo de Cumpleaños Desbloqueado!
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-[#c9a86a] animate-spin" />
            </div>

            <p className="font-serif italic text-lg text-[#f2ecd8] leading-relaxed">
              "Que el Dios de toda gracia siga guiando tus días con cánticos de liberación, rodeando tu hogar de paz y renovando tus fuerzas como las de las águilas. ¡Feliz Cumpleaños, Sandy!"
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-[#c9a86a]">
              <span className="font-sans flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#b98a95] fill-[#b98a95]" />
                Con todo nuestro amor
              </span>

              <button
                onClick={onGoToWishes}
                className="px-4 py-1.5 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs tracking-wide hover:bg-[#f2ecd8] transition-all"
              >
                Ver Muro de Deseos →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
