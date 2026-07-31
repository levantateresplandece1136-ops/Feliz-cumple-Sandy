import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EPISODES_DATA } from '../data/episodesData';
import { soundEngine } from '../audio/soundEngine';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Sparkles,
  Heart,
  Grid
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CinematicPlayerProps {
  onEpisodeChange: (shadowOffset: string) => void;
  onNavigateTab: (tab: 'acrostic' | 'cake' | 'dedication') => void;
}

export const CinematicPlayer: React.FC<CinematicPlayerProps> = ({
  onEpisodeChange,
  onNavigateTab
}) => {
  // Step index: 0 = prelude 1, 1 = prelude 2, 2 = intro title, 3..11 = ep 1..9, 12 = closing
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState<boolean>(false);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        handleNext();
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  // Audio trigger & moon shadow update when step changes
  useEffect(() => {
    let shadowOffset = '-78%';
    if (step === 0 || step === 1) {
      soundEngine.playHeartbeat();
      shadowOffset = '-78%';
    } else if (step === 2) {
      soundEngine.startAmbientPad();
      shadowOffset = '-78%';
    } else if (step >= 3 && step <= 11) {
      const epIndex = step - 3;
      const ep = EPISODES_DATA[epIndex];
      if (ep) {
        shadowOffset = ep.shadowOffsetX;
        if (ep.audioCue === 'heartbeat') soundEngine.playHeartbeat();
        else if (ep.audioCue === 'piano') soundEngine.playPianoMelody();
        else if (ep.audioCue === 'chime') soundEngine.playChime();
        else if (ep.audioCue === 'celebration') {
          soundEngine.playBirthdayFanfare();
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }
      }
    } else if (step === 12) {
      soundEngine.playChime();
      shadowOffset = '78%';
    }

    onEpisodeChange(shadowOffset);
  }, [step]);

  const handleNext = () => {
    if (step < 12) {
      setStep((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const currentEpIndex = step >= 3 && step <= 11 ? step - 3 : null;
  const currentEp = currentEpIndex !== null ? EPISODES_DATA[currentEpIndex] : null;

  return (
    <div className="relative w-full min-h-[calc(100vh-8rem)] flex flex-col justify-between items-center px-4 py-6 text-center select-none max-w-xl mx-auto">
      {/* Top Bar Indicators & Drawer button */}
      <div className="w-full flex items-center justify-between text-xs text-[#c9a86a]/80 mb-2 px-2 z-20">
        <button
          onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131a33]/80 border border-[#c9a86a]/30 hover:border-[#c9a86a] text-[#f2ecd8] transition-all"
        >
          <Grid className="w-3.5 h-3.5 text-[#c9a86a]" />
          <span>Capítulos</span>
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 13 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === step
                  ? 'bg-[#c9a86a] w-3 shadow-[0_0_8px_#c9a86a]'
                  : idx < step
                  ? 'bg-[#f2ecd8]/50'
                  : 'bg-[#131a33]/60 border border-[#f2ecd8]/20'
              }`}
            />
          ))}
        </div>

        {/* Play/Pause Auto-sequence toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 rounded-full bg-[#131a33]/80 border border-[#c9a86a]/30 text-[#c9a86a] hover:bg-[#c9a86a]/20 transition-all"
          title={isPlaying ? 'Pausar avance automático' : 'Avance automático'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Scene Content Container with Motion Animation */}
      <div className="w-full flex-1 flex flex-col items-center justify-center py-6 my-auto z-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: Prelude line 1 */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-md my-auto"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 text-[#c9a86a] font-sans text-xs uppercase tracking-widest">
                Prólogo
              </span>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#f2ecd8] leading-relaxed">
                "Dicen que una vida se mide por los años que vivimos..."
              </p>
            </motion.div>
          )}

          {/* STEP 1: Prelude line 2 */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-md my-auto"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 text-[#c9a86a] font-sans text-xs uppercase tracking-widest">
                Reflexión
              </span>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#d8d3c1] leading-relaxed">
                "...pero quizá una vida se mide por las personas que tocamos sin darnos cuenta."
              </p>
            </motion.div>
          )}

          {/* STEP 2: Title Intro */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1 }}
              className="space-y-6 my-auto max-w-md"
            >
              <div className="w-16 h-16 rounded-full bg-[#c9a86a]/15 border border-[#c9a86a]/50 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(201,168,106,0.3)]">
                <Sparkles className="w-8 h-8 text-[#c9a86a] animate-pulse" />
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#f2ecd8] leading-tight font-light tracking-wide">
                Siempre Estuviste<br />
                <span className="font-normal italic text-[#c9a86a]">Siendo Amada</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#b98a95] uppercase tracking-[0.2em]">
                Una serie original — Para Sandy
              </p>
              <button
                onClick={handleNext}
                className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#c9a86a]/20 to-[#b98a95]/20 border border-[#c9a86a] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#c9a86a]/30 transition-all active:scale-95 shadow-[0_0_20px_rgba(201,168,106,0.2)]"
              >
                Comenzar Episodios
              </button>
            </motion.div>
          )}

          {/* STEP 3..11: Episodes 1..9 */}
          {currentEp && (
            <motion.div
              key={`ep-${currentEp.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7 }}
              className="w-full space-y-5 my-auto max-w-md"
            >
              {/* Acrostic Letter Badge */}
              <div className="inline-flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border border-[#c9a86a]/60 bg-[#c9a86a]/10 flex items-center justify-center font-serif text-2xl text-[#c9a86a] shadow-[0_0_15px_rgba(201,168,106,0.25)]">
                  {currentEp.letter}
                </div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#f2ecd8]/60">
                  {currentEp.letterWord}
                </span>
              </div>

              {/* Episode Label */}
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#c9a86a]">
                {currentEp.numberLabel}
              </p>

              {/* Title */}
              <h3 className="font-serif italic text-xl sm:text-2xl text-[#f2ecd8] font-medium leading-snug">
                "{currentEp.title}"
              </h3>

              {/* Main Narrative Lines */}
              <div className="space-y-3 py-2">
                {currentEp.mainLines.map((line, idx) => (
                  <p
                    key={idx}
                    className={`font-serif text-lg sm:text-xl leading-relaxed ${
                      idx === 0
                        ? 'text-[#f2ecd8]'
                        : idx === 1
                        ? 'text-[#d8d3c1] italic'
                        : 'text-[#f2ecd8]/90'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Scripture Verse Card */}
              {currentEp.quoteVerse && (
                <div className="glass-panel p-4 rounded-2xl border border-[#c9a86a]/30 mt-4 text-left space-y-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#c9a86a]/5 rounded-full blur-xl pointer-events-none" />
                  <p className="font-serif italic text-sm sm:text-base text-[#f2ecd8]/90 leading-relaxed">
                    "{currentEp.quoteVerse.text}"
                  </p>
                  <p className="font-sans text-[11px] text-[#c9a86a] text-right font-medium tracking-wide">
                    — {currentEp.quoteVerse.reference}
                  </p>
                </div>
              )}

              {/* Moon Phase Badge Footer */}
              <div className="pt-2 text-[11px] font-sans text-[#f2ecd8]/50 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f2ecd8] animate-pulse" />
                <span>Fase: {currentEp.moonPhaseLabel}</span>
              </div>
            </motion.div>
          )}

          {/* STEP 12: Final Scene / Transition to Dedication */}
          {step === 12 && (
            <motion.div
              key="step-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.9 }}
              className="space-y-6 my-auto max-w-md"
            >
              <div className="w-16 h-16 rounded-full bg-[#b98a95]/20 border border-[#b98a95]/60 mx-auto flex items-center justify-center text-[#b98a95] shadow-[0_0_30px_rgba(185,138,149,0.3)]">
                <Heart className="w-8 h-8 text-[#b98a95] fill-[#b98a95]/30 animate-pulse" />
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#f2ecd8] leading-relaxed">
                No quería regalarte algo que se rompiera...
              </h2>
              <p className="font-serif italic text-lg text-[#d8d3c1]">
                Quería regalarte algo que recordara lo que Dios ha hecho contigo.
              </p>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => onNavigateTab('dedication')}
                  className="px-6 py-3 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs uppercase tracking-widest hover:bg-[#d8d3c1] transition-all shadow-[0_0_20px_rgba(201,168,106,0.4)] active:scale-95"
                >
                  Leer Carta Completa
                </button>
                <button
                  onClick={() => onNavigateTab('cake')}
                  className="px-6 py-2.5 rounded-full bg-[#131a33] border border-[#c9a86a]/40 text-[#c9a86a] font-sans text-xs uppercase tracking-widest hover:bg-[#c9a86a]/10 transition-all"
                >
                  Ir al Pastel de Cumpleaños
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls Bar (Prev / Play / Next) */}
      <div className="w-full flex items-center justify-between gap-4 py-2 z-20">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="p-3 rounded-full bg-[#131a33]/80 border border-[#c9a86a]/30 text-[#f2ecd8] disabled:opacity-30 disabled:border-transparent hover:bg-[#c9a86a]/20 transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="font-sans text-xs text-[#c9a86a] font-medium tracking-widest uppercase">
          {step === 0 || step === 1
            ? 'Prólogo'
            : step === 2
            ? 'Inicio'
            : step === 12
            ? 'Final'
            : `Episodio ${step - 2} / 9`}
        </span>

        {step < 12 ? (
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-[#c9a86a]/20 border border-[#c9a86a] text-[#c9a86a] hover:bg-[#c9a86a] hover:text-[#0a0e1f] transition-all active:scale-90 shadow-[0_0_15px_rgba(201,168,106,0.3)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setStep(0)}
            className="p-3 rounded-full bg-[#131a33]/80 border border-[#c9a86a]/30 text-[#c9a86a] hover:bg-[#c9a86a]/20 transition-all active:scale-90"
            title="Reiniciar Serie"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Chapters Quick Select Drawer */}
      <AnimatePresence>
        {showChaptersDrawer && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-[#0a0e1f]/95 backdrop-blur-xl border-t border-[#c9a86a]/30 p-6 rounded-t-3xl max-w-lg mx-auto shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#c9a86a]/20 mb-4">
              <h3 className="font-serif text-lg text-[#f2ecd8] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#c9a86a]" />
                <span>Índice de Episodios</span>
              </h3>
              <button
                onClick={() => setShowChaptersDrawer(false)}
                className="text-xs text-[#c9a86a] underline"
              >
                Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-1">
              <button
                onClick={() => {
                  setStep(2);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#c9a86a]/20 border border-[#c9a86a]/20 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#c9a86a]">Inicio — Título Principal</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
              </button>

              {EPISODES_DATA.map((ep, idx) => {
                const epStep = idx + 3;
                const isCurrent = step === epStep;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setStep(epStep);
                      setShowChaptersDrawer(false);
                    }}
                    className={`text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-[#c9a86a]/20 border-[#c9a86a] text-[#f2ecd8] font-semibold'
                        : 'bg-[#131a33]/40 border-[#f2ecd8]/10 text-[#f2ecd8]/70 hover:bg-[#131a33]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#c9a86a]/20 border border-[#c9a86a]/50 flex items-center justify-center font-serif text-[11px] text-[#c9a86a]">
                          {ep.letter}
                        </span>
                        <span className="font-sans text-[10px] text-[#c9a86a] uppercase tracking-wider">
                          {ep.numberLabel}
                        </span>
                      </div>
                      <p className="font-serif italic text-sm mt-0.5 text-[#f2ecd8]">
                        {ep.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
