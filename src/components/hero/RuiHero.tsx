import React from 'react';
import { RuiCalligraphy } from '../calligraphy/RuiCalligraphy';
import { useStyle } from '../../context/StyleContext';
import { RotateCcw } from 'lucide-react';

interface RuiHeroProps {
  onExploreClick?: () => void;
}

export const RuiHero: React.FC<RuiHeroProps> = () => {
  const { replayAnimation } = useStyle();

  return (
    <section
      id="rui-hero-section"
      className="relative w-full pt-8 pb-12 md:pt-14 md:pb-18 overflow-hidden border-b archival-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top minimal micro-header metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono tracking-widest text-[var(--text-muted,#73716B)] uppercase mb-6 md:mb-8">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-1.5 h-1.5 bg-[var(--text-primary,#171717)]"></span>
            <span>ruigallery.xyz</span>
            <span className="text-[var(--text-muted,#C5C2BA)]">/</span>
            <span>Archive &amp; Studio</span>
            <span className="hidden sm:inline text-[var(--text-muted,#C5C2BA)]">/</span>
            <span className="hidden sm:inline text-[10px] tracking-normal font-serif italic text-[var(--text-secondary,#57554F)]">
              vol. XXIV · catalogue raisonné
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={replayAnimation}
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary,#57554F)] hover:text-[var(--text-primary,#171717)] px-2.5 py-1 border archival-border hover:border-[var(--text-primary,#171717)] rounded bg-[var(--bg-surface,#FFFFFF)]/80 transition-colors"
              title="Replay inking animation in traditional stroke order"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay Stroke Inking</span>
            </button>
            <span className="hidden lg:inline text-[var(--text-muted,#8A8780)] font-mono text-[11px]">
              34°03′N 118°14′W
            </span>
          </div>
        </div>

        {/* Hero Composition: Monumental full-width non-italicized RUI with 睿 calligraphy positioned behind the text */}
        <div className="relative flex flex-col items-center justify-center py-6 sm:py-10 md:py-14 w-full">
          <div className="relative w-full flex items-center justify-center select-none overflow-visible">
            {/* Background 睿 Calligraphy character positioned behind the text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <RuiCalligraphy
                size={520}
                className="w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] opacity-[0.22] transition-all transform -translate-y-2 sm:-translate-y-4"
              />
            </div>

            {/* Foreground RUI Wordmark spanning full width across devices with clean margins, non-italicized */}
            <h1
              id="rui-primary-wordmark"
              className="relative z-10 w-full font-serif font-normal text-center leading-[0.88] tracking-[-0.02em] sm:tracking-[-0.01em] text-[var(--text-primary,#171717)] uppercase not-italic select-none"
              style={{
                fontSize: 'clamp(3.5rem, 24vw, 17.5rem)',
                fontFeatureSettings: '"cv01", "ss01"',
              }}
            >
              RUI
            </h1>
          </div>

          {/* Tagline and Lexicon Metadata */}
          <div className="relative z-10 mt-6 sm:mt-8 md:mt-10 max-w-3xl text-center px-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[var(--text-primary,#171717)] tracking-tight">
              “for rebels who dream”
            </p>

            <p className="mt-3 text-sm sm:text-base font-serif text-[var(--text-secondary,#3D3B36)] leading-relaxed max-w-xl mx-auto">
              Personal artistic archive, research laboratory, and intellectual ecosystem.
            </p>

            {/* Archival metadata and Kangxi lexicon annotation */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-[var(--text-muted,#78756E)] tracking-wider uppercase">
              <span>Kangxi Radical 109 [目]</span>
              <span className="text-[var(--text-muted,#C5C2BA)]">/</span>
              <span>14 Traditional Strokes</span>
              <span className="text-[var(--text-muted,#C5C2BA)]">/</span>
              <span>Pinyin: Ruì (Wisdom · Sagacity)</span>
            </div>
          </div>
        </div>

        {/* Section 1 sub-bar: Direct fast route anchors */}
        <div className="mt-8 pt-6 border-t archival-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary,#57554F)]">
          <div className="flex items-center space-x-2">
            <span className="text-[var(--text-primary,#171717)] font-medium">INDEX // 01</span>
            <span className="text-[var(--text-muted,#A3A099)]">→</span>
            <span>Curated Exhibition &amp; Laboratory Inquiries</span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="/laboratory"
              className="hover:text-[var(--text-primary,#171717)] transition-colors flex items-center space-x-1 underline underline-offset-4 decoration-[var(--border-archival,#C5C2BA)]"
            >
              <span>Explore Laboratory</span>
              <span>↗</span>
            </a>
            <a
              href="/archive"
              className="hover:text-[var(--text-primary,#171717)] transition-colors flex items-center space-x-1 underline underline-offset-4 decoration-[var(--border-archival,#C5C2BA)]"
            >
              <span>Full Archive Index</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

