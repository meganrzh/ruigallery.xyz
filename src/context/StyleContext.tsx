import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeMode,
  CalligraphyScript,
  TypographyPairing,
  AnimationSpeed,
  InkColor,
  StyleSettings,
  StylePreset,
} from '../types/styles';
import { STYLE_PRESETS } from '../data/stylePresets';

interface StyleContextType {
  settings: StyleSettings;
  setTheme: (theme: ThemeMode) => void;
  setCalligraphyScript: (script: CalligraphyScript) => void;
  setTypographyPairing: (pairing: TypographyPairing) => void;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  setInkColor: (color: InkColor) => void;
  toggleGridOverlay: () => void;
  replayAnimation: () => void;
  applyPreset: (preset: StylePreset | string) => void;
  isStyleModalOpen: boolean;
  openStyleModal: () => void;
  closeStyleModal: () => void;
  toggleStyleModal: () => void;
  presets: StylePreset[];
}

const STORAGE_KEY = 'rui_style_preferences_v2';

const DEFAULT_SETTINGS: StyleSettings = {
  theme: 'washi',
  calligraphyScript: 'kaishu',
  typographyPairing: 'classical',
  animationSpeed: 'authentic',
  inkColor: 'obsidian',
  showGridOverlay: false,
  strokeAnimationKey: 1,
};

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<StyleSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved), strokeAnimationKey: 1 };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);

  // Sync to DOM root element & LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          theme: settings.theme,
          calligraphyScript: settings.calligraphyScript,
          typographyPairing: settings.typographyPairing,
          animationSpeed: settings.animationSpeed,
          inkColor: settings.inkColor,
          showGridOverlay: settings.showGridOverlay,
        })
      );
    } catch {
      // Ignore write errors
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-font', settings.typographyPairing);
    root.setAttribute('data-script', settings.calligraphyScript);

    if (settings.theme === 'obsidian') {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }, [settings]);

  const setTheme = (theme: ThemeMode) => {
    setSettings((prev) => {
      // Intelligently adapt default ink color if switching to obsidian or back
      let newInkColor = prev.inkColor;
      if (theme === 'obsidian' && prev.inkColor === 'obsidian') {
        newInkColor = 'white';
      } else if (theme !== 'obsidian' && prev.inkColor === 'white') {
        newInkColor = 'obsidian';
      }
      return { ...prev, theme, inkColor: newInkColor };
    });
  };

  const setCalligraphyScript = (calligraphyScript: CalligraphyScript) => {
    setSettings((prev) => ({
      ...prev,
      calligraphyScript,
      strokeAnimationKey: prev.strokeAnimationKey + 1,
    }));
  };

  const setTypographyPairing = (typographyPairing: TypographyPairing) => {
    setSettings((prev) => ({ ...prev, typographyPairing }));
  };

  const setAnimationSpeed = (animationSpeed: AnimationSpeed) => {
    setSettings((prev) => ({
      ...prev,
      animationSpeed,
      strokeAnimationKey: prev.strokeAnimationKey + 1,
    }));
  };

  const setInkColor = (inkColor: InkColor) => {
    setSettings((prev) => ({ ...prev, inkColor }));
  };

  const toggleGridOverlay = () => {
    setSettings((prev) => ({ ...prev, showGridOverlay: !prev.showGridOverlay }));
  };

  const replayAnimation = () => {
    setSettings((prev) => ({
      ...prev,
      strokeAnimationKey: prev.strokeAnimationKey + 1,
    }));
  };

  const applyPreset = (presetInput: StylePreset | string) => {
    const preset =
      typeof presetInput === 'string'
        ? STYLE_PRESETS.find((p) => p.id === presetInput)
        : presetInput;

    if (!preset) return;

    setSettings((prev) => ({
      ...prev,
      theme: preset.theme,
      calligraphyScript: preset.calligraphyScript,
      typographyPairing: preset.typographyPairing,
      animationSpeed: preset.animationSpeed,
      inkColor: preset.inkColor,
      strokeAnimationKey: prev.strokeAnimationKey + 1,
    }));
  };

  const openStyleModal = () => setIsStyleModalOpen(true);
  const closeStyleModal = () => setIsStyleModalOpen(false);
  const toggleStyleModal = () => setIsStyleModalOpen((prev) => !prev);

  return (
    <StyleContext.Provider
      value={{
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
        openStyleModal,
        closeStyleModal,
        toggleStyleModal,
        presets: STYLE_PRESETS,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = (): StyleContextType => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};
