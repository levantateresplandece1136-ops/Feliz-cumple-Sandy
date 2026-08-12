import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EPISODES_DATA } from '../data/episodesData';
import { soundEngine } from '../audio/soundEngine';
import childhoodPlayImg from '../assets/images/childhood_play_scene_1786504331319.jpg';
import solitudeWindowImg from '../assets/images/solitude_window_scene_1786504814783.jpg';
import kitchenCoupleImg from '../assets/images/kitchen_couple_scene_1786506691208.jpg';
import sistersDressesImg from '../assets/images/sisters_dresses_scene_1786506989973.jpg';
import teacherClassroomImg from '../assets/images/teacher_classroom_scene_1786507223560.jpg';
import framedPhotoBibleImg from '../assets/images/framed_photo_bible_scene_1786507765466.jpg';
import womanPhotoRoomImg from '../assets/images/woman_photo_room_1786508068196.jpg';
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
  // Step index: 0 = Opening image quote, 1 = prelude 1, 2 = prelude 2, 3 = intro title, 4 = childhood image, 5 = ep 1, 6 = solitude image, 7 = ep 2, 8 = kitchen image, 9 = ep 3, 10 = ep 4, 11 = sisters image, 12 = ep 5, 13 = teacher classroom image, 14 = ep 6, 15 = framed photo bible image, 16 = ep 7, 17 = woman bedroom photo image, 18 = ep 8, 19 = ep 9, 20 = closing
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState<boolean>(false);

  // Auto-play timer (15s for episodes, 10s for intro/image steps)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const displayDuration = (step <= 4 || step === 6 || step === 8 || step === 11 || step === 13 || step === 15 || step === 17) ? 10000 : 15000;
      timer = setTimeout(() => {
        handleNext();
      }, displayDuration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  // Audio trigger & moon shadow update when step changes
  useEffect(() => {
    let shadowOffset = '-78%';
    if (step <= 2) {
      soundEngine.playHeartbeat();
      shadowOffset = '-78%';
    } else if (step === 3) {
      soundEngine.startAmbientPad();
      shadowOffset = '-78%';
    } else if (step === 4) {
      soundEngine.playPianoMelody();
      shadowOffset = '-70%';
    } else if (step === 5) {
      // Episode 1
      const ep = EPISODES_DATA[0];
      if (ep) {
        shadowOffset = ep.shadowOffsetX;
        if (ep.audioCue === 'heartbeat') soundEngine.playHeartbeat();
        else if (ep.audioCue === 'piano') soundEngine.playPianoMelody();
      }
    } else if (step === 6) {
      // Solitude image before Episode 2
      soundEngine.playHeartbeat();
      shadowOffset = '-55%';
    } else if (step === 7) {
      // Episode 2
      const ep = EPISODES_DATA[1];
      if (ep) {
        shadowOffset = ep.shadowOffsetX;
        if (ep.audioCue === 'heartbeat') soundEngine.playHeartbeat();
        else if (ep.audioCue === 'piano') soundEngine.playPianoMelody();
      }
    } else if (step === 8) {
      // Kitchen couple image before Episode 3
      soundEngine.playPianoMelody();
      shadowOffset = '-40%';
    } else if (step === 9 || step === 10) {
      // Episode 3 and Episode 4
      const epIndex = step - 7;
      const ep = EPISODES_DATA[epIndex];
      if (ep) {
        shadowOffset = ep.shadowOffsetX;
        if (ep.audioCue === 'heartbeat') soundEngine.playHeartbeat();
        else if (ep.audioCue === 'piano') soundEngine.playPianoMelody();
        else if (ep.audioCue === 'chime') soundEngine.playChime();
      }
    } else if (step === 11) {
      // Sisters image before Episode 5
      soundEngine.playChime();
      shadowOffset = '10%';
    } else if (step === 12) {
      // Episode 5
      const ep = EPISODES_DATA[4];
      if (ep) {
        shadowOffset = ep.shadowOffsetX;
        if (ep.audioCue === 'heartbeat') soundEngine.playHeartbeat();
        else if (ep.audioCue === 'piano') soundEngine.playPianoMelody();
        else if (ep.audioCue === 'chime') soundEngine.playChime();
      }
    } else if (step === 13) {
      // Teacher classroom image before Episode 6
      soundEngine.playChime();
      shadowOffset = '28%';
    } else if (step === 14) {
      // Episode 6
      const ep = EPISODES_DATA[5];
      if (ep) {
        shadowOffset = ep.shadowOffsetX;
        if (ep.audioCue === 'heartbeat') soundEngine.playHeartbeat();
        else if (ep.audioCue === 'piano') soundEngine.playPianoMelody();
        else if (ep.audioCue === 'chime') soundEngine.playChime();
      }
    } else if (step === 15) {
      // Framed photo & Bible image before Episode 7
      soundEngine.playPianoMelody();
      shadowOffset = '45%';
    } else if (step === 16) {
      // Episode 7
      const ep = EPISODES_DATA[6];
      if (ep) {
        shadowOffset = ep.shadowOffsetX;
        if (ep.audioCue === 'heartbeat') soundEngine.playHeartbeat();
        else if (ep.audioCue === 'piano') soundEngine.playPianoMelody();
        else if (ep.audioCue === 'chime') soundEngine.playChime();
      }
    } else if (step === 17) {
      // Woman bedroom photo image before Episode 8
      soundEngine.playHeartbeat();
      shadowOffset = '60%';
    } else if (step === 18 || step === 19) {
      // Episodes 8 & 9
      const epIndex = step - 11;
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
    } else if (step === 20) {
      soundEngine.playChime();
      shadowOffset = '78%';
    }

    onEpisodeChange(shadowOffset);
  }, [step]);

  const handleNext = () => {
    if (step < 20) {
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

  const currentEpIndex =
    step === 5 ? 0 : step === 7 ? 1 : step === 9 || step === 10 ? step - 7 : step === 12 ? 4 : step === 14 ? 5 : step === 16 ? 6 : step === 18 || step === 19 ? step - 11 : null;
  const currentEp = currentEpIndex !== null ? EPISODES_DATA[currentEpIndex] : null;

  return (
    <div className="relative w-full min-h-[calc(100vh-8rem)] flex flex-col justify-between items-center px-4 py-6 text-center select-none max-w-xl mx-auto">
      {/* Top Bar Indicators & Drawer button */}
      <div className="w-full flex flex-col gap-2 mb-2 px-2 z-20">
        <div className="w-full flex items-center justify-between text-xs text-[#c9a86a]/80">
          <button
            onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131a33]/80 border border-[#c9a86a]/30 hover:border-[#c9a86a] text-[#f2ecd8] transition-all"
          >
            <Grid className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Capítulos</span>
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 21 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStep(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === step
                    ? 'bg-[#c9a86a] w-3.5 shadow-[0_0_8px_#c9a86a]'
                    : idx < step
                    ? 'bg-[#f2ecd8]/50 w-1.5'
                    : 'bg-[#131a33]/60 border border-[#f2ecd8]/20 w-1.5'
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Auto-sequence toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded-full border transition-all flex items-center gap-1 ${
              isPlaying
                ? 'bg-[#c9a86a]/25 border-[#c9a86a] text-[#c9a86a] shadow-[0_0_12px_rgba(201,168,106,0.3)]'
                : 'bg-[#131a33]/80 border-[#c9a86a]/30 text-[#c9a86a] hover:bg-[#c9a86a]/20'
            }`}
            title={isPlaying ? 'Pausar avance automático' : 'Avance automático suave'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Smooth auto-play reading progress bar */}
        {isPlaying && (
          <div className="w-full h-0.5 bg-[#131a33] rounded-full overflow-hidden">
            <motion.div
              key={`timer-${step}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: (step <= 4 || step === 6 || step === 8 || step === 11 || step === 13 || step === 15) ? 10 : 15, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-[#c9a86a]/60 via-[#f2ecd8] to-[#c9a86a]"
            />
          </div>
        )}
      </div>

      {/* Main Scene Content Container with Motion Animation */}
      <div className="w-full flex-1 flex flex-col items-center justify-center py-6 my-auto z-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: Opening Image / Quote Slide */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center py-4"
            >
              <div className="w-full max-w-lg bg-black border border-[#c9a86a]/30 rounded-2xl p-10 sm:p-14 shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center min-h-[240px] sm:min-h-[280px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black pointer-events-none" />
                <p className="font-serif text-2xl sm:text-3xl text-white font-normal leading-relaxed tracking-wide text-center relative z-10 drop-shadow-md">
                  Antes de que alguien<br />
                  pudiera contar tu historia...
                </p>
                <span className="mt-8 text-[10px] font-sans text-[#c9a86a]/70 uppercase tracking-[0.25em] relative z-10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a86a]" />
                  Inicio
                </span>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Prelude line 1 */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
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

          {/* STEP 2: Prelude line 2 */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
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

          {/* STEP 3: Title Intro */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
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
                Continuar
              </button>
            </motion.div>
          )}

          {/* STEP 4: Childhood Scene (Right before Episode 1) */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center space-y-4 max-w-md"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#c9a86a]/40 shadow-[0_0_50px_rgba(201,168,106,0.3)] group">
                <img
                  src={childhoodPlayImg}
                  alt="Infancia y juego bajo el sol"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[290px] sm:max-h-[350px] rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1f] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8] drop-shadow-md">
                    "Donde todo comenzó: en la inocencia, bajo la luz tibia de un nuevo día..."
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#c9a86a]/15 border border-[#c9a86a]/40 text-[#c9a86a] font-sans text-[10px] uppercase tracking-[0.25em]">
                  Apertura de la Serie
                </span>
                <p className="font-serif italic text-base sm:text-lg text-[#f2ecd8]">
                  Iniciando Episodio 1
                </p>
              </div>

              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#c9a86a]/30 to-[#b98a95]/30 border border-[#c9a86a] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#c9a86a]/40 transition-all active:scale-95 shadow-[0_0_20px_rgba(201,168,106,0.25)] flex items-center gap-2"
              >
                <span>Comenzar Episodio 1</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 6: Solitude Scene (Right before Episode 2) */}
          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center space-y-4 max-w-md"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#14b8a6]/40 shadow-[0_0_50px_rgba(20,184,166,0.2)] group">
                <img
                  src={solitudeWindowImg}
                  alt="Mirando por la ventana en día lluvioso"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[290px] sm:max-h-[350px] rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1f] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8] drop-shadow-md">
                    "En los días de lluvia y en el silencio de tu habitación, Dios nunca dejó de mirarte..."
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-serif italic text-base sm:text-lg text-[#f2ecd8]">
                  Iniciando Episodio 2 — Amor Incondicional
                </p>
              </div>

              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#14b8a6]/30 to-[#c9a86a]/30 border border-[#14b8a6] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#14b8a6]/40 transition-all active:scale-95 shadow-[0_0_20px_rgba(20,184,166,0.25)] flex items-center gap-2"
              >
                <span>Comenzar Episodio 2</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 8: Kitchen & Couple Scene (Right before Episode 3) */}
          {step === 8 && (
            <motion.div
              key="step-8"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center space-y-4 max-w-md"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#eab308]/40 shadow-[0_0_50px_rgba(234,179,8,0.2)] group">
                <img
                  src={kitchenCoupleImg}
                  alt="En la calidez de la cocina, compartiendo hogar"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[290px] sm:max-h-[350px] rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1f] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8] drop-shadow-md">
                    "En la calidez de la cocina, en cada detalle cotidiano y en el amor compartido, Dios renueva sus promesas..."
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-serif italic text-base sm:text-lg text-[#f2ecd8]">
                  Iniciando Episodio 3 — Nunca Sola
                </p>
              </div>

              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#eab308]/30 to-[#c9a86a]/30 border border-[#eab308] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#eab308]/40 transition-all active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.25)] flex items-center gap-2"
              >
                <span>Comenzar Episodio 3</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 11: Sisters & Dresses Scene (Right before Episode 5) */}
          {step === 11 && (
            <motion.div
              key="step-11"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center space-y-4 max-w-md"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#3b82f6]/40 shadow-[0_0_50px_rgba(59,130,246,0.2)] group">
                <img
                  src={sistersDressesImg}
                  alt="Dos hermanas en vestidos compartiendo la calidez del hogar"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[290px] sm:max-h-[350px] rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1f] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8] drop-shadow-md">
                    "En los lazos sagrados de la familia, Dios sembró sonrisas, compañía y un amor que perdura para siempre..."
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-serif italic text-base sm:text-lg text-[#f2ecd8]">
                  Iniciando Episodio 5 — Dios es tu Refugio
                </p>
              </div>

              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#3b82f6]/30 to-[#c9a86a]/30 border border-[#60a5fa] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#3b82f6]/40 transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center gap-2"
              >
                <span>Comenzar Episodio 5</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 13: Classroom & Teacher Scene (Right before Episode 6) */}
          {step === 13 && (
            <motion.div
              key="step-13"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center space-y-4 max-w-md"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#10b981]/40 shadow-[0_0_50px_rgba(16,185,129,0.2)] group">
                <img
                  src={teacherClassroomImg}
                  alt="Enseñar con vocación, fe y amor en el aula"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[290px] sm:max-h-[350px] rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1f] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8] drop-shadow-md">
                    "Enseñar es sembrar luz en los corazones; cuando se enseña con vocación y con Dios, las semillas florecen para siempre..."
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-serif italic text-base sm:text-lg text-[#f2ecd8]">
                  Iniciando Episodio 6 — Vocación y Sabiduría
                </p>
              </div>

              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#10b981]/30 to-[#c9a86a]/30 border border-[#34d399] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#10b981]/40 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center gap-2"
              >
                <span>Comenzar Episodio 6</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 15: Framed Photo & Bible Scene (Right before Episode 7) */}
          {step === 15 && (
            <motion.div
              key="step-15"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center space-y-4 max-w-md"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#f59e0b]/40 shadow-[0_0_50px_rgba(245,158,11,0.2)] group">
                <img
                  src={framedPhotoBibleImg}
                  alt="Retrato familiar en marco de madera junto a la Sagrada Biblia"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[290px] sm:max-h-[350px] rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1f] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8] drop-shadow-md">
                    "En cada foto guardada y en la Palabra viva, Dios atesora tu historia y la de quienes amas..."
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-serif italic text-base sm:text-lg text-[#f2ecd8]">
                  Iniciando Episodio 7 — Promesa y Legado
                </p>
              </div>

              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#f59e0b]/30 to-[#c9a86a]/30 border border-[#fbbf24] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#f59e0b]/40 transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center gap-2"
              >
                <span>Comenzar Episodio 7</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 17: Bedroom Photo & Memory Scene (Right before Episode 8) */}
          {step === 17 && (
            <motion.div
              key="step-17"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="w-full my-auto flex flex-col items-center justify-center space-y-4 max-w-md"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#3b82f6]/40 shadow-[0_0_50px_rgba(59,130,246,0.2)] group">
                <img
                  src={womanPhotoRoomImg}
                  alt="Sosteniendo la memoria en la tranquilidad del hogar"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[290px] sm:max-h-[350px] rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1f] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8] drop-shadow-md">
                    "Aun en el silencio de la llovizna y el dolor de los recuerdos, Dios abraza tu alma y sostiene tus lágrimas..."
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-serif italic text-base sm:text-lg text-[#f2ecd8]">
                  Iniciando Episodio 8 — Lo que nadie ve
                </p>
              </div>

              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#3b82f6]/30 to-[#c9a86a]/30 border border-[#60a5fa] text-[#f2ecd8] font-sans text-xs uppercase tracking-widest hover:bg-[#3b82f6]/40 transition-all active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center gap-2"
              >
                <span>Comenzar Episodio 8</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 5, 7, 9, 10, 12, 14, 16, 18, 19: Episodes 1..9 */}
          {currentEp && (
            <motion.div
              key={`ep-${currentEp.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
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

          {/* STEP 20: Final Scene / Transition to Dedication */}
          {step === 20 && (
            <motion.div
              key="step-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
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
          {step === 0
            ? 'Inicio'
            : step === 1 || step === 2
            ? 'Prólogo'
            : step === 3
            ? 'Presentación'
            : step === 4
            ? 'Escena 1 — Infancia'
            : step === 5
            ? 'Episodio 1 / 9'
            : step === 6
            ? 'Escena 2 — Soledad'
            : step === 7
            ? 'Episodio 2 / 9'
            : step === 8
            ? 'Escena 3 — Hogar'
            : step === 9
            ? 'Episodio 3 / 9'
            : step === 10
            ? 'Episodio 4 / 9'
            : step === 11
            ? 'Escena 4 — Hermandad'
            : step === 12
            ? 'Episodio 5 / 9'
            : step === 13
            ? 'Escena 5 — La Maestra'
            : step === 14
            ? 'Episodio 6 / 9'
            : step === 15
            ? 'Escena 6 — Fe y Familia'
            : step === 16
            ? 'Episodio 7 / 9'
            : step === 17
            ? 'Escena 7 — Silencio y Memoria'
            : step === 20
            ? 'Final'
            : `Episodio ${step - 10} / 9`}
        </span>

        {step < 20 ? (
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
                  setStep(0);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#c9a86a]/20 border border-[#c9a86a]/20 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#c9a86a]">Inicio — Apertura</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
              </button>

              <button
                onClick={() => {
                  setStep(3);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#c9a86a]/20 border border-[#c9a86a]/20 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#c9a86a]">Presentación — Título Principal</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
              </button>

              <button
                onClick={() => {
                  setStep(4);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#c9a86a]/20 border border-[#c9a86a]/20 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#c9a86a]">Escena Visual 1 — La Luz de la Infancia</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
              </button>

              <button
                onClick={() => {
                  setStep(6);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#14b8a6]/20 border border-[#14b8a6]/30 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#14b8a6]">Escena Visual 2 — La Soledad en la Ventana</span>
                <Sparkles className="w-3.5 h-3.5 text-[#14b8a6]" />
              </button>

              <button
                onClick={() => {
                  setStep(8);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#eab308]/20 border border-[#eab308]/30 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#eab308]">Escena Visual 3 — Calidez en el Hogar</span>
                <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
              </button>

              <button
                onClick={() => {
                  setStep(11);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#60a5fa]">Escena Visual 4 — Hermandad y Amor Familiar</span>
                <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
              </button>

              <button
                onClick={() => {
                  setStep(13);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#10b981]/20 border border-[#10b981]/30 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#34d399]">Escena Visual 5 — La Vocación de Enseñar</span>
                <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
              </button>

              <button
                onClick={() => {
                  setStep(15);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#fbbf24]">Escena Visual 6 — Retrato Familiar y Sagrada Biblia</span>
                <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              </button>

              <button
                onClick={() => {
                  setStep(17);
                  setShowChaptersDrawer(false);
                }}
                className="text-left p-2.5 rounded-xl bg-[#131a33]/60 hover:bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-xs text-[#f2ecd8] flex items-center justify-between"
              >
                <span className="font-medium text-[#60a5fa]">Escena Visual 7 — Silencio, Memoria y Esperanza</span>
                <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
              </button>

              {EPISODES_DATA.map((ep, idx) => {
                const epStep = idx === 0 ? 5 : idx === 1 ? 7 : idx === 2 ? 9 : idx === 3 ? 10 : idx === 4 ? 12 : idx === 5 ? 14 : idx === 6 ? 16 : idx === 7 ? 18 : 19;
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
