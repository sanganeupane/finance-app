import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

import { cn } from '@/utils/cn';

import { CHART_COLORS } from './colors';

export interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    className?: string;
    /** Whether the area under the line is filled. */
    filled?: boolean;
}

/**
 * Tiny trend line used inside market / investment cards.
 * Sized via the parent card, not the window.
 */
export function Sparkline({ data, width = 96, height = 32, color, className, filled = false }: SparklineProps) {
    const lineColor = color ?? (data.length > 1 && data[data.length - 1]! >= data[0]! ? CHART_COLORS.success : CHART_COLORS.danger);
    const points = data.map((value, index) => ({ index, value }));
    const gradientId = `spark-${lineColor.replace('#', '')}-${width}-${height}`;

    return (
        <div className={cn('shrink-0', className)}>
            <ResponsiveContainer width={width} height={height}>
                <LineChart data={points} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={lineColor} stopOpacity={0.18} />
                            <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <YAxis hide domain={['dataMin', 'dataMax']} />
                    <Tooltip
                        cursor={false}
                        contentStyle={{
                            borderRadius: 8,
                            border: `1px solid ${CHART_COLORS.line}`,
                            fontSize: 11,
                            padding: '4px 8px',
                        }}
                        formatter={(value) => [String(value), '']}
                        labelFormatter={() => ''}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={lineColor}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 3, strokeWidth: 0 }}
                        fill={filled ? `url(#${gradientId})` : 'transparent'}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
