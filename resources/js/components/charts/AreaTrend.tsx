import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { cn } from '@/utils/cn';

import { CHART_COLORS } from './colors';

export interface AreaTrendPoint {
    label: string;
    value: number;
}

export interface AreaTrendProps {
    data: AreaTrendPoint[];
    height?: number;
    color?: string;
    className?: string;
    yFormatter?: (value: number) => string;
    xFormatter?: (value: unknown) => string;
}

/**
 * Smooth gradient area chart used for balance / spending trends.
 * Responsive by default (fills its parent's width).
 */
export function AreaTrend({
    data,
    height = 220,
    color = CHART_COLORS.primary,
    className,
    yFormatter,
    xFormatter,
}: AreaTrendProps) {
    return (
        <div className={cn('w-full', className)}>
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
                    <defs>
                        <linearGradient id={`area-fill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: CHART_COLORS.muted }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={xFormatter}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: CHART_COLORS.muted }}
                        tickLine={false}
                        axisLine={false}
                        width={56}
                        tickFormatter={yFormatter}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: 12,
                            border: `1px solid ${CHART_COLORS.line}`,
                            fontSize: 12,
                            boxShadow: '0 8px 24px rgb(17 24 39 / 0.1)',
                        }}
                        formatter={(value) => [yFormatter?.(Number(value)) ?? String(value), '']}
                        labelFormatter={xFormatter}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2.5}
                        fill={`url(#area-fill-${color.replace('#', '')})`}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
