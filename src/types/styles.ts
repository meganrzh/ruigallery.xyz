export type ThemeMode = 'washi' | 'obsidian' | 'swiss' | 'celadon' | 'vermilion';

export type CalligraphyScript = 'kaishu' | 'xingshu' | 'zhuanshu' | 'geometric' | 'stele';

export type TypographyPairing = 'classical' | 'modern' | 'monastic' | 'technical';

export type AnimationSpeed = 'authentic' | 'rapid' | 'meditative' | 'static';

export type InkColor = 'obsidian' | 'cinnabar' | 'celadon' | 'white' | 'gold';

export interface StylePreset {
  id: string;
  name: string;
  cjkName: string;
  description: string;
  theme: ThemeMode;
  calligraphyScript: CalligraphyScript;
  typographyPairing: TypographyPairing;
  animationSpeed: AnimationSpeed;
  inkColor: InkColor;
  accentColor: string;
  bgPreview: string;
  textPreview: string;
}

export interface StyleSettings {
  theme: ThemeMode;
  calligraphyScript: CalligraphyScript;
  typographyPairing: TypographyPairing;
  animationSpeed: AnimationSpeed;
  inkColor: InkColor;
  showGridOverlay: boolean;
  strokeAnimationKey: number; // Increment to trigger replay
}
