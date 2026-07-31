import React, { useState } from 'react';
import { MEMORIES_DATA } from '../data/memoriesData';
import { MemoryItem } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, MapPin, Heart, BookOpen, Music, Anchor, Compass } from 'lucide-react';

export const MemoriesTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todas las Historias' },
    { id: 'infancia', label: 'Villahermosa' },
    { id: 'musica', label: 'El Canto' },
    { id: 'maternidad', label: 'Maternidad' },
    { id: 'docencia', label: 'Maestra' },
    { id: 'familia', label: 'Familia & Fe' }
  ];

  const filteredMemories =
    selectedCategory === 'todos'
      ? MEMORIES_DATA
      : MEMORIES_DATA.filter((m) => m.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music': return <Music className="w-5 h-5 text-[#c9a86a]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#c9a86a]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#b98a95]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#c9a86a]" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-[#c9a86a]" />;
      default: return <Sparkles className="w-5 h-5 text-[#c9a86a]" />;
    }
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    soundEngine.playChime();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a86a]/10 border border-[#c9a86a]/30 text-[#c9a86a] font-sans text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#c9a86a]" />
          Línea del Tiempo
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#f2ecd8]">
          Historias y Huellas de <span className="italic text-[#c9a86a]">Sandy</span>
        </h2>
        <p className="font-sans text-xs text-[#d8d3c1]/70 max-w-md mx-auto">
          Recuerdos imborrables trazados con amor, fe y generosidad a lo largo de los años.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs shrink-0 transition-all ${
                isActive
                  ? 'bg-[#c9a86a] text-[#0a0e1f] font-semibold shadow-[0_0_12px_rgba(201,168,106,0.3)]'
                  : 'bg-[#131a33]/60 border border-[#c9a86a]/20 text-[#f2ecd8]/70 hover:text-[#f2ecd8]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Timeline Vertical Path */}
      <div className="relative pl-6 sm:pl-8 space-y-6 border-l border-[#c9a86a]/30 my-4">
        {filteredMemories.map((item: MemoryItem) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#0a0e1f] border-2 border-[#c9a86a] flex items-center justify-center shadow-[0_0_10px_#c9a86a]">
              <div className="w-2 h-2 rounded-full bg-[#c9a86a]" />
            </div>

            {/* Memory Card */}
            <div className="glass-panel p-5 rounded-2xl border border-[#c9a86a]/25 space-y-3 relative overflow-hidden transition-all hover:border-[#c9a86a]/50">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#c9a86a]/10 border border-[#c9a86a]/30">
                    {getIcon(item.iconName)}
                  </div>
                  <div>
                    <span className="font-sans text-[10px] text-[#c9a86a] uppercase tracking-widest font-medium">
                      {item.period}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#f2ecd8]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#b98a95] font-sans shrink-0">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
              </div>

              <p className="font-serif text-sm sm:text-base text-[#f2ecd8]/90 leading-relaxed">
                {item.description}
              </p>

              {item.quote && (
                <p className="font-serif italic text-xs text-[#c9a86a] border-l-2 border-[#c9a86a] pl-3 py-0.5">
                  "{item.quote}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
