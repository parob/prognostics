
import React from 'react';

interface OperatingMode {
  mode: string;
  start: number;
  end: number;
  color: string;
}

interface OperatingModeBackgroundProps {
  modes: OperatingMode[];
  width: number;
  height: number;
  xScale: any;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const OperatingModeBackground: React.FC<OperatingModeBackgroundProps> = ({
  modes,
  width,
  height,
  xScale,
  margin = { top: 20, right: 80, bottom: 60, left: 80 }
}) => {
  // Calculate the actual plotting area dimensions
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  
  return (
    <g className="operating-mode-backgrounds" transform={`translate(${margin.left},${margin.top})`}>
      {modes.map((mode, index) => {
        const x1 = xScale(mode.start);
        const x2 = xScale(mode.end);
        const rectWidth = x2 - x1;
        
        // Ensure the rectangle stays within the plot area
        const clampedX = Math.max(0, Math.min(x1, plotWidth));
        const clampedWidth = Math.max(0, Math.min(rectWidth, plotWidth - clampedX));
        
        console.log(`Background rect for ${mode.mode}:`, {
          x: clampedX,
          width: clampedWidth,
          height: plotHeight,
          color: mode.color,
          plotArea: { width: plotWidth, height: plotHeight }
        });
        
        return (
          <rect
            key={`${mode.mode}-${index}`}
            x={clampedX}
            y={0}
            width={clampedWidth}
            height={plotHeight}
            fill={mode.color}
            fillOpacity={0.3}
            stroke="none"
            pointerEvents="none"
          />
        );
      })}
    </g>
  );
};

export default OperatingModeBackground;
