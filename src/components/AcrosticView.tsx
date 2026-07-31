import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ACROSTIC_DATA } from '../data/acrosticData';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, Heart, BookOpen, Star, ArrowRight } from 'lucide-react';

interface AcrosticViewProps {
  onGoToCake: () => void;
}

export const AcrosticView: React.FC<AcrosticViewProps> = ({ onGoToCake }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const current = ACROSTIC_DATA[selectedIndex];

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    soundEngine.playChime();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 text-[#c9a86a] font-sans text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
          Acróstico de Vida
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#f2ecd8] leading-tight">
          El Significado de <span className="italic text-[#c9a86a]">S-A-N-D-Y</span>
        </h2>
        <p className="font-sans text-xs text-[#d8d3c1]/70 max-w-md mx-auto">
          Cinco letras grabadas por la gracia de Dios en cada etapa de tu historia.
        </p>
      </div>

      {/* Letter Tabs Bar */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
        {ACROSTIC_DATA.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`relative flex flex-col items-center justify-center w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-[#c9a86a]/20 border-[#c9a86a] shadow-[0_0_20px_rgba(201,168,106,0.35)] scale-105'
                  : 'bg-[#131a33]/60 border-[#c9a86a]/20 hover:border-[#c9a86a]/50 text-[#f2ecd8]/60'
              }`}
            >
              <span className={`font-serif text-xl sm:text-2xl ${isSelected ? 'text-[#c9a86a] font-bold' : 'text-[#f2ecd8]'}`}>
                {item.letter}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-tighter text-[#f2ecd8]/70 mt-0.5">
                {item.word.length > 7 ? item.word.slice(0, 6) + '.' : item.word}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Card Card Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.letter + selectedIndex}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -15 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-6 rounded-3xl border border-[#c9a86a]/40 space-y-5 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle glowing orb in background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a86a]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Letter & Title */}
          <div className="flex items-start gap-4 pb-4 border-b border-[#c9a86a]/20">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a86a]/25 to-[#b98a95]/20 border border-[#c9a86a] flex items-center justify-center font-serif text-4xl font-bold text-[#c9a86a] shadow-[0_0_25px_rgba(201,168,106,0.3)] shrink-0">
              {current.letter}
            </div>
            <div>
              <span className="font-sans text-xs text-[#c9a86a] uppercase tracking-widest font-medium">
                {current.letter} es de
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#f2ecd8]">
                {current.word}
              </h3>
              <p className="font-serif italic text-sm text-[#b98a95] mt-0.5">
                "{current.meaning}"
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="font-serif text-base sm:text-lg text-[#f2ecd8]/90 leading-relaxed">
            {current.description}
          </p>

          {/* Scripture Card */}
          <div className="bg-[#0a0e1f]/60 p-4 rounded-2xl border border-[#c9a86a]/25 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-[#c9a86a] font-sans">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Palabra Viva</span>
            </div>
            <p className="font-serif italic text-sm text-[#f2ecd8]">
              "{current.scripture.text}"
            </p>
            <p className="font-sans text-[11px] text-[#c9a86a] text-right font-medium">
              — {current.scripture.reference}
            </p>
          </div>

          {/* Attributes Pills */}
          <div className="space-y-2 pt-1">
            <p className="font-sans text-[11px] text-[#f2ecd8]/50 uppercase tracking-widest flex items-center gap-1">
              <Star className="w-3 h-3 text-[#c9a86a]" /> Virtudes e Identidad
            </p>
            <div className="flex flex-wrap gap-2">
              {current.attributes.map((attr, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#131a33] border border-[#c9a86a]/30 text-[#d8d3c1] font-sans text-xs flex items-center gap-1"
                >
                  <Heart className="w-3 h-3 text-[#b98a95]" />
                  {attr}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation CTA */}
      <div className="text-center pt-2">
        <button
          onClick={onGoToCake}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c9a86a]/15 hover:bg-[#c9a86a]/25 border border-[#c9a86a] text-[#c9a86a] font-sans text-xs uppercase tracking-widest transition-all active:scale-95"
        >
          <span>Ir a soplar las velas del pastel</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
