import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import clsxm from '@/lib/clsxm';

type DynamicBarChartProps<T extends Record<string, unknown>> = {
  value: T[];
  dataKey: { name: keyof T; color: string }[];
  dataTitle: keyof T;
  minHeight?: number | string;
  chartYAxis?: {
    range: [number, number];
    interval: number;
  };
  chartMainColor?: string;
  chartOpacity?: number;
  tooltipStyle?: React.CSSProperties;
  axisStyle?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<'div'>;

//#region  //*=========== Utility function ===========
/**
 * @function to count how many number to put in axis from a range and interval
 * @returns number
 *
 * make sure that the range is divisible by interval
 */
const countAxis = (range: [number, number], interval: number): number => {
  const difference = range[1] - range[0];
  const result = Math.ceil(difference / interval) + 1;
  return result;
};
//#endregion  //*======== Utility function ===========

export default function DynamicBarChart<T extends Record<string, unknown>>({
  className,
  value,
  dataKey,
  dataTitle,
  minHeight = 'calc(100vh - 56px)',
  chartYAxis = { range: [0, 100], interval: 10 },
  chartMainColor = '#8884d8',
  chartOpacity = 0.4,
  tooltipStyle = {
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  axisStyle = { fontSize: '10px' },
}: DynamicBarChartProps<T>) {
  return (
    <ResponsiveContainer
      width='100%'
      minHeight={minHeight}
      className={clsxm(className)}
    >
      <BarChart data={value}>
        <CartesianGrid strokeDasharray='2 4' />
        <XAxis dataKey={dataTitle as string} style={axisStyle} />
        <YAxis
          type='number'
          domain={chartYAxis.range}
          tickCount={countAxis(chartYAxis.range, chartYAxis.interval)}
          interval={0}
          style={axisStyle}
          width={20}
        />

        <Tooltip contentStyle={tooltipStyle} />

        <Legend align='right' wrapperStyle={{ position: 'relative' }} />

        {/* Colored Bar Chart */}
        {dataKey.map((data) => (
          <Bar
            dataKey={data.name as string}
            fill={data.color}
            key={data.name as string}
            stroke={chartMainColor}
            fillOpacity={chartOpacity}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
