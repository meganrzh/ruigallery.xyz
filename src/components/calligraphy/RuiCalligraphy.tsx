import React, { useEffect, useState } from 'react';
import { CalligraphyScript, AnimationSpeed, InkColor } from '../../types/styles';
import { useStyle } from '../../context/StyleContext';

interface RuiCalligraphyProps {
  className?: string;
  size?: number;
  script?: CalligraphyScript;
  speed?: AnimationSpeed;
  ink?: InkColor;
  triggerKey?: number;
  interactive?: boolean;
}

export const RuiCalligraphy: React.FC<RuiCalligraphyProps> = ({
  className = '',
  size = 280,
  script: overrideScript,
  speed: overrideSpeed,
  ink: overrideInk,
  triggerKey: overrideTriggerKey,
  interactive = true,
}) => {
  const { settings } = useStyle();
  const script = overrideScript || settings.calligraphyScript;
  const speed = overrideSpeed || settings.animationSpeed;
  const ink = overrideInk || settings.inkColor;
  const triggerKey = overrideTriggerKey ?? settings.strokeAnimationKey;

  const [hasAnimated, setHasAnimated] = useState(speed === 'static');

  // Compute speed duration and stroke timing
  const speedMultiplier = speed === 'rapid' ? 0.45 : speed === 'meditative' ? 1.8 : 1.0;
  const totalAnimDuration = 2.4 * speedMultiplier;

  useEffect(() => {
    if (speed === 'static') {
      setHasAnimated(true);
      return;
    }

    setHasAnimated(false);
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, totalAnimDuration * 1000 + 400);

    return () => clearTimeout(timer);
  }, [triggerKey, script, speed, totalAnimDuration]);

  // Color map
  const getInkColorHex = (color: InkColor) => {
    switch (color) {
      case 'cinnabar':
        return '#B8282B'; // Seal Vermilion Red
      case 'celadon':
        return '#2C4435'; // Deep Pine Celadon Ink
      case 'white':
        return '#EDE8DF'; // Stele Inscription White/Bone
      case 'gold':
        return '#C5A059'; // Imperial Antique Gold Leaf
      case 'obsidian':
      default:
        return settings.theme === 'obsidian' ? '#ECE7DE' : '#171717';
    }
  };

  const inkColor = getInkColorHex(ink);

  /**
   * AUTHENTIC 14-STROKE ANATOMY OF 睿 (Ruì)
   * Traditional Chinese Stroke Order:
   * 1. ⺊ 竖 (Top vertical)
   * 2. ⺊ 横 (Top horizontal)
   * 3. 撇 (Upper left slant)
   * 4. 捺/点 (Upper right slant/dot)
   * 5. 竖 (Middle chamber left vertical)
   * 6. 横折 (Middle chamber top & right vertical)
   * 7. 横 (Middle chamber inner horizontal)
   * 8. 竖 (Middle chamber center vertical spine)
   * 9. 横 (Middle chamber closing bottom horizontal)
   * 10. 目 左竖 (Bottom eye radical left vertical)
   * 11. 目 横折 (Bottom eye radical top & right vertical)
   * 12. 目 中横1 (Bottom eye radical 1st inner horizontal)
   * 13. 目 中横2 (Bottom eye radical 2nd inner horizontal)
   * 14. 目 底横 (Bottom eye radical closing base horizontal)
   */

  // 1. KAISHU (楷书 - Classical Balanced Regular Script, 14 Traditional Strokes)
  const kaishuStrokes = [
    // 1. Top ⺊ 竖
    { d: 'M 148 24 C 148 36, 150 48, 152 60 C 150 63, 145 61, 144 48 C 143 38, 144 26, 148 24 Z', strokePath: 'M 148 24 L 148 58', delay: 0.05, strokeWidth: 8 },
    // 2. Top ⺊ 横
    { d: 'M 148 42 C 160 40, 178 40, 192 43 C 196 46, 192 49, 182 50 C 168 50, 152 49, 148 48 Z', strokePath: 'M 148 44 L 192 44', delay: 0.16, strokeWidth: 7 },
    // 3. Upper Left 撇
    { d: 'M 136 56 C 130 68, 115 82, 94 92 C 90 94, 88 92, 92 88 C 110 78, 126 66, 136 56 Z', strokePath: 'M 136 56 Q 116 74, 92 90', delay: 0.28, strokeWidth: 7 },
    // 4. Upper Right 捺 / 点
    { d: 'M 164 56 C 172 65, 188 78, 208 88 C 212 90, 210 93, 204 91 C 188 84, 174 72, 164 56 Z', strokePath: 'M 164 56 Q 184 74, 208 88', delay: 0.40, strokeWidth: 7 },
    // 5. Middle Chamber Left 竖
    { d: 'M 82 98 C 84 112, 83 130, 81 144 C 77 142, 78 125, 79 104 C 80 98, 81 96, 82 98 Z', strokePath: 'M 82 98 L 81 144', delay: 0.52, strokeWidth: 7 },
    // 6. Middle Chamber Top & Right 横折
    { d: 'M 80 100 C 120 95, 180 95, 216 99 C 222 104, 220 128, 217 144 C 213 140, 215 110, 208 107 C 170 103, 120 103, 80 100 Z', strokePath: 'M 80 100 L 216 100 L 216 144', delay: 0.65, strokeWidth: 7 },
    // 7. Middle Chamber Inner 横
    { d: 'M 83 120 C 120 118, 175 118, 214 120 C 175 124, 120 124, 83 120 Z', strokePath: 'M 83 120 L 214 120', delay: 0.80, strokeWidth: 6 },
    // 8. Middle Chamber Center 竖
    { d: 'M 148 100 C 150 114, 149 130, 148 144 C 145 142, 146 128, 146 108 Z', strokePath: 'M 148 100 L 148 144', delay: 0.92, strokeWidth: 6 },
    // 9. Middle Chamber Bottom Closing 横
    { d: 'M 79 144 C 120 142, 180 142, 218 144 C 180 148, 120 148, 79 144 Z', strokePath: 'M 79 144 L 218 144', delay: 1.05, strokeWidth: 7 },
    // 10. Bottom 目 Left 竖
    { d: 'M 104 158 C 106 190, 105 235, 102 268 C 98 262, 99 220, 101 170 C 102 160, 103 158, 104 158 Z', strokePath: 'M 104 158 L 102 268', delay: 1.20, strokeWidth: 8 },
    // 11. Bottom 目 Top & Right 横折
    { d: 'M 102 160 C 135 156, 172 156, 194 160 C 200 166, 198 230, 194 268 C 190 260, 192 200, 188 168 C 165 165, 130 165, 102 160 Z', strokePath: 'M 102 160 L 194 160 L 194 268', delay: 1.35, strokeWidth: 8 },
    // 12. Bottom 目 1st Inner 横
    { d: 'M 104 196 C 130 193, 168 193, 192 196 C 168 200, 130 200, 104 196 Z', strokePath: 'M 104 196 L 192 196', delay: 1.50, strokeWidth: 6 },
    // 13. Bottom 目 2nd Inner 横
    { d: 'M 103 232 C 130 229, 168 229, 192 232 C 168 236, 130 236, 103 232 Z', strokePath: 'M 103 232 L 192 232', delay: 1.65, strokeWidth: 6 },
    // 14. Bottom 目 Closing Base 横
    { d: 'M 98 266 C 132 263, 170 263, 200 266 C 170 272, 130 272, 98 266 Z', strokePath: 'M 98 266 L 200 266', delay: 1.80, strokeWidth: 8 },
  ];

  // 2. XINGSHU (行书 - Flowing Semi-Cursive Dynamic Brush Gestures with Connecting Ligaments)
  const xingshuStrokes = [
    // 1. Top ⺊ 竖
    { d: 'M 146 25 C 148 38, 151 52, 154 62 C 150 64, 144 60, 143 46 C 142 36, 144 26, 146 25 Z', strokePath: 'M 146 25 L 152 60', delay: 0.05, strokeWidth: 8 },
    // 2. Top ⺊ 横 leading into left slant
    { d: 'M 148 42 C 162 40, 180 39, 192 44 C 196 48, 186 52, 172 52 C 158 51, 146 49, 148 42 Z', strokePath: 'M 148 42 Q 175 40, 192 44', delay: 0.16, strokeWidth: 7 },
    // 3. Upper Left 撇
    { d: 'M 138 54 C 130 68, 114 82, 90 92 C 86 94, 86 90, 92 86 C 112 76, 128 64, 138 54 Z', strokePath: 'M 138 54 Q 115 75, 90 92', delay: 0.28, strokeWidth: 7 },
    // 4. Upper Right 捺 (flowing touch)
    { d: 'M 162 56 C 172 66, 188 78, 210 88 C 214 91, 208 94, 202 91 C 185 83, 172 71, 162 56 Z', strokePath: 'M 162 56 Q 185 75, 210 88', delay: 0.40, strokeWidth: 7 },
    // 5. Middle Frame Left 竖
    { d: 'M 80 98 C 82 114, 80 132, 78 146 C 75 142, 76 122, 78 104 Z', strokePath: 'M 80 98 L 78 146', delay: 0.52, strokeWidth: 7 },
    // 6. Middle Frame Continuous Top, Right & Center Sweep
    { d: 'M 78 100 C 120 94, 180 94, 218 98 C 224 102, 222 130, 218 144 C 214 138, 216 108, 208 105 C 170 101, 120 102, 78 100 Z', strokePath: 'M 78 100 L 218 98 L 218 144', delay: 0.65, strokeWidth: 7 },
    // 7. Middle Frame Inner 横
    { d: 'M 82 120 C 122 116, 175 117, 214 121 C 175 125, 120 125, 82 120 Z', strokePath: 'M 82 120 L 214 121', delay: 0.80, strokeWidth: 6 },
    // 8. Middle Frame Center 竖 (connecting downward)
    { d: 'M 148 98 C 150 114, 149 132, 148 146 C 145 143, 146 128, 146 106 Z', strokePath: 'M 148 98 L 148 146', delay: 0.92, strokeWidth: 6 },
    // 9. Middle Frame Bottom 横
    { d: 'M 76 144 C 120 141, 180 141, 220 145 C 180 149, 120 149, 76 144 Z', strokePath: 'M 76 144 L 220 145', delay: 1.05, strokeWidth: 7 },
    // 10. Bottom 目 Left 竖
    { d: 'M 102 156 C 105 190, 104 235, 100 268 C 96 262, 98 220, 100 168 Z', strokePath: 'M 102 156 L 100 268', delay: 1.20, strokeWidth: 8 },
    // 11. Bottom 目 Top & Right with dynamic flowing hook
    { d: 'M 100 158 C 134 154, 172 154, 196 158 C 202 164, 200 230, 196 268 C 190 260, 192 198, 188 166 C 164 163, 130 163, 100 158 Z', strokePath: 'M 100 158 L 196 158 L 196 268', delay: 1.35, strokeWidth: 8 },
    // 12. Bottom 目 1st Inner 横
    { d: 'M 102 194 C 130 191, 168 191, 192 195 C 168 199, 130 198, 102 194 Z', strokePath: 'M 102 194 L 192 195', delay: 1.50, strokeWidth: 6 },
    // 13. Bottom 目 2nd Inner 横
    { d: 'M 101 230 C 130 227, 168 227, 192 231 C 168 235, 130 235, 101 230 Z', strokePath: 'M 101 230 L 192 231', delay: 1.65, strokeWidth: 6 },
    // 14. Bottom 目 Base Closing Ground
    { d: 'M 96 266 C 134 262, 172 262, 204 266 C 172 272, 130 272, 96 266 Z', strokePath: 'M 96 266 L 204 266', delay: 1.80, strokeWidth: 8 },
  ];

  // 3. ZHUANSHU (篆书 - Archaic Qin Seal Script with Monumental Rounded Symmetrical Geometry)
  const zhuanshuStrokes = [
    // 1. Central Crown Vertical Stem
    { d: 'M 150 24 L 150 62', strokePath: 'M 150 24 L 150 62', delay: 0.05, strokeWidth: 6 },
    // 2. Crown Symmetrical Horizontal Arch
    { d: 'M 120 44 C 135 40, 165 40, 180 44', strokePath: 'M 120 44 C 135 40, 165 40, 180 44', delay: 0.16, strokeWidth: 6 },
    // 3. Left Symmetrical Arch Wing
    { d: 'M 140 56 C 120 68, 100 82, 85 96', strokePath: 'M 140 56 C 120 68, 100 82, 85 96', delay: 0.28, strokeWidth: 6 },
    // 4. Right Symmetrical Arch Wing
    { d: 'M 160 56 C 180 68, 200 82, 215 96', strokePath: 'M 160 56 C 180 68, 200 82, 215 96', delay: 0.40, strokeWidth: 6 },
    // 5. Middle Frame Left Vertical
    { d: 'M 80 96 L 80 148', strokePath: 'M 80 96 L 80 148', delay: 0.52, strokeWidth: 6 },
    // 6. Middle Frame Top Arch & Right Vertical
    { d: 'M 80 96 C 120 92, 180 92, 220 96 L 220 148', strokePath: 'M 80 96 C 120 92, 180 92, 220 96 L 220 148', delay: 0.65, strokeWidth: 6 },
    // 7. Middle Frame Inner Horizontal
    { d: 'M 80 122 L 220 122', strokePath: 'M 80 122 L 220 122', delay: 0.80, strokeWidth: 5 },
    // 8. Middle Frame Center Vertical Axis
    { d: 'M 150 96 L 150 148', strokePath: 'M 150 96 L 150 148', delay: 0.92, strokeWidth: 5 },
    // 9. Middle Frame Base Closing Arch
    { d: 'M 80 148 C 120 144, 180 144, 220 148', strokePath: 'M 80 148 C 120 144, 180 144, 220 148', delay: 1.05, strokeWidth: 6 },
    // 10. Bottom 目 Left Vertical Axis
    { d: 'M 106 160 L 106 270', strokePath: 'M 106 160 L 106 270', delay: 1.20, strokeWidth: 6 },
    // 11. Bottom 目 Top Arch & Right Vertical Axis
    { d: 'M 106 160 C 135 156, 165 156, 194 160 L 194 270', strokePath: 'M 106 160 C 135 156, 165 156, 194 160 L 194 270', delay: 1.35, strokeWidth: 6 },
    // 12. Bottom 目 Upper Symmetrical Eye Bar
    { d: 'M 106 196 L 194 196', strokePath: 'M 106 196 L 194 196', delay: 1.50, strokeWidth: 5 },
    // 13. Bottom 目 Lower Symmetrical Eye Bar
    { d: 'M 106 232 L 194 232', strokePath: 'M 106 232 L 194 232', delay: 1.65, strokeWidth: 5 },
    // 14. Bottom 目 Ground Base Symmetrical Arch
    { d: 'M 100 270 C 135 266, 165 266, 200 270', strokePath: 'M 100 270 C 135 266, 165 266, 200 270', delay: 1.80, strokeWidth: 6 },
  ];

  // 4. GEOMETRIC MINIMALIST (现代线条 - Monoline Architectural / Bauhaus Vector)
  const geometricStrokes = [
    // 1. Top ⺊ 竖
    { d: 'M 150 24 L 150 58', strokePath: 'M 150 24 L 150 58', delay: 0.05, strokeWidth: 5 },
    // 2. Top ⺊ 横
    { d: 'M 150 42 L 192 42', strokePath: 'M 150 42 L 192 42', delay: 0.16, strokeWidth: 5 },
    // 3. Upper Left 撇
    { d: 'M 136 56 L 92 90', strokePath: 'M 136 56 L 92 90', delay: 0.28, strokeWidth: 5 },
    // 4. Upper Right 捺
    { d: 'M 164 56 L 208 90', strokePath: 'M 164 56 L 208 90', delay: 0.40, strokeWidth: 5 },
    // 5. Middle Chamber Left 竖
    { d: 'M 80 98 L 80 146', strokePath: 'M 80 98 L 80 146', delay: 0.52, strokeWidth: 5 },
    // 6. Middle Chamber Top & Right 横折
    { d: 'M 80 98 L 220 98 L 220 146', strokePath: 'M 80 98 L 220 98 L 220 146', delay: 0.65, strokeWidth: 5 },
    // 7. Middle Chamber Inner 横
    { d: 'M 80 122 L 220 122', strokePath: 'M 80 122 L 220 122', delay: 0.80, strokeWidth: 4 },
    // 8. Middle Chamber Center 竖
    { d: 'M 150 98 L 150 146', strokePath: 'M 150 98 L 150 146', delay: 0.92, strokeWidth: 4 },
    // 9. Middle Chamber Bottom Closing 横
    { d: 'M 80 146 L 220 146', strokePath: 'M 80 146 L 220 146', delay: 1.05, strokeWidth: 5 },
    // 10. Bottom 目 Left 竖
    { d: 'M 104 158 L 104 270', strokePath: 'M 104 158 L 104 270', delay: 1.20, strokeWidth: 5 },
    // 11. Bottom 目 Top & Right 横折
    { d: 'M 104 158 L 196 158 L 196 270', strokePath: 'M 104 158 L 196 158 L 196 270', delay: 1.35, strokeWidth: 5 },
    // 12. Bottom 目 1st Inner 横
    { d: 'M 104 195 L 196 195', strokePath: 'M 104 195 L 196 195', delay: 1.50, strokeWidth: 4 },
    // 13. Bottom 目 2nd Inner 横
    { d: 'M 104 232 L 196 232', strokePath: 'M 104 232 L 196 232', delay: 1.65, strokeWidth: 4 },
    // 14. Bottom 目 Closing Base 横
    { d: 'M 96 270 L 204 270', strokePath: 'M 96 270 L 204 270', delay: 1.80, strokeWidth: 5 },
  ];

  // 5. STELE INSCRIPTION (汉魏碑刻 - Epigraphic Chiseled Stone Rubbing)
  const steleStrokes = [
    // 1. Top ⺊ 竖
    { d: 'M 146 22 L 152 22 L 152 58 L 144 58 Z', strokePath: 'M 148 22 L 148 58', delay: 0.05, strokeWidth: 8 },
    // 2. Top ⺊ 横
    { d: 'M 148 40 L 194 38 L 196 48 L 148 48 Z', strokePath: 'M 148 44 L 194 44', delay: 0.16, strokeWidth: 7 },
    // 3. Upper Left 撇
    { d: 'M 138 54 L 146 58 L 94 94 L 88 88 Z', strokePath: 'M 138 54 L 90 92', delay: 0.28, strokeWidth: 8 },
    // 4. Upper Right 捺
    { d: 'M 162 54 L 212 90 L 204 96 L 156 60 Z', strokePath: 'M 162 54 L 210 92', delay: 0.40, strokeWidth: 8 },
    // 5. Middle Chamber Left 竖
    { d: 'M 78 96 L 86 96 L 84 146 L 76 146 Z', strokePath: 'M 80 96 L 80 146', delay: 0.52, strokeWidth: 8 },
    // 6. Middle Chamber Top & Right 横折
    { d: 'M 78 96 L 222 94 L 224 146 L 214 146 L 214 104 L 78 104 Z', strokePath: 'M 78 98 L 220 98 L 220 146', delay: 0.65, strokeWidth: 8 },
    // 7. Middle Chamber Inner 横
    { d: 'M 80 118 L 218 118 L 218 126 L 80 126 Z', strokePath: 'M 80 122 L 218 122', delay: 0.80, strokeWidth: 6 },
    // 8. Middle Chamber Center 竖
    { d: 'M 146 98 L 154 98 L 154 146 L 146 146 Z', strokePath: 'M 150 98 L 150 146', delay: 0.92, strokeWidth: 6 },
    // 9. Middle Chamber Bottom 横
    { d: 'M 76 142 L 224 142 L 224 150 L 76 150 Z', strokePath: 'M 76 146 L 224 146', delay: 1.05, strokeWidth: 8 },
    // 10. Bottom 目 Left 竖
    { d: 'M 100 156 L 108 156 L 106 270 L 98 270 Z', strokePath: 'M 102 156 L 102 270', delay: 1.20, strokeWidth: 8 },
    // 11. Bottom 目 Top & Right 横折
    { d: 'M 100 156 L 198 154 L 200 270 L 190 270 L 190 164 L 100 164 Z', strokePath: 'M 100 158 L 196 158 L 196 270', delay: 1.35, strokeWidth: 8 },
    // 12. Bottom 目 1st Inner 横
    { d: 'M 102 192 L 194 192 L 194 200 L 102 200 Z', strokePath: 'M 102 196 L 194 196', delay: 1.50, strokeWidth: 6 },
    // 13. Bottom 目 2nd Inner 横
    { d: 'M 102 228 L 194 228 L 194 236 L 102 236 Z', strokePath: 'M 102 232 L 194 232', delay: 1.65, strokeWidth: 6 },
    // 14. Bottom 目 Closing Base 横
    { d: 'M 94 264 L 204 264 L 204 274 L 94 274 Z', strokePath: 'M 94 268 L 204 268', delay: 1.80, strokeWidth: 9 },
  ];

  // Pick stroke data based on script
  const isLineStroke = script === 'zhuanshu' || script === 'geometric';
  const getStrokeList = () => {
    switch (script) {
      case 'xingshu':
        return xingshuStrokes;
      case 'zhuanshu':
        return zhuanshuStrokes;
      case 'geometric':
        return geometricStrokes;
      case 'stele':
        return steleStrokes;
      case 'kaishu':
      default:
        return kaishuStrokes;
    }
  };

  const strokes = getStrokeList();

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${
        interactive ? 'hover:scale-[1.02]' : ''
      } ${className}`}
      style={{ width: size, height: size }}
      aria-label={`睿 (Ruì) Calligraphic Character - ${script}`}
      title={`睿 (Ruì) Calligraphy — 14 Traditional Strokes (${script.toUpperCase()})`}
    >
      <svg
        key={`${script}-${triggerKey}-${speed}`}
        viewBox="0 0 300 300"
        width="100%"
        height="100%"
        className="w-full h-full transition-colors duration-500 overflow-visible"
        style={{
          color: inkColor,
          filter:
            settings.theme === 'obsidian'
              ? 'drop-shadow(0 2px 8px rgba(255,255,255,0.08))'
              : 'drop-shadow(0 1px 2px rgba(0,0,0,0.06))',
        }}
      >
        <g>
          {strokes.map((stroke, idx) => {
            const calculatedDelay = (stroke.delay * speedMultiplier).toFixed(2);
            const calculatedDuration = (0.55 * speedMultiplier).toFixed(2);

            return isLineStroke ? (
              <path
                key={idx}
                d={stroke.d}
                fill="none"
                stroke="currentColor"
                strokeWidth={stroke.strokeWidth || (script === 'geometric' ? 5 : 6)}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={!hasAnimated ? 'calligraphy-stroke' : ''}
                style={{
                  animationDelay: `${calculatedDelay}s`,
                  animationDuration: `${calculatedDuration}s`,
                }}
              />
            ) : (
              /* For authentic brush and stele scripts: render both the contour and animated drawing stroke */
              <g key={idx}>
                {/* Master filled calligraphy stroke */}
                <path
                  d={stroke.d}
                  fill="currentColor"
                  className={!hasAnimated ? 'calligraphy-fill-in' : ''}
                  style={{
                    animationDelay: `${calculatedDelay}s`,
                    animationDuration: `${calculatedDuration}s`,
                  }}
                />
                {/* Active vector brush stroke for the painting animation */}
                {!hasAnimated && (
                  <path
                    d={stroke.strokePath || stroke.d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke.strokeWidth || 7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="calligraphy-stroke"
                    style={{
                      animationDelay: `${calculatedDelay}s`,
                      animationDuration: `${calculatedDuration}s`,
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

