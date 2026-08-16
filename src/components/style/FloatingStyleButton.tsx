import React from 'react';
import { useRouter } from '../../router/RouterContext';
import { useStyle } from '../../context/StyleContext';
import { Sparkles, Palette, RotateCcw } from 'lucide-react';

export const FloatingStyleButton: React.FC = () => {
  const { currentRoute } = useRouter();
  const { settings, openStyleModal, replayAnimation } = useStyle();

  // Hide on About page to remove style change optionality
  if (currentRoute.name === 'about') {
    return null;
  }

  return (
    <div
      id="floating-style-controller"
      className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 animate-fadeIn"
    >
      {/* Quick Replay Mini Trigger */}
      <button
        onClick={replayAnimation}
        className="w-10 h-10 rounded-full border archival-border bg-[var(--bg-surface,#FFFFFF)] text-[var(--text-secondary,#57554F)] hover:text-[var(--text-primary,#171717)] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        title="Replay 睿 Calligraphy Strokes"
        aria-label="Replay Calligraphy Strokes"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Main Style Switcher Pill */}
      <button
        onClick={openStyleModal}
        className="h-10 px-4 rounded-full border archival-border bg-[var(--bg-surface,#FFFFFF)] text-[var(--text-primary,#171717)] shadow-lg hover:shadow-xl flex items-center space-x-2.5 transition-all duration-200 hover:scale-105 active:scale-95 group"
        title="Open Style & Calligraphy Engine (Choose Styles)"
        aria-label="Open Style & Calligraphy Engine"
      >
        <Sparkles className="w-4 h-4 text-[var(--accent-color,#171717)] group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-mono font-medium tracking-wide">
          STYLE // <span className="uppercase text-[var(--text-muted,#8A8780)]">{settings.calligraphyScript}</span>
        </span>
        <span className="w-2 h-2 rounded-full bg-[var(--text-primary,#171717)] animate-pulse" />
      </button>
    </div>
  );
};
