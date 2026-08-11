import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { cn } from '@/utils/cn';

import { CHART_COLORS } from './colors';

export interface BarTrendPoint {
    label: string;
    value: number;
}

export interface BarTrendProps {
    data: BarTrendPoint[];
    height?: number;
    color?: string;
    className?: string;
    /** When set, bars are colored individually by this accessor. */
    colorBy?: (point: BarTrendPoint, index: number) => string;
    yFormatter?: (value: number) => string;
    xFormatter?: (value: unknown) => string;
}

/**
 * Rounded bar chart used for monthly totals and platform splits.
 */
export function BarTrend({
    data,
    height = 220,
    color = CHART_COLORS.primary,
    className,
    colorBy,
    yFormatter,
    xFormatter,
}: BarTrendProps) {
    return (
        <div className={cn('w-full', className)}>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }} barCategoryGap="28%">
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
                        cursor={{ fill: CHART_COLORS.primarySoft, opacity: 0.4 }}
                        contentStyle={{
                            borderRadius: 12,
                            border: `1px solid ${CHART_COLORS.line}`,
                            fontSize: 12,
                            boxShadow: '0 8px 24px rgb(17 24 39 / 0.1)',
                        }}
                        formatter={(value) => [yFormatter?.(Number(value)) ?? String(value), '']}
                        labelFormatter={xFormatter}
                    />
                    <Bar dataKey="value" radius={[6, 6, 2, 2]} maxBarSize={32}>
                        {data.map((point, index) => (
                            <Cell key={point.label} fill={colorBy?.(point, index) ?? color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
