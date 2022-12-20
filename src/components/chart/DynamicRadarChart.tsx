/**
 * @component to show Radar Chart
 * 
 * @param value : consist array of object
 * @param dataKey : a string contains what key of object in 'value' should be referenced in chart
 * @example usage :
 * const data = [
      {
        title: 'Recovery',
        customKey: 100,
      },
    ];
  <DynamicRadarChart value={data} dataKey='customKey' />
  * @optional params
  * @param chartTextSize : determine chart font size
  * @param chartMainColor : determine main color of the radar chart and the tooltip
  * @param chartOpacity : determine the opacity of the chart
  * @param tooltipStyle : determine the style of the tooltip
 */

import React from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import clsxm from '@/lib/clsxm';

type RadarChartProps<T extends Record<string, unknown>> = {
  value: T[];
  dataKey: keyof T;
  chartTextSize?: number;
  chartMainColor?: string;
  chartOpacity?: number;
  tooltipStyle?: React.CSSProperties;
  minHeight?: string | number;
} & React.ComponentPropsWithoutRef<'div'>;

export default function DynamicRadarChart<T extends Record<string, unknown>>({
  value,
  dataKey,
  className,
  chartTextSize = 10,
  chartMainColor = '#8884d8',
  chartOpacity = 0.4,
  tooltipStyle = { borderRadius: '6px', backgroundColor: '#eef2ff' },
  minHeight,
}: RadarChartProps<T>) {
  return (
    <div className={clsxm('relative ', className)}>
      <ResponsiveContainer minHeight={minHeight}>
        <RadarChart data={value}>
          <PolarGrid />
          <Tooltip contentStyle={tooltipStyle} />
          <PolarAngleAxis dataKey='title' fontSize={chartTextSize} />
          <PolarRadiusAxis />
          <Radar
            dataKey={dataKey as string}
            stroke={chartMainColor}
            fill={chartMainColor}
            fillOpacity={chartOpacity}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
