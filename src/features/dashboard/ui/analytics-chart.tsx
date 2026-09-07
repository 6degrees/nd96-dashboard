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
} from 'recharts'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface WeeklyMessage {
    date: string
    day: string
    total: number
}

interface WeeklyMessagesChartProps {
    weekly?: WeeklyMessage[]
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| Displays the number of messages created during the last 7 days.
|
*/

export function WeeklyMessagesChart({weekly = [], loading = false,}: WeeklyMessagesChartProps) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    */

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Total Messages
    |--------------------------------------------------------------------------
    */

    const totalMessages = weekly.reduce(
        (total, item) => total + item.total,
        0
    )

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div
                className="
                    h-[420px]
                    rounded-xl
                    border
                    border-[var(--color-border-light)]
                    bg-[var(--color-surface)]
                    p-6
                    shadow-[var(--shadow-sm)]
                "
            >
                <div className="flex h-full animate-pulse flex-col">

                    <div className="h-5 w-40 rounded-md bg-[var(--color-surface-muted)]" />

                    <div className="mt-2 h-3 w-64 rounded-md bg-[var(--color-surface-muted)]" />

                    <div className="mt-8 flex flex-1 items-end gap-4">

                        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                            <div
                                key={item}
                                className="
                                    flex-1
                                    rounded-t-lg
                                    bg-[var(--color-surface-muted)]
                                "
                                style={{
                                    height: `${20 + item * 8}%`,
                                }}
                            />
                        ))}

                    </div>

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
        <div
            className="
                rounded-xl
                border
                border-[var(--color-border-light)]
                bg-[var(--color-surface)]
                p-6
                shadow-[var(--shadow-sm)]
                transition-colors
                duration-200
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div className="mb-6 flex items-start justify-between gap-4">

                <div>

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-[var(--color-text-primary)]
                        "
                    >
                        {t('dashboard.weekly_messages.title')}
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-[var(--color-text-muted)]
                        "
                    >
                        {t('dashboard.weekly_messages.subtitle')}
                    </p>

                </div>

                <div
                    className="
                        shrink-0
                        rounded-lg
                        bg-[var(--color-surface-green)]
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-[var(--color-success)]
                    "
                >
                    {totalMessages}{' '}
                    {t('dashboard.weekly_messages.messageCount')}
                </div>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Chart
            |--------------------------------------------------------------------------
            */}

            <div className="h-[320px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={weekly}
                        margin={{
                            top: 10,
                            right: 8,
                            left: -20,
                            bottom: 0,
                        }}
                    >

                        <CartesianGrid
                            vertical={false}
                            stroke="var(--color-border-light)"
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--color-text-muted)',
                                fontSize: 12,
                                fontFamily: 'var(--font-ar)',
                            }}
                            dy={10}
                        />

                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: 'var(--color-text-muted)',
                                fontSize: 12,
                                fontFamily: 'var(--font-ar)',
                            }}
                        />

                        <Tooltip
                            cursor={{
                                fill: 'var(--color-surface-soft)',
                            }}
                            contentStyle={{
                                backgroundColor:
                                    'var(--color-surface)',
                                border:
                                    '1px solid var(--color-border)',
                                borderRadius: '8px',
                                boxShadow:
                                    'var(--shadow-md)',
                                color:
                                    'var(--color-text-primary)',
                                fontFamily:
                                    'var(--font-ar)',
                            }}
                            labelStyle={{
                                color:
                                    'var(--color-text-primary)',
                                fontWeight: 600,
                                marginBottom: 4,
                            }}
                            formatter={(value) => [
                                `${value} ${t(
                                    'dashboard.weekly_messages.messageCount'
                                )}`,
                                t(
                                    'dashboard.weekly_messages.series'
                                ),
                            ]}
                        />

                        <Bar
                            dataKey="total"
                            name={t(
                                'dashboard.weekly_messages.series'
                            )}
                            fill="var(--brand-green)"
                            radius={[
                                6,
                                6,
                                0,
                                0,
                            ]}
                            maxBarSize={48}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    )
}