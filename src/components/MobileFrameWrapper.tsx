import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Clock } from 'lucide-react';

interface MobileFrameWrapperProps {
  children: React.ReactNode;
  isFrameMode: boolean;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({
  children,
  isFrameMode
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isFrameMode) {
    return <div className="w-full min-h-screen relative">{children}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#060812] flex items-center justify-center p-2 sm:p-6 overflow-x-hidden">
      {/* Smartphone Device Outer Bezel Frame */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-[#0c1021] rounded-[48px] border-[6px] border-[#232c4f] shadow-[0_0_60px_rgba(201,168,106,0.15),0_25px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto">
        {/* Smartphone Camera Notch */}
        <div className="absolute top-2 inset-x-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="w-28 h-4 bg-[#0a0e1f] rounded-full border border-[#232c4f]/60 flex items-center justify-end px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#131a33] border border-[#232c4f]" />
          </div>
        </div>

        {/* Status Bar */}
        <div className="w-full px-6 pt-3 pb-1 flex items-center justify-between text-[11px] text-[#f2ecd8]/60 font-sans z-40 bg-[#0a0e1f]/80 backdrop-blur-md select-none shrink-0">
          <span className="font-semibold flex items-center gap-1 text-[#c9a86a]">
            <Clock className="w-3 h-3" />
            {currentTime || '12:00'}
          </span>
          <div className="flex items-center gap-2">
            <Signal className="w-3 h-3 text-[#f2ecd8]/70" />
            <Wifi className="w-3 h-3 text-[#f2ecd8]/70" />
            <Battery className="w-3.5 h-3.5 text-[#c9a86a]" />
          </div>
        </div>

        {/* App Content Screen Area */}
        <div className="flex-1 overflow-y-auto relative scrollbar-thin">
          {children}
        </div>

        {/* Smartphone Bottom Home Indicator Pill */}
        <div className="w-full py-2 bg-[#0a0e1f]/90 flex items-center justify-center shrink-0 pointer-events-none z-40">
          <div className="w-32 h-1 bg-[#c9a86a]/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
