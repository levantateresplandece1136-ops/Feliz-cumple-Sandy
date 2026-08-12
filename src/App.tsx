import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewTab } from './types';
import { soundEngine } from './audio/soundEngine';

import { BackgroundStars } from './components/BackgroundStars';
import { NavbarMobile } from './components/NavbarMobile';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';

import { CinematicPlayer } from './components/CinematicPlayer';
import { AcrosticView } from './components/AcrosticView';
import { BirthdayCakeView } from './components/BirthdayCakeView';
import { MemoriesTimeline } from './components/MemoriesTimeline';
import { DedicationView } from './components/DedicationView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('cinematic');
  const [moonShadowOffsetX, setMoonShadowOffsetX] = useState<string>('-78%');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFrameMode, setIsFrameMode] = useState<boolean>(false);

  // Auto-detect mobile screen vs desktop screen size for default frame mode
  useEffect(() => {
    const handleResize = () => {
      // If screen width > 640px, default to mobile frame layout for desktop elegance
      if (window.innerWidth >= 640) {
        setIsFrameMode(true);
      } else {
        setIsFrameMode(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectTab = (tab: ViewTab) => {
    setActiveTab(tab);
    soundEngine.playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MobileFrameWrapper isFrameMode={isFrameMode}>
      {/* Stars & Moon Background */}
      <BackgroundStars
        shadowOffsetX={moonShadowOffsetX}
        showMoon={activeTab === 'cinematic' || activeTab === 'acrostic'}
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-full">
        {/* Mobile Header & Bottom Navigation */}
        <NavbarMobile
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isFrameMode={isFrameMode}
          onToggleFrame={() => setIsFrameMode(!isFrameMode)}
        />

        {/* View Content Renderer with Animated Transition */}
        <main className="flex-1 w-full relative pt-2">
          <AnimatePresence mode="wait">
            {activeTab === 'cinematic' && (
              <motion.div
                key="tab-cinematic"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <CinematicPlayer
                  onEpisodeChange={(shadowOffset) => setMoonShadowOffsetX(shadowOffset)}
                  onNavigateTab={(tab) => handleSelectTab(tab)}
                />
              </motion.div>
            )}

            {activeTab === 'acrostic' && (
              <motion.div
                key="tab-acrostic"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <AcrosticView onGoToCake={() => handleSelectTab('cake')} />
              </motion.div>
            )}

            {activeTab === 'cake' && (
              <motion.div
                key="tab-cake"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <BirthdayCakeView onGoToDedication={() => handleSelectTab('dedication')} />
              </motion.div>
            )}

            {activeTab === 'memories' && (
              <motion.div
                key="tab-memories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <MemoriesTimeline />
              </motion.div>
            )}

            {activeTab === 'dedication' && (
              <motion.div
                key="tab-dedication"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <DedicationView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </MobileFrameWrapper>
  );
}
