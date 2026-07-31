import React from 'react';

interface BackgroundStarsProps {
  shadowOffsetX: string; // e.g. "-78%", "20%", "78%"
  showMoon?: boolean;
}

export const BackgroundStars: React.FC<BackgroundStarsProps> = ({
  shadowOffsetX,
  showMoon = true
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0e1f]">
      {/* Animated Star Field */}
      <div
        className="absolute inset-0 opacity-70 animate-twinkle"
        style={{
          backgroundImage: `
            radial-gradient(1.2px 1.2px at 12% 18%, rgba(255,255,255,0.85), transparent),
            radial-gradient(1px 1px at 82% 12%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 58% 68%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 28% 78%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.2px 1.2px at 88% 58%, rgba(255,255,255,0.65), transparent),
            radial-gradient(1.8px 1.8px at 44% 32%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 18% 52%, rgba(255,255,255,0.45), transparent),
            radial-gradient(1.5px 1.5px at 72% 88%, rgba(255,255,255,0.7), transparent)
          `,
          backgroundSize: '100% 100%'
        }}
      />

      {/* Warm Ambient Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 18%, rgba(201,168,106,0.12), transparent 65%)'
        }}
      />

      {/* Moon Element (Signature visual) */}
      {showMoon && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-28 h-28 sm:w-36 sm:h-36 transition-all duration-1000 z-10">
          {/* Halo breathe effect */}
          <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(242,236,216,0.35),rgba(242,236,216,0)_70%)] blur-sm animate-breathe" />

          {/* Glowing Moon disk */}
          <div className="relative w-full h-full rounded-full bg-[#f2ecd8] shadow-[0_0_40px_rgba(242,236,216,0.5),0_0_90px_rgba(242,236,216,0.25)] overflow-hidden">
            {/* Moon craters texture accent */}
            <div className="absolute top-3 left-5 w-4 h-4 rounded-full bg-[#d8d3c1]/30 blur-[1px]" />
            <div className="absolute bottom-6 right-8 w-6 h-6 rounded-full bg-[#d8d3c1]/25 blur-[1px]" />
            <div className="absolute top-10 right-4 w-3 h-3 rounded-full bg-[#d8d3c1]/20 blur-[1px]" />

            {/* Dynamic Shadow Offset for moon phases */}
            <div
              className="absolute inset-0 rounded-full bg-[#0a0e1f] transition-transform duration-1000 ease-out"
              style={{
                transform: `translateX(${shadowOffsetX})`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
