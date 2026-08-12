import React from 'react';
import { ViewTab } from '../types';
import {
  Film,
  Sparkles,
  Cake,
  BookOpen,
  HeartHandshake,
  Gift,
  Volume2,
  VolumeX,
  Smartphone,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../audio/soundEngine';

interface NavbarMobileProps {
  activeTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isFrameMode: boolean;
  onToggleFrame: () => void;
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({
  activeTab,
  onSelectTab,
  isMuted,
  onToggleMute,
  isFrameMode,
  onToggleFrame
}) => {
  const triggerCelebration = () => {
    soundEngine.playBirthdayFanfare();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c9a86a', '#f2ecd8', '#b98a95', '#ffffff']
    });
  };

  const navItems: { tab: ViewTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'cinematic', label: 'Serie', icon: <Film className="w-4 h-4" /> },
    { tab: 'acrostic', label: 'S-A-N-D-Y', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'cake', label: 'Pastel', icon: <Cake className="w-4 h-4" /> },
    { tab: 'memories', label: 'Historias', icon: <BookOpen className="w-4 h-4" /> },
    { tab: 'dedication', label: 'Carta', icon: <Gift className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0e1f]/80 backdrop-blur-md border-b border-[#c9a86a]/20 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#c9a86a]/15 border border-[#c9a86a]/40 flex items-center justify-center text-[#c9a86a] font-serif font-bold text-sm">
            S
          </div>
          <div>
            <h1 className="font-serif text-sm font-semibold text-[#f2ecd8] tracking-wide leading-tight">
              Para Sandy
            </h1>
            <p className="font-sans text-[10px] text-[#c9a86a] uppercase tracking-widest">
              Serie de Cumpleaños
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Confetti celebration button */}
          <button
            onClick={triggerCelebration}
            className="px-2.5 py-1 rounded-full bg-[#c9a86a]/15 hover:bg-[#c9a86a]/25 border border-[#c9a86a]/40 text-[#c9a86a] font-sans text-xs flex items-center gap-1 transition-all active:scale-95"
            title="¡Lanzar confeti de cumpleaños!"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c9a86a] animate-pulse" />
            <span className="hidden sm:inline">Celebrar</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-full bg-[#131a33]/80 border border-[#f2ecd8]/20 text-[#f2ecd8]/80 hover:text-[#f2ecd8] hover:border-[#c9a86a]/40 transition-all"
            title={isMuted ? 'Activar Sonido' : 'Silenciar Sonido'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400/80" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#c9a86a]" />
            )}
          </button>

          {/* Toggle frame mode */}
          <button
            onClick={onToggleFrame}
            className="p-1.5 rounded-full bg-[#131a33]/80 border border-[#f2ecd8]/20 text-[#f2ecd8]/80 hover:text-[#f2ecd8] transition-all hidden sm:flex items-center"
            title={isFrameMode ? 'Ver Pantalla Completa' : 'Ver Modo Teléfono'}
          >
            {isFrameMode ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Bottom Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0e1f]/90 backdrop-blur-lg border-t border-[#c9a86a]/20 px-2 py-1.5 max-w-lg mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#c9a86a] bg-[#c9a86a]/15 font-medium shadow-[0_0_12px_rgba(201,168,106,0.15)]'
                    : 'text-[#f2ecd8]/50 hover:text-[#f2ecd8]/80'
                }`}
              >
                <div className={`${isActive ? 'scale-110 text-[#c9a86a]' : ''} transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 font-sans">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
