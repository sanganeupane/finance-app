import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { cn } from '@/utils/cn';

import { CHART_COLORS } from './colors';

export interface DonutSlice {
    key: string;
    label: string;
    value: number;
    color: string;
}

export interface DonutChartProps {
    data: DonutSlice[];
    /** Center label (e.g. total spent). */
    centerLabel?: string;
    centerValue?: string;
    height?: number;
    className?: string;
}

/**
 * Donut chart for category splits (spending breakdown).
 * Uses white stroke to create a clean "donut" ring.
 */
export function DonutChart({ data, centerLabel, centerValue, height = 200, className }: DonutChartProps) {
    const total = data.reduce((sum, slice) => sum + slice.value, 0);

    return (
        <div className={cn('relative w-full', className)}>
            <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        innerRadius="68%"
                        outerRadius="100%"
                        paddingAngle={2}
                        strokeWidth={0}
                    >
                        {data.map((slice) => (
                            <Cell key={slice.key} fill={slice.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: 12,
                            border: `1px solid ${CHART_COLORS.line}`,
                            fontSize: 12,
                            boxShadow: '0 8px 24px rgb(17 24 39 / 0.1)',
                        }}
                        formatter={(value, name) => [
                            `${Number(value).toLocaleString('en-US')} (${((Number(value) / total) * 100).toFixed(1)}%)`,
                            String(name),
                        ]}
                    />
                </PieChart>
            </ResponsiveContainer>
            {(centerLabel || centerValue) && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    {centerValue && <p className="text-lg font-semibold text-ink">{centerValue}</p>}
                    {centerLabel && <p className="text-xs text-muted">{centerLabel}</p>}
                </div>
            )}
        </div>
    );
}
