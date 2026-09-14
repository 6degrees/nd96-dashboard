'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    LabelList,
} from 'recharts'
import i18n from "@/i18n";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface Department {
    department_id: string
    department_ar: string
    department_en: string
    total: number
}

interface TopDepartmentsChartProps {
    departments?: Department[]
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Custom Label
|--------------------------------------------------------------------------
*/

function CustomBarLabel(props: any) {
    const { x, y, width, height, value } = props
    const isArabic = i18n.language === 'ar'

    if (!value || !width || width < 45) return null

    return (
        <text
            x={x + 10}
            y={y + height / 2}
            dominantBaseline="middle"
            textAnchor={isArabic ? 'end' : 'start'}
            fill="#000"
            fontSize={12}
            fontWeight={500}
        >
            {value}
        </text>
    )
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export function TopDepartmentsChart({departments = [], loading = false,}: TopDepartmentsChartProps) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'

    /*
    |--------------------------------------------------------------------------
    | Top 5 Departments
    |--------------------------------------------------------------------------
    */
    const data = [...departments]
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)
        .map((department, index) => ({
            ...department,
            name: isArabic
                ? department.department_ar
                : department.department_en,
            rank: index + 1,
        }))

    /*
    |--------------------------------------------------------------------------
    | Ranking Colors
    |--------------------------------------------------------------------------
    */

    const rankingColors = [
        '#0F766E', // Deep Teal
        '#2563EB', // Modern Blue
        '#7C3AED', // Violet
        '#DB2777', // Pink
        '#EA580C', // Orange
    ];

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="rounded-2xl border border-border-light bg-surface-card p-4 shadow-sm sm:p-6">
                <div className="animate-pulse space-y-5">
                    <div className="h-5 w-48 rounded-lg bg-surface-muted" />

                    <div className="h-[280px] rounded-xl bg-surface-muted" />
                </div>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!data.length) {
        return (
            <div className="rounded-2xl border border-border-light bg-surface-card p-4 shadow-sm sm:p-6">
                <div className="mb-6">
                    <h2 className="text-base font-bold text-text-primary">
                        {t('dashboard.top_departments.title')}
                    </h2>

                    <p className="mt-1 text-sm text-text-muted">
                        {t('dashboard.top_departments.subtitle')}
                    </p>
                </div>

                <div className="flex h-[280px] items-center justify-center rounded-xl bg-surface-soft text-sm text-text-muted">
                    {t('common.noData')}
                </div>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="min-w-0 rounded-2xl border border-border-light bg-surface-card p-4 shadow-sm sm:p-6">
            {/* Header */}

            <div className="mb-5 sm:mb-6">
                <h2 className="text-base font-bold text-text-primary">
                    {t('dashboard.top_departments.title')}
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                    {t('dashboard.top_departments.subtitle')}
                </p>
            </div>

            {/* Chart */}

            <div className="h-[250px] w-full min-w-0 sm:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 5,
                        }}
                        barCategoryGap="25%"
                    >
                        <CartesianGrid
                            horizontal={false}
                            stroke="var(--color-border-light)"
                        />

                        <XAxis
                            type="number"
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--color-text-muted)',
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            type="category"
                            dataKey="name"
                            width={0}
                            axisLine={false}
                            tickLine={false}
                            tick={false}
                        />

                        <Tooltip
                            cursor={{
                                fill: 'var(--color-surface-muted)',
                            }}
                            contentStyle={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-md)',
                            }}
                            labelStyle={{
                                color: 'var(--color-text-primary)',
                                fontWeight: 600,
                            }}
                            itemStyle={{
                                color: 'var(--color-text-secondary)',
                            }}
                            formatter={(value: any) => [
                                value,
                                t('dashboard.top_departments.messages'),
                            ]}
                        />

                        <Bar
                            dataKey="total"
                            radius={[0, 8, 8, 0]}
                            barSize={28}
                            isAnimationActive={false}
                        >

                            <LabelList
                                dataKey="name"
                                content={<CustomBarLabel  />}
                            />

                            {data.map((entry) => (
                                <Cell
                                    key={entry.department_id}
                                    fill={rankingColors[entry.rank - 1]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Ranking */}

            <div className="mt-5 space-y-2">
                {data.map((department, index) => (
                    <div
                        key={department.department_id}
                        className="flex items-center justify-between rounded-xl border border-border-light bg-surface-soft px-3 py-2.5"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                                style={{
                                    backgroundColor: rankingColors[index],
                                }}
                            >
                                {index + 1}
                            </div>

                            <span className="truncate text-sm font-semibold text-text-primary">
                                {department.name}
                            </span>
                        </div>

                        <span className="shrink-0 text-sm font-bold text-text-primary">
                            {department.total}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}