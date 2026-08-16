import React, { useState } from 'react';
import { useStyle } from '../../context/StyleContext';
import {
  ThemeMode,
  CalligraphyScript,
  TypographyPairing,
  AnimationSpeed,
  InkColor,
} from '../../types/styles';
import { RuiCalligraphy } from '../calligraphy/RuiCalligraphy';
import {
  X,
  Sparkles,
  RotateCcw,
  Layers,
  Feather,
  Palette,
  Type,
  Gauge,
  Grid,
  Check,
  BookOpen,
  Scroll,
} from 'lucide-react';

export const StyleSwitcherModal: React.FC = () => {
  const {
    settings,
    setTheme,
    setCalligraphyScript,
    setTypographyPairing,
    setAnimationSpeed,
    setInkColor,
    toggleGridOverlay,
    replayAnimation,
    applyPreset,
    isStyleModalOpen,
    closeStyleModal,
    presets,
  } = useStyle();

  const [activeTab, setActiveTab] = useState<
    'presets' | 'script' | 'anatomy' | 'theme' | 'typography' | 'animation'
  >('presets');

  if (!isStyleModalOpen) return null;

  const scriptOptions: {
    id: CalligraphyScript;
    title: string;
    cjk: string;
    desc: string;
    dynasty: string;
    provenance: string;
  }[] = [
    {
      id: 'kaishu',
      title: 'Regular Script (KaiShu)',
      cjk: '楷书 • 典雅端正',
      desc: 'Masterful 14 balanced strokes following orthodox Tang calligraphy principles.',
      dynasty: 'Tang Dynasty Standard (Yan Zhenqing & Ouyang Xun)',
      provenance: 'Kangxi Dictionary Folio 109 · Radical 目 (Eye Radical)',
    },
    {
      id: 'xingshu',
      title: 'Semi-Cursive (XingShu)',
      cjk: '行书 • 行云流水',
      desc: 'Expressive fluid brushwork with organic connecting ligaments and dynamic breath.',
      dynasty: 'Jin / Song Literati Tradition (Wang Xizhi & Mi Fu)',
      provenance: 'Orchid Pavilion Epistolary Style',
    },
    {
      id: 'zhuanshu',
      title: 'Small Seal Script (ZhuanShu)',
      cjk: '篆书 • 秦汉金石',
      desc: 'Monumental archaic symmetry with rounded architectural arches and bronze gravity.',
      dynasty: 'Qin Dynasty Imperial Chancellery (Li Si)',
      provenance: 'Mount Tai Epigraphic Stele (219 BCE)',
    },
    {
      id: 'geometric',
      title: 'Modern Minimalist Line',
      cjk: '现代几何 • 建筑线条',
      desc: 'Monoline architectural vector geometry respecting the 14 stroke components.',
      dynasty: 'Contemporary Bauhaus & Modernist Orthography',
      provenance: 'Digital Vector Monolith Grid',
    },
    {
      id: 'stele',
      title: 'Northern Wei Stele (BeiKe)',
      cjk: '汉魏碑拓 • 苍劲古拙',
      desc: 'Chiseled stone rubbing aesthetic with angular chisel cuts and weathered ink texture.',
      dynasty: 'Northern Wei Epigraphy (Longmen Grottoes & Zhang Menglong Stele)',
      provenance: 'Stone Rubbing Inscription on Mulberry Xuan Paper',
    },
  ];

  const themeOptions: {
    id: ThemeMode;
    name: string;
    cjk: string;
    desc: string;
    bgHex: string;
    textHex: string;
    borderHex: string;
    archivalNote: string;
  }[] = [
    {
      id: 'washi',
      name: 'Archival Washi Paper',
      cjk: '宣纸暖白',
      desc: 'Warm museum parchment tone with rich obsidian ink and fine tactile rules.',
      bgHex: '#FCFBF8',
      textHex: '#171717',
      borderHex: '#E7E5DF',
      archivalNote: 'Natural raw Xuan paper (生宣) with aged ivory fiber undertones.',
    },
    {
      id: 'obsidian',
      name: 'Obsidian Stele Rubbing',
      cjk: '玄黑碑拓',
      desc: 'Deep monumental dark mode with warm chalk highlights and stone textures.',
      bgHex: '#121212',
      textHex: '#EDE8DF',
      borderHex: '#2C2C2C',
      archivalNote: 'Direct ink squeeze rubbing (拓本) taken from antique stone monuments.',
    },
    {
      id: 'swiss',
      name: 'Bauhaus Modern Pure',
      cjk: '瑞士极简',
      desc: 'Pristine high-contrast white canvas with pitch jet black typography.',
      bgHex: '#FFFFFF',
      textHex: '#000000',
      borderHex: '#E5E5E5',
      archivalNote: 'Archival Bristol board with maximum optical clarity.',
    },
    {
      id: 'celadon',
      name: 'Song Literati Celadon',
      cjk: '青瓷玉润',
      desc: 'Serene celadon-glazed tone with deep pine charcoal ink accents.',
      bgHex: '#F2F5F0',
      textHex: '#1C2720',
      borderHex: '#D7DFD3',
      archivalNote: 'Song Dynasty Longquan celadon glaze and pine soot ink.',
    },
    {
      id: 'vermilion',
      name: 'Aged Linen & Seal Vermilion',
      cjk: '生绢朱砂',
      desc: 'Textured warm linen canvas with mineral cinnabar red impression.',
      bgHex: '#F7F4EC',
      textHex: '#211E1B',
      borderHex: '#E2DBD0',
      archivalNote: 'Hand-woven raw silk banner with imperial mineral cinnabar seal.',
    },
  ];

  const typographyOptions: {
    id: TypographyPairing;
    name: string;
    heading: string;
    body: string;
    desc: string;
  }[] = [
    {
      id: 'classical',
      name: 'Archival Antiqua & Times New Roman',
      heading: 'Times New Roman / Newsreader',
      body: 'Times New Roman (System Default)',
      desc: 'Traditional high-contrast academic book typography with refined serifs.',
    },
    {
      id: 'modern',
      name: 'Modernist Grotesque & Times Pairing',
      heading: 'Times New Roman / Plus Jakarta Sans',
      body: 'Times New Roman / Plus Jakarta Sans',
      desc: 'Architectural clarity paired with literary editorial standards.',
    },
    {
      id: 'monastic',
      name: 'Epigraphic Monumental / Cinzel & Times',
      heading: 'Cinzel / Cormorant Garamond / Times',
      body: 'Times New Roman Serif',
      desc: 'Classical Roman engraved proportions inspired by Trajan inscriptions.',
    },
    {
      id: 'technical',
      name: 'Archival Laboratory / JetBrains & Times',
      heading: 'JetBrains Mono / Times New Roman',
      body: 'Times New Roman Serif',
      desc: 'Curatorial cataloguing code paired with classical prose typography.',
    },
  ];

  const speedOptions: { id: AnimationSpeed; name: string; time: string; desc: string }[] = [
    { id: 'authentic', name: 'Authentic Inking', time: '2.4s', desc: 'True traditional Chinese 14-stroke order sequence' },
    { id: 'rapid', name: 'Rapid Vector', time: '1.0s', desc: 'Fast contemporary draw-in sequence' },
    { id: 'meditative', name: 'Meditative Flow', time: '4.2s', desc: 'Slow contemplative stroke reveal for study' },
    { id: 'static', name: 'Instant Print', time: '0.0s', desc: 'Instant archival lithograph render without animation' },
  ];

  const inkColors: { id: InkColor; name: string; hex: string; note: string }[] = [
    { id: 'obsidian', name: 'Obsidian Soot (松烟徽墨)', hex: settings.theme === 'obsidian' ? '#ECE7DE' : '#171717', note: 'Pine soot ink ground on She inkstone' },
    { id: 'cinnabar', name: 'Seal Cinnabar (朱砂印泥)', hex: '#B8282B', note: 'Imperial vermilion seal impression' },
    { id: 'celadon', name: 'Pine Mineral (松石矿彩)', hex: '#2C4435', note: 'Crushed malachite literati pigment' },
    { id: 'white', name: 'Stele Bone Chalk (碑拓粉白)', hex: '#EDE8DF', note: 'Oyster shell chalk rubbing contrast' },
    { id: 'gold', name: 'Antique Gold Leaf (泥金描金)', hex: '#C5A059', note: 'Burnished gold leaf on silk' },
  ];

  const strokeOrderSteps = [
    { num: '01', name: '⺊ 竖 (Upper Vertical)', component: 'Crown Stem', desc: 'Vertical descending stroke anchoring the upper apex' },
    { num: '02', name: '⺊ 横 (Upper Horizontal)', component: 'Crown Bar', desc: 'Rightward horizontal tick establishing the upper tier' },
    { num: '03', name: '撇 (Left Slanting Feather)', component: 'Upper Wing Left', desc: 'Sweeping downward left diagonal stroke' },
    { num: '04', name: '捺 / 点 (Right Slope / Dot)', component: 'Upper Wing Right', desc: 'Downward right diagonal dot balancing the upper crown' },
    { num: '05', name: '竖 (Left Chamber Wall)', component: 'Middle Chamber', desc: 'Left vertical descent forming the outer frame' },
    { num: '06', name: '横折 (Top & Right Wall)', component: 'Middle Chamber', desc: 'Horizontal rightward bar turning sharply downward' },
    { num: '07', name: '横 (Inner Chamber Horizon)', component: 'Middle Cross', desc: 'Interior horizontal bar stabilizing the chamber' },
    { num: '08', name: '竖 (Inner Chamber Axis)', component: 'Middle Cross', desc: 'Central vertical axis completing the interior cross' },
    { num: '09', name: '横 (Chamber Floor Seal)', component: 'Middle Base', desc: 'Bottom closing horizontal sealing the middle tier' },
    { num: '10', name: '目 左竖 (Eye Left Pillar)', component: 'Eye Radical 109', desc: 'Left vertical pillar supporting the ocular foundation' },
    { num: '11', name: '目 横折 (Eye Right Pillar)', component: 'Eye Radical 109', desc: 'Top horizontal turning into right pillar with anchor hook' },
    { num: '12', name: '目 中横1 (Upper Pupil Bar)', component: 'Eye Radical 109', desc: 'First interior horizontal divider representing vision' },
    { num: '13', name: '目 中横2 (Lower Pupil Bar)', component: 'Eye Radical 109', desc: 'Second interior horizontal divider reinforcing clarity' },
    { num: '14', name: '目 底横 (Ground Foundation)', component: 'Eye Radical 109', desc: 'Final base horizontal sealing the character at rest' },
  ];

  return (
    <div
      id="style-switcher-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn font-serif"
      onClick={closeStyleModal}
    >
      <div
        id="style-switcher-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-primary,#FCFBF8)] text-[var(--text-primary,#171717)] border archival-border shadow-2xl overflow-hidden flex flex-col transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b archival-border bg-[var(--bg-surface,#FFFFFF)]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded border archival-border flex items-center justify-center bg-[var(--bg-subtle,#F4F1EA)]">
              <Sparkles className="w-4 h-4 text-[var(--accent-color,#171717)]" />
            </div>
            <div>
              <h2 className="text-base font-serif font-semibold tracking-tight">
                Archival Style &amp; Calligraphy Engine // 睿字档案与美学系统
              </h2>
              <p className="text-xs font-mono text-[var(--text-muted,#8A8780)]">
                14-Stroke Calligraphic Orthography · Materiality &amp; Typographic Schemes
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={replayAnimation}
              className="px-2.5 py-1 text-xs font-mono border archival-border hover:bg-[var(--bg-subtle,#F4F1EA)] rounded flex items-center space-x-1.5 transition-colors"
              title="Replay Calligraphy Strokes in Traditional Order"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Replay Strokes ⟳</span>
            </button>
            <button
              onClick={closeStyleModal}
              className="p-1.5 text-[var(--text-secondary,#57554F)] hover:text-[var(--text-primary,#171717)] hover:bg-[var(--bg-subtle,#F4F1EA)] rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split into Interactive Preview on Left & Settings on Right */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x archival-border">
          {/* Left Panel: Live Calligraphy Stage */}
          <div className="lg:col-span-5 p-6 flex flex-col items-center justify-center bg-[var(--bg-subtle,#F4F1EA)]/40 relative overflow-hidden">
            {settings.showGridOverlay && (
              <div className="absolute inset-0 archival-grid-pattern opacity-60 pointer-events-none" />
            )}

            <div className="text-center mb-3 z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted,#8A8780)] border archival-border bg-[var(--bg-surface,#FFFFFF)] rounded-full mb-2">
                <span>Script: {settings.calligraphyScript}</span>
                <span>•</span>
                <span>14 Strokes</span>
              </div>
              <p className="text-xs font-serif text-[var(--text-secondary,#57554F)]">
                Live Traditional Inking Sequence
              </p>
            </div>

            {/* Interactive Live Character */}
            <div className="relative p-6 border archival-border bg-[var(--bg-surface,#FFFFFF)] shadow-sm rounded-lg flex items-center justify-center z-10">
              <RuiCalligraphy
                size={210}
                className="transition-all duration-300"
                interactive={true}
              />
            </div>

            {/* Quick Live Actions under Preview */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 z-10">
              <button
                onClick={replayAnimation}
                className="px-3 py-1.5 text-xs font-mono font-medium bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] rounded shadow-sm hover:opacity-90 transition-opacity flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay Inking</span>
              </button>
              <button
                onClick={toggleGridOverlay}
                className={`px-3 py-1.5 text-xs font-mono border archival-border rounded transition-colors flex items-center space-x-1.5 ${
                  settings.showGridOverlay
                    ? 'bg-[var(--accent-color,#171717)] text-[var(--bg-primary,#FCFBF8)]'
                    : 'bg-[var(--bg-surface,#FFFFFF)] hover:bg-[var(--bg-subtle,#F4F1EA)] text-[var(--text-secondary,#57554F)]'
                }`}
              >
                <Grid className="w-3 h-3" />
                <span>Grid: {settings.showGridOverlay ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Archival Lexicon Citation Card */}
            <div className="mt-4 w-full text-[11px] font-mono p-3 bg-[var(--bg-surface,#FFFFFF)] border archival-border rounded space-y-1.5 text-[var(--text-secondary,#57554F)]">
              <div className="flex justify-between border-b archival-border pb-1">
                <span className="text-[var(--text-muted,#8A8780)]">Lexicon:</span>
                <span className="font-semibold text-[var(--text-primary,#171717)]">
                  Kangxi Radical 109 [目]
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted,#8A8780)]">Semantics:</span>
                <span className="text-[var(--text-primary,#171717)]">
                  Wisdom · Sagacity · Vision
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted,#8A8780)]">Typography:</span>
                <span className="text-[var(--text-primary,#171717)]">
                  Times New Roman (Default)
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Settings Controls & Archival Notes */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex items-center border-b archival-border overflow-x-auto text-xs font-mono bg-[var(--bg-surface,#FFFFFF)]">
              <button
                onClick={() => setActiveTab('presets')}
                className={`px-3.5 py-3 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'presets'
                    ? 'border-[var(--text-primary,#171717)] text-[var(--text-primary,#171717)] font-semibold bg-[var(--bg-primary,#FCFBF8)]'
                    : 'border-transparent text-[var(--text-muted,#8A8780)] hover:text-[var(--text-primary,#171717)]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
              <button
                onClick={() => setActiveTab('script')}
                className={`px-3.5 py-3 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'script'
                    ? 'border-[var(--text-primary,#171717)] text-[var(--text-primary,#171717)] font-semibold bg-[var(--bg-primary,#FCFBF8)]'
                    : 'border-transparent text-[var(--text-muted,#8A8780)] hover:text-[var(--text-primary,#171717)]'
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Calligraphy Scripts</span>
              </button>
              <button
                onClick={() => setActiveTab('anatomy')}
                className={`px-3.5 py-3 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'anatomy'
                    ? 'border-[var(--text-primary,#171717)] text-[var(--text-primary,#171717)] font-semibold bg-[var(--bg-primary,#FCFBF8)]'
                    : 'border-transparent text-[var(--text-muted,#8A8780)] hover:text-[var(--text-primary,#171717)]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Stroke Anatomy (14)</span>
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                className={`px-3.5 py-3 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'theme'
                    ? 'border-[var(--text-primary,#171717)] text-[var(--text-primary,#171717)] font-semibold bg-[var(--bg-primary,#FCFBF8)]'
                    : 'border-transparent text-[var(--text-muted,#8A8780)] hover:text-[var(--text-primary,#171717)]'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Theme &amp; Paper</span>
              </button>
              <button
                onClick={() => setActiveTab('typography')}
                className={`px-3.5 py-3 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'typography'
                    ? 'border-[var(--text-primary,#171717)] text-[var(--text-primary,#171717)] font-semibold bg-[var(--bg-primary,#FCFBF8)]'
                    : 'border-transparent text-[var(--text-muted,#8A8780)] hover:text-[var(--text-primary,#171717)]'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Typography</span>
              </button>
              <button
                onClick={() => setActiveTab('animation')}
                className={`px-3.5 py-3 border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
                  activeTab === 'animation'
                    ? 'border-[var(--text-primary,#171717)] text-[var(--text-primary,#171717)] font-semibold bg-[var(--bg-primary,#FCFBF8)]'
                    : 'border-transparent text-[var(--text-muted,#8A8780)] hover:text-[var(--text-primary,#171717)]'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>Inking &amp; Speed</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto max-h-[55vh] space-y-4">
              {/* TAB 1: CURATED PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider">
                      Select Complete Architectural &amp; Calligraphic Presets
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {presets.map((preset) => {
                      const isActive =
                        settings.theme === preset.theme &&
                        settings.calligraphyScript === preset.calligraphyScript;

                      return (
                        <button
                          key={preset.id}
                          onClick={() => applyPreset(preset)}
                          className={`p-3.5 rounded border text-left transition-all relative flex flex-col justify-between ${
                            isActive
                              ? 'border-[var(--text-primary,#171717)] ring-1 ring-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)] shadow-md'
                              : 'border-archival bg-[var(--bg-surface,#FFFFFF)] hover:border-[var(--text-secondary,#57554F)]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center space-x-2">
                                <span
                                  className="w-3 h-3 rounded-full border border-black/10"
                                  style={{ backgroundColor: preset.bgPreview }}
                                />
                                <span className="font-serif font-medium text-sm text-[var(--text-primary,#171717)]">
                                  {preset.name}
                                </span>
                              </div>
                              {isActive && (
                                <span className="p-0.5 rounded-full bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)]">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-cjk text-[var(--accent-color,#171717)] mb-1">
                              {preset.cjkName}
                            </p>
                            <p className="text-xs font-serif text-[var(--text-secondary,#57554F)] leading-relaxed">
                              {preset.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t archival-border flex items-center justify-between text-[11px] font-mono text-[var(--text-muted,#8A8780)]">
                            <span className="uppercase">{preset.calligraphyScript}</span>
                            <span>•</span>
                            <span className="uppercase">{preset.theme}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: CALLIGRAPHY SCRIPTS */}
              {activeTab === 'script' && (
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider block mb-2">
                    5 Distinct Historical Calligraphic Scripts for 睿 (Ruì)
                  </span>

                  <div className="space-y-2.5">
                    {scriptOptions.map((opt) => {
                      const isSelected = settings.calligraphyScript === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setCalligraphyScript(opt.id)}
                          className={`w-full p-3.5 rounded border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[var(--text-primary,#171717)] ring-1 ring-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)]'
                              : 'border-archival bg-[var(--bg-surface,#FFFFFF)] hover:border-[var(--text-secondary,#57554F)]'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-serif font-medium text-sm text-[var(--text-primary,#171717)]">
                                {opt.title}
                              </span>
                              <span className="text-xs font-cjk text-[var(--text-secondary,#57554F)] font-medium">
                                ({opt.cjk})
                              </span>
                            </div>
                            <p className="text-xs font-serif text-[var(--text-secondary,#57554F)]">
                              {opt.desc}
                            </p>
                            <div className="text-[11px] font-mono text-[var(--text-muted,#8A8780)] space-y-0.5 pt-1">
                              <div>Provenance: {opt.dynasty}</div>
                              <div className="text-[10px] text-[var(--text-muted,#A8A59E)] italic">{opt.provenance}</div>
                            </div>
                          </div>

                          <div className="pl-4">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[var(--text-primary,#171717)] bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)]'
                                  : 'border-archival'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: STROKE ANATOMY (14 TRADITIONAL STROKES) */}
              {activeTab === 'anatomy' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--bg-surface,#FFFFFF)] border archival-border rounded">
                    <h3 className="text-sm font-serif font-semibold text-[var(--text-primary,#171717)] mb-1">
                      Etymological Lexicon &amp; 14-Stroke Sequence of 睿 (Ruì)
                    </h3>
                    <p className="text-xs font-serif text-[var(--text-secondary,#57554F)] leading-relaxed">
                      In classical Chinese orthography and the <em>Kangxi Zidian</em> (康熙字典), the character <strong>睿</strong> (ancient variant 叡) is classified under Radical 109 [目] with 9 additional strokes, totaling exactly 14 strokes. It embodies profound discernment, penetrating sight, and enlightened wisdom.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider block">
                      Chronological Stroke Order (笔顺)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {strokeOrderSteps.map((step) => (
                        <div
                          key={step.num}
                          className="p-2.5 bg-[var(--bg-surface,#FFFFFF)] border archival-border rounded flex items-start space-x-2.5 text-xs font-serif"
                        >
                          <span className="font-mono text-[11px] font-bold text-[var(--text-primary,#171717)] bg-[var(--bg-subtle,#F4F1EA)] px-1.5 py-0.5 rounded shrink-0">
                            {step.num}
                          </span>
                          <div>
                            <div className="font-medium text-[var(--text-primary,#171717)]">
                              {step.name}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted,#8A8780)] font-mono">
                              {step.component}
                            </div>
                            <div className="text-[11px] text-[var(--text-secondary,#57554F)] mt-0.5">
                              {step.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: COLOR THEMES & PAPER */}
              {activeTab === 'theme' && (
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider block mb-2">
                    Physical Paper Substrates &amp; Color Palettes
                  </span>

                  <div className="space-y-2.5">
                    {themeOptions.map((theme) => {
                      const isSelected = settings.theme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setTheme(theme.id)}
                          className={`w-full p-3.5 rounded border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[var(--text-primary,#171717)] ring-1 ring-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)]'
                              : 'border-archival bg-[var(--bg-surface,#FFFFFF)] hover:border-[var(--text-secondary,#57554F)]'
                          }`}
                        >
                          <div className="flex items-start space-x-3.5">
                            <div
                              className="w-10 h-10 rounded border shadow-inner flex items-center justify-center shrink-0 font-serif font-bold text-xs"
                              style={{
                                backgroundColor: theme.bgHex,
                                color: theme.textHex,
                                borderColor: theme.borderHex,
                              }}
                            >
                              睿
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-serif font-medium text-sm text-[var(--text-primary,#171717)]">
                                  {theme.name}
                                </span>
                                <span className="text-xs font-cjk text-[var(--text-muted,#8A8780)]">
                                  {theme.cjk}
                                </span>
                              </div>
                              <p className="text-xs font-serif text-[var(--text-secondary,#57554F)]">
                                {theme.desc}
                              </p>
                              <p className="text-[11px] font-mono text-[var(--text-muted,#8A8780)] italic">
                                Substrate: {theme.archivalNote}
                              </p>
                            </div>
                          </div>

                          <div className="pl-3">
                            {isSelected && (
                              <span className="p-1 rounded-full bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] block">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5: TYPOGRAPHY */}
              {activeTab === 'typography' && (
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider block mb-2">
                    Harmonious Typography Pairings (Times New Roman Default)
                  </span>

                  <div className="space-y-2.5">
                    {typographyOptions.map((typo) => {
                      const isSelected = settings.typographyPairing === typo.id;
                      return (
                        <button
                          key={typo.id}
                          onClick={() => setTypographyPairing(typo.id)}
                          className={`w-full p-3.5 rounded border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[var(--text-primary,#171717)] ring-1 ring-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)]'
                              : 'border-archival bg-[var(--bg-surface,#FFFFFF)] hover:border-[var(--text-secondary,#57554F)]'
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="font-serif font-medium text-sm text-[var(--text-primary,#171717)] block">
                              {typo.name}
                            </span>
                            <div className="text-xs font-mono text-[var(--text-secondary,#57554F)]">
                              <span>Headings: {typo.heading}</span>
                            </div>
                            <p className="text-xs font-serif text-[var(--text-muted,#8A8780)]">
                              {typo.desc}
                            </p>
                          </div>

                          <div className="pl-3">
                            {isSelected && (
                              <span className="p-1 rounded-full bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] block">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 6: INKING & ANIMATION SPEED */}
              {activeTab === 'animation' && (
                <div className="space-y-5">
                  {/* Animation Speed */}
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider block mb-2">
                      Calligraphic Stroke Animation Speed
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {speedOptions.map((speed) => {
                        const isSelected = settings.animationSpeed === speed.id;
                        return (
                          <button
                            key={speed.id}
                            onClick={() => setAnimationSpeed(speed.id)}
                            className={`p-3 rounded border text-left transition-all ${
                              isSelected
                                ? 'border-[var(--text-primary,#171717)] ring-1 ring-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)]'
                                : 'border-archival bg-[var(--bg-surface,#FFFFFF)] hover:border-[var(--text-secondary,#57554F)]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-mono font-medium text-[var(--text-primary,#171717)]">
                                {speed.name}
                              </span>
                              <span className="text-[11px] font-mono text-[var(--text-muted,#8A8780)]">
                                {speed.time}
                              </span>
                            </div>
                            <p className="text-[11px] font-serif text-[var(--text-secondary,#57554F)]">
                              {speed.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ink Color Palette */}
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider block mb-2">
                      Mineral Inks &amp; Imperial Seal Color
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {inkColors.map((color) => {
                        const isSelected = settings.inkColor === color.id;
                        return (
                          <button
                            key={color.id}
                            onClick={() => setInkColor(color.id)}
                            className={`p-2.5 rounded border text-left transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-[var(--text-primary,#171717)] ring-1 ring-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)]'
                                : 'border-archival bg-[var(--bg-surface,#FFFFFF)] hover:border-[var(--text-secondary,#57554F)]'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <span
                                className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                                style={{ backgroundColor: color.hex }}
                              />
                              <div>
                                <div className="text-xs font-mono text-[var(--text-primary,#171717)]">
                                  {color.name}
                                </div>
                                <div className="text-[10px] font-serif text-[var(--text-muted,#8A8780)]">
                                  {color.note}
                                </div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[var(--text-primary,#171717)]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t archival-border bg-[var(--bg-surface,#FFFFFF)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-4 text-[var(--text-muted,#8A8780)]">
            <span>ruigallery.xyz // Archival System</span>
            <span>•</span>
            <span>Auto-Saved to Local Storage</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => applyPreset(presets[0])}
              className="px-3 py-1.5 text-[var(--text-secondary,#57554F)] hover:text-[var(--text-primary,#171717)] transition-colors"
            >
              Reset to Default (Washi)
            </button>
            <button
              onClick={closeStyleModal}
              className="px-4 py-1.5 bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] rounded font-medium hover:opacity-90 transition-opacity"
            >
              Apply &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

