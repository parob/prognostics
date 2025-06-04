
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface RadialGaugeProps {
  data: Array<{
    metric: string;
    value: number;
    fullMark?: number;
  }>;
  className?: string;
  colors?: string[];
}

const RadialGauge: React.FC<RadialGaugeProps> = ({ 
  data, 
  className,
  colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))']
}) => {
  if (data.length === 1) {
    // Single gauge view
    const item = data[0];
    const percentage = Math.round((item.value / (item.fullMark || 100)) * 100);
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              opacity="0.3"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={colors[0]}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold" style={{ color: colors[0] }}>
              {percentage}%
            </div>
            <div className="text-sm text-muted-foreground text-center px-4">
              {item.metric}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 2) {
    // Dual gauge view
    return (
      <div className={cn("flex items-center justify-center gap-8", className)}>
        {data.map((item, index) => {
          const percentage = Math.round((item.value / (item.fullMark || 100)) * 100);
          const circumference = 2 * Math.PI * 35;
          const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
          
          return (
            <div key={item.metric} className="relative w-36 h-36">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                  opacity="0.3"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="6"
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold" style={{ color: colors[index] }}>
                  {percentage}%
                </div>
                <div className="text-xs text-muted-foreground text-center px-2">
                  {item.metric}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Fallback for more than 2 items - use a compact radial chart
  const chartData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length]
  }));

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialGauge;
