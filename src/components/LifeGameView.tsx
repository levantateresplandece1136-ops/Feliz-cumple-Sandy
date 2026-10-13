import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAME_LEVELS_DATA } from '../data/gameLevelsData';
import { GameLevel } from '../types';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Star,
  Music,
  Compass,
  Heart,
  BookOpen,
  Award,
  Trophy,
  CheckCircle2,
  Play,
  RotateCcw,
  ChevronRight,
  Shield,
  Gift,
  ArrowLeft,
  Volume2
} from 'lucide-react';

interface LifeGameViewProps {
  onGoToDedication: () => void;
  onGoToCake: () => void;
}

export const LifeGameView: React.FC<LifeGameViewProps> = ({ onGoToDedication, onGoToCake }) => {
  // Game state
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isPlayingLevel, setIsPlayingLevel] = useState<boolean>(false);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [showRecognitionModal, setShowRecognitionModal] = useState<boolean>(false);

  // Mini-game 1: collect_stars
  const [starsCollected, setStarsCollected] = useState<number>(0);

  // Mini-game 2: melody_sequence
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const targetSequence = [0, 2, 1, 3]; // indices of 4 musical note buttons
  const [melodyFeedback, setMelodyFeedback] = useState<string>('');

  // Mini-game 3: courage_path
  const [pathStep, setPathStep] = useState<number>(0);

  // Mini-game 4: love_rain
  const [heartsCaught, setHeartsCaught] = useState<number>(0);

  // Mini-game 5: wisdom_connect
  const [connectedNodes, setConnectedNodes] = useState<number[]>([]);

  // Mini-game 6: final_trophy
  const [trophyClaimed, setTrophyClaimed] = useState<boolean>(false);

  const currentLevel: GameLevel = GAME_LEVELS_DATA[activeLevelIndex];

  // Reset mini-game state when level starts
  const startLevelGame = (levelIdx: number) => {
    setActiveLevelIndex(levelIdx);
    setIsPlayingLevel(true);
    setShowRecognitionModal(false);
    soundEngine.playChime();

    // Reset sub-states
    setStarsCollected(0);
    setSequenceIndex(0);
    setMelodyFeedback('');
    setPathStep(0);
    setHeartsCaught(0);
    setConnectedNodes([]);
  };

  const handleLevelComplete = () => {
    soundEngine.playBirthdayFanfare();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c9a86a', '#f2ecd8', '#b98a95', '#14b8a6']
    });

    if (!completedLevels.includes(currentLevel.id)) {
      setCompletedLevels((prev) => [...prev, currentLevel.id]);
    }
    if (!unlockedBadges.includes(currentLevel.badgeUnlocked)) {
      setUnlockedBadges((prev) => [...prev, currentLevel.badgeUnlocked]);
    }

    setIsPlayingLevel(false);
    setShowRecognitionModal(true);
  };

  // Level 1 logic: collect star
  const handleCollectStar = () => {
    soundEngine.playChime();
    const nextCount = starsCollected + 1;
    setStarsCollected(nextCount);
    if (nextCount >= 5) {
      setTimeout(() => {
        handleLevelComplete();
      }, 300);
    }
  };

  // Level 2 logic: melody notes
  const handleNotePress = (noteIdx: number) => {
    if (noteIdx === 0) soundEngine.playPianoMelody();
    else if (noteIdx === 1) soundEngine.playChime();
    else if (noteIdx === 2) soundEngine.playHeartbeat();
    else soundEngine.playChime();

    if (noteIdx === targetSequence[sequenceIndex]) {
      const nextSeq = sequenceIndex + 1;
      setSequenceIndex(nextSeq);
      setMelodyFeedback('¡Excelente nota!');
      if (nextSeq >= targetSequence.length) {
        setTimeout(() => {
          handleLevelComplete();
        }, 400);
      }
    } else {
      setMelodyFeedback('¡Casi! Inténtalo de nuevo desde el inicio');
      setSequenceIndex(0);
    }
  };

  // Level 3 logic: courage path step
  const handlePathStep = (stepIdx: number) => {
    soundEngine.playChime();
    if (stepIdx === pathStep) {
      const nextStep = pathStep + 1;
      setPathStep(nextStep);
      if (nextStep >= 4) {
        setTimeout(() => {
          handleLevelComplete();
        }, 300);
      }
    }
  };

  // Level 4 logic: catch heart
  const handleCatchHeart = () => {
    soundEngine.playChime();
    const nextHearts = heartsCaught + 1;
    setHeartsCaught(nextHearts);
    if (nextHearts >= 5) {
      setTimeout(() => {
        handleLevelComplete();
      }, 300);
    }
  };

  // Level 5 logic: wisdom connect
  const handleNodeClick = (nodeId: number) => {
    soundEngine.playChime();
    if (connectedNodes.length === 0 && nodeId === 1) {
      setConnectedNodes([1]);
    } else if (connectedNodes.length === 1 && nodeId === 2) {
      setConnectedNodes([1, 2]);
    } else if (connectedNodes.length === 2 && nodeId === 3) {
      setConnectedNodes([1, 2, 3]);
    } else if (connectedNodes.length === 3 && nodeId === 4) {
      setConnectedNodes([1, 2, 3, 4]);
      setTimeout(() => {
        handleLevelComplete();
      }, 400);
    } else {
      // wrong sequence reset
      setConnectedNodes([]);
    }
  };

  // Level 6 logic: final trophy
  const handleClaimTrophy = () => {
    soundEngine.playBirthdayFanfare();
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#c9a86a', '#f2ecd8', '#b98a95', '#ffffff', '#e2b85c']
    });
    setTrophyClaimed(true);
    setTimeout(() => {
      handleLevelComplete();
    }, 600);
  };

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music': return <Music className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 pb-24 text-center">
      {/* Top Header */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c9a86a]/15 border border-[#c9a86a]/40 text-[#c9a86a] font-sans text-xs uppercase tracking-widest font-medium">
          <Trophy className="w-3.5 h-3.5 text-[#c9a86a]" />
          Juego Interactivo de Vida
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#f2ecd8] leading-tight">
          El Camino del Reconocimiento a <span className="italic text-[#c9a86a]">Sandy</span>
        </h2>
        <p className="font-sans text-xs text-[#d8d3c1]/80 max-w-md mx-auto">
          Cada nivel representa una etapa inolvidable de su vida. Completa los desafíos para desbloquear insignias y reconocimientos especiales.
        </p>
      </div>

      {/* Unlocked Badges Bar */}
      <div className="glass-panel p-3.5 rounded-2xl border border-[#c9a86a]/30 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-sans text-[#c9a86a]">
          <Shield className="w-4 h-4 text-[#c9a86a]" />
          <span className="font-medium whitespace-nowrap">Insignias ({completedLevels.length}/6):</span>
        </div>
        <div className="flex items-center gap-2">
          {GAME_LEVELS_DATA.map((lvl) => {
            const isUnlocked = completedLevels.includes(lvl.id);
            return (
              <div
                key={lvl.id}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  isUnlocked
                    ? 'bg-[#c9a86a]/25 border-[#c9a86a] text-[#c9a86a] shadow-[0_0_10px_#c9a86a]'
                    : 'bg-[#131a33]/60 border-[#f2ecd8]/15 text-[#f2ecd8]/30'
                }`}
                title={isUnlocked ? lvl.badgeUnlocked : 'Nivel no completado'}
              >
                {isUnlocked ? <Award className="w-4 h-4 text-[#c9a86a]" /> : <Star className="w-3.5 h-3.5" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main View Mode: Map vs Active Game Challenge */}
      {!isPlayingLevel && !showRecognitionModal && (
        <div className="space-y-4 my-6">
          <h3 className="font-serif text-xl text-[#f2ecd8] text-left flex items-center gap-2 px-1">
            <Sparkles className="w-5 h-5 text-[#c9a86a]" />
            <span>Mapa de Niveles de Vida</span>
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {GAME_LEVELS_DATA.map((level, idx) => {
              const isCompleted = completedLevels.includes(level.id);
              const isCurrent = activeLevelIndex === idx;

              return (
                <motion.div
                  key={level.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => startLevelGame(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer text-left transition-all relative overflow-hidden ${
                    isCompleted
                      ? 'bg-[#131a33]/90 border-[#c9a86a]/60 shadow-[0_0_15px_rgba(201,168,106,0.15)]'
                      : isCurrent
                      ? 'bg-[#c9a86a]/15 border-[#c9a86a] shadow-[0_0_20px_rgba(201,168,106,0.25)]'
                      : 'bg-[#0a0e1f]/70 border-[#f2ecd8]/15 hover:border-[#c9a86a]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-serif text-lg font-bold shrink-0 border"
                        style={{
                          backgroundColor: `${level.themeColor}20`,
                          borderColor: level.themeColor,
                          color: level.themeColor
                        }}
                      >
                        {getStageIcon(level.iconName)}
                      </div>

                      <div>
                        <span
                          className="font-sans text-[10px] uppercase tracking-widest font-semibold"
                          style={{ color: level.themeColor }}
                        >
                          {level.stageName}
                        </span>
                        <h4 className="font-serif text-lg font-semibold text-[#f2ecd8] leading-tight">
                          {level.title}
                        </h4>
                        <p className="font-sans text-xs text-[#d8d3c1]/70 line-clamp-1 mt-0.5">
                          {level.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isCompleted ? (
                        <div className="flex items-center gap-1 text-emerald-400 font-sans text-xs font-medium bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Completado</span>
                        </div>
                      ) : (
                        <button className="p-2 rounded-full bg-[#c9a86a]/20 border border-[#c9a86a] text-[#c9a86a]">
                          <Play className="w-4 h-4 fill-[#c9a86a]" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Level Challenge Screen */}
      {isPlayingLevel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-panel p-6 rounded-3xl border-2 border-[#c9a86a] space-y-6 relative overflow-hidden my-4 shadow-[0_0_30px_rgba(201,168,106,0.2)]"
        >
          {/* Header Bar inside game */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c9a86a]/20">
            <button
              onClick={() => setIsPlayingLevel(false)}
              className="px-3 py-1 rounded-full bg-[#131a33] border border-[#c9a86a]/30 text-xs text-[#c9a86a] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Mapa</span>
            </button>
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#c9a86a]">
              {currentLevel.stageName}
            </span>
          </div>

          {/* Title & Instructions */}
          <div className="space-y-1 text-center">
            <h3 className="font-serif text-2xl text-[#f2ecd8] font-bold">
              {currentLevel.title}
            </h3>
            <p className="font-sans text-xs text-[#d8d3c1]/80 max-w-sm mx-auto">
              {currentLevel.instructions}
            </p>
          </div>

          {/* MECHANIC 1: Collect Stars */}
          {currentLevel.mechanicType === 'collect_stars' && (
            <div className="py-6 flex flex-col items-center justify-center space-y-6">
              <div className="flex items-center gap-2 text-sm font-sans text-[#c9a86a]">
                <Sparkles className="w-4 h-4" />
                <span>Estrellas Recolectadas: {starsCollected} / 5</span>
              </div>

              <div className="w-full max-w-xs h-48 bg-[#0a0e1f]/80 rounded-2xl border border-[#c9a86a]/30 relative flex items-center justify-center overflow-hidden">
                <AnimatePresence>
                  {starsCollected < 5 && (
                    <motion.button
                      key={`star-${starsCollected}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={handleCollectStar}
                      className="p-4 rounded-full bg-gradient-to-br from-[#c9a86a] to-[#e2b85c] text-[#0a0e1f] shadow-[0_0_25px_#c9a86a] hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Star className="w-10 h-10 fill-[#0a0e1f] animate-pulse" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* MECHANIC 2: Melody Sequence */}
          {currentLevel.mechanicType === 'melody_sequence' && (
            <div className="py-4 space-y-6">
              <p className="text-xs text-[#c9a86a] font-sans">
                Progreso de la Melodía: {sequenceIndex} / 4 notas correctas
              </p>

              {melodyFeedback && (
                <p className="font-serif italic text-sm text-[#f2ecd8]">
                  {melodyFeedback}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                {[
                  { id: 0, label: 'Nota Sol (S)', color: '#14b8a6' },
                  { id: 1, label: 'Nota La (A)', color: '#c9a86a' },
                  { id: 2, label: 'Nota Do (N)', color: '#b98a95' },
                  { id: 3, label: 'Nota Re (D)', color: '#eab308' }
                ].map((note) => (
                  <button
                    key={note.id}
                    onClick={() => handleNotePress(note.id)}
                    className="p-4 rounded-2xl border text-xs font-serif font-bold text-[#f2ecd8] flex flex-col items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md"
                    style={{
                      backgroundColor: `${note.color}25`,
                      borderColor: note.color
                    }}
                  >
                    <Volume2 className="w-5 h-5" style={{ color: note.color }} />
                    <span>{note.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MECHANIC 3: Courage Path */}
          {currentLevel.mechanicType === 'courage_path' && (
            <div className="py-4 space-y-6">
              <p className="text-xs text-[#c9a86a] font-sans">
                Pasos completados: {pathStep} / 4 portales de luz
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                {[
                  { step: 0, title: 'I. Salir de Villahermosa' },
                  { step: 1, title: 'II. Confiar en la Promesa' },
                  { step: 2, title: 'III. Cruzar el Desierto' },
                  { step: 3, title: 'IV. Encontrar el Hogar' }
                ].map((p) => {
                  const isDone = pathStep > p.step;
                  const isCurrent = pathStep === p.step;

                  return (
                    <button
                      key={p.step}
                      disabled={!isCurrent && !isDone}
                      onClick={() => handlePathStep(p.step)}
                      className={`p-4 rounded-2xl border text-xs font-serif text-left transition-all ${
                        isDone
                          ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200'
                          : isCurrent
                          ? 'bg-[#eab308]/25 border-[#eab308] text-[#f2ecd8] animate-pulse shadow-[0_0_15px_#eab308]'
                          : 'bg-[#131a33]/40 border-[#f2ecd8]/10 text-[#f2ecd8]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Compass className="w-4 h-4 text-[#eab308]" />
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="font-semibold">{p.title}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MECHANIC 4: Love Rain */}
          {currentLevel.mechanicType === 'love_rain' && (
            <div className="py-4 space-y-6">
              <div className="flex items-center justify-center gap-2 text-xs text-[#b98a95] font-sans">
                <Heart className="w-4 h-4 fill-[#b98a95]" />
                <span>Corazones Atrapados: {heartsCaught} / 5</span>
              </div>

              <div className="w-full max-w-xs h-48 bg-[#0a0e1f]/80 rounded-2xl border border-[#b98a95]/40 relative flex items-center justify-center overflow-hidden">
                <AnimatePresence>
                  {heartsCaught < 5 && (
                    <motion.button
                      key={`heart-${heartsCaught}`}
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={handleCatchHeart}
                      className="p-4 rounded-full bg-gradient-to-br from-[#b98a95] to-[#f2ecd8] text-[#0a0e1f] shadow-[0_0_25px_#b98a95] hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Heart className="w-10 h-10 fill-[#b98a95] text-[#b98a95] animate-bounce" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* MECHANIC 5: Wisdom Connect */}
          {currentLevel.mechanicType === 'wisdom_connect' && (
            <div className="py-4 space-y-6">
              <p className="text-xs text-[#34d399] font-sans">
                Toca los puntos en orden 1 → 2 → 3 → 4
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                {[1, 2, 3, 4].map((num) => {
                  const isConnected = connectedNodes.includes(num);
                  return (
                    <button
                      key={num}
                      onClick={() => handleNodeClick(num)}
                      className={`p-4 rounded-2xl border text-base font-serif font-bold transition-all ${
                        isConnected
                          ? 'bg-[#34d399]/30 border-[#34d399] text-[#34d399] shadow-[0_0_15px_#34d399]'
                          : 'bg-[#131a33]/60 border-[#c9a86a]/30 text-[#f2ecd8] hover:border-[#34d399]'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#34d399]" />
                        <span>Estrella {num}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MECHANIC 6: Final Trophy */}
          {currentLevel.mechanicType === 'final_trophy' && (
            <div className="py-6 space-y-6 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClaimTrophy}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c9a86a] via-[#f2ecd8] to-[#b98a95] text-[#0a0e1f] border-2 border-[#c9a86a] shadow-[0_0_40px_rgba(201,168,106,0.6)] flex items-center justify-center active:scale-90 transition-transform"
              >
                <Trophy className="w-12 h-12 text-[#0a0e1f] animate-pulse" />
              </motion.button>

              <p className="font-serif italic text-base text-[#f2ecd8]">
                ¡Toca la Corona de Cumpleaños para recibir la Homenaje Final!
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Level Completion Recognition Modal */}
      <AnimatePresence>
        {showRecognitionModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4 }}
            className="glass-panel-gold p-6 rounded-3xl border-2 border-[#c9a86a] space-y-5 text-left relative overflow-hidden my-4 shadow-[0_0_40px_rgba(201,168,106,0.35)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#c9a86a]/30">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-[#c9a86a]" />
                <h3 className="font-serif text-xl font-bold text-[#f2ecd8]">
                  {currentLevel.recognitionTitle}
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-[#c9a86a] animate-spin" />
            </div>

            <p className="font-serif text-base sm:text-lg text-[#f2ecd8] leading-relaxed">
              "{currentLevel.recognitionText}"
            </p>

            <div className="bg-[#0a0e1f]/70 p-4 rounded-2xl border border-[#c9a86a]/30 space-y-1">
              <p className="font-serif italic text-xs sm:text-sm text-[#f2ecd8]">
                "{currentLevel.quoteVerse.text}"
              </p>
              <p className="font-sans text-[11px] text-[#c9a86a] text-right font-medium">
                — {currentLevel.quoteVerse.reference}
              </p>
            </div>

            {/* Unlocked Badge Banner */}
            <div className="p-3 rounded-2xl bg-[#c9a86a]/15 border border-[#c9a86a] flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#c9a86a] text-[#0a0e1f] font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-sans text-[10px] text-[#c9a86a] uppercase tracking-wider font-semibold">
                  Insignia Desbloqueada
                </p>
                <h4 className="font-serif text-base font-bold text-[#f2ecd8]">
                  {currentLevel.badgeUnlocked}
                </h4>
                <p className="font-sans text-xs text-[#d8d3c1]/80">
                  {currentLevel.badgeDescription}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setShowRecognitionModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#131a33] border border-[#c9a86a]/40 text-[#c9a86a] font-sans text-xs uppercase tracking-wider hover:bg-[#c9a86a]/20 transition-all"
              >
                Ver Mapa de Niveles
              </button>

              {activeLevelIndex < GAME_LEVELS_DATA.length - 1 ? (
                <button
                  onClick={() => startLevelGame(activeLevelIndex + 1)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs uppercase tracking-wider hover:bg-[#f2ecd8] transition-all flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(201,168,106,0.3)]"
                >
                  <span>Siguiente Nivel</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onGoToDedication}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#c9a86a] text-[#0a0e1f] font-sans font-semibold text-xs uppercase tracking-wider hover:bg-[#f2ecd8] transition-all flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(201,168,106,0.3)]"
                >
                  <Gift className="w-4 h-4" />
                  <span>Leer Carta Final</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
