import React from 'react';
import { RuiCalligraphy } from '../calligraphy/RuiCalligraphy';
import { useStyle } from '../../context/StyleContext';
import { CalligraphyScript } from '../../types/styles';
import { Sparkles, RotateCcw, BookOpen } from 'lucide-react';

interface RuiHeroProps {
  onExploreClick?: () => void;
}

export const RuiHero: React.FC<RuiHeroProps> = () => {
  const {
    settings,
    setCalligraphyScript,
    replayAnimation,
    openStyleModal,
  } = useStyle();

  const scriptChips: { id: CalligraphyScript; label: string; cjk: string }[] = [
    { id: 'kaishu', label: 'Regular', cjk: '楷书' },
    { id: 'xingshu', label: 'Cursive', cjk: '行书' },
    { id: 'zhuanshu', label: 'Seal', cjk: '篆书' },
    { id: 'geometric', label: 'Modern', cjk: '线条' },
    { id: 'stele', label: 'Stele', cjk: '碑拓' },
  ];

  return (
    <section
      id="rui-hero-section"
      className="relative w-full pt-8 pb-12 md:pt-14 md:pb-18 overflow-hidden border-b archival-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top minimal micro-header metadata & Style Switcher trigger */}
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

          {/* Quick Script Selector Bar directly in hero */}
          <div className="flex items-center space-x-1.5 bg-[var(--bg-surface,#FFFFFF)]/80 border archival-border p-1 rounded-full shadow-xs">
            <span className="text-[10px] font-mono px-2 text-[var(--text-muted,#8A8780)] hidden sm:inline">
              Script:
            </span>
            {scriptChips.map((chip) => {
              const isSelected = settings.calligraphyScript === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setCalligraphyScript(chip.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all ${
                    isSelected
                      ? 'bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] font-semibold shadow-xs'
                      : 'text-[var(--text-secondary,#57554F)] hover:text-[var(--text-primary,#171717)] hover:bg-[var(--bg-subtle,#F4F1EA)]'
                  }`}
                  title={`Switch Calligraphy Script to ${chip.label} (${chip.cjk})`}
                >
                  <span>{chip.cjk}</span>
                </button>
              );
            })}
            <button
              onClick={replayAnimation}
              className="p-1 text-[var(--text-secondary,#57554F)] hover:text-[var(--text-primary,#171717)] rounded-full hover:bg-[var(--bg-subtle,#F4F1EA)] transition-colors ml-0.5"
              title="Replay inking animation in traditional stroke order"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-[var(--text-muted,#8A8780)]">
            <span className="font-mono text-[11px]">THEME: {settings.theme.toUpperCase()}</span>
            <span>•</span>
            <span className="font-mono text-[11px]">34°03′N 118°14′W</span>
          </div>
        </div>

        {/* Hero Composition: RUI wordmark and 睿 calligraphy scaled to identical height */}
        <div className="relative flex flex-col items-center justify-center py-4 md:py-8">
          <div className="relative flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full select-none">
            {/* Left/Center RUI Wordmark in bespoke Times editorial serif */}
            <div className="flex items-center justify-center h-28 sm:h-44 md:h-56 lg:h-64">
              <h1
                id="rui-primary-wordmark"
                className="font-serif font-normal tracking-[-0.03em] text-[15vw] sm:text-[14vw] md:text-[12vw] lg:text-[190px] leading-none text-[var(--text-primary,#171717)] uppercase text-center flex items-center h-full"
                style={{ fontFeatureSettings: '"cv01", "ss01"' }}
              >
                R<span className="italic font-light">U</span>I
              </h1>
            </div>

            {/* Middle subtle divider */}
            <div className="hidden sm:block h-24 sm:h-36 md:h-44 border-r archival-border opacity-60" />

            {/* Right 睿 Calligraphy Character calibrated to the exact same visual height */}
            <div className="flex items-center justify-center h-28 sm:h-44 md:h-56 lg:h-64">
              <RuiCalligraphy
                size={240}
                className="w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 transition-all"
              />
            </div>
          </div>

          {/* User Requested Homepage Tagline */}
          <div className="relative z-10 mt-6 md:mt-8 max-w-3xl text-center">
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

            {/* Direct button to open full style and calligraphy customizer */}
            <div className="mt-6 flex items-center justify-center space-x-3">
              <button
                onClick={openStyleModal}
                className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary,#57554F)] hover:text-[var(--text-primary,#171717)] px-4 py-1.5 border archival-border hover:border-[var(--text-primary,#171717)] rounded-full bg-[var(--bg-surface,#FFFFFF)]/80 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-color,#171717)]" />
                <span>Calligraphy &amp; Style Archive Switcher</span>
              </button>
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

