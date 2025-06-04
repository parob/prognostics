
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
}

const OperatingModeBackground: React.FC<OperatingModeBackgroundProps> = ({
  modes,
  width,
  height,
  xScale
}) => {
  return (
    <g className="operating-mode-backgrounds">
      {modes.map((mode, index) => {
        const x1 = xScale(mode.start);
        const x2 = xScale(mode.end);
        const rectWidth = x2 - x1;
        
        console.log(`Background rect for ${mode.mode}:`, {
          x: x1,
          width: rectWidth,
          height,
          color: mode.color
        });
        
        return (
          <rect
            key={`${mode.mode}-${index}`}
            x={x1}
            y={0}
            width={rectWidth}
            height={height}
            fill={mode.color}
            fillOpacity={0.2}
            stroke="none"
          />
        );
      })}
    </g>
  );
};

export default OperatingModeBackground;
