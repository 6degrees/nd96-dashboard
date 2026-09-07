'use client'

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from 'recharts'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface MessageStatus {
    active: number
    inactive: number
}

interface MessageVisibilityChartProps {
    status?: MessageStatus
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| Displays the percentage of visible and hidden messages.
|
*/

export function MessageVisibilityChart({status = {active: 0, inactive: 0,}, loading = false,}: MessageVisibilityChartProps) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    */

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Chart Data
    |--------------------------------------------------------------------------
    */

    const data = useMemo(() => {

        const total = status.active + status.inactive

        if (total === 0) {
            return [
                {
                    key: 'active',
                    name: t('dashboard.messages.visible'),
                    value: 0,
                    percentage: 0,
                    color: 'var(--brand-green)',
                },
                {
                    key: 'inactive',
                    name: t('dashboard.messages.hidden'),
                    value: 0,
                    percentage: 0,
                    color: 'var(--brand-purple)',
                },
            ]
        }

        const activePercentage =
            (status.active / total) * 100

        const inactivePercentage =
            (status.inactive / total) * 100

        return [
            {
                key: 'active',
                name: t('dashboard.messages.visible'),
                value: status.active,
                percentage: Number(
                    activePercentage.toFixed(1)
                ),
                color: 'var(--brand-green)',
            },
            {
                key: 'inactive',
                name: t('dashboard.messages.hidden'),
                value: status.inactive,
                percentage: Number(
                    inactivePercentage.toFixed(1)
                ),
                color: 'var(--brand-purple)',
            },
        ]

    }, [status, t])

    /*
    |--------------------------------------------------------------------------
    | Total
    |--------------------------------------------------------------------------
    */

    const total =
        status.active + status.inactive

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div
                className="
                    rounded-xl
                    border
                    border-[var(--color-border-light)]
                    bg-[var(--color-surface)]
                    p-6
                    shadow-[var(--shadow-sm)]
                "
            >

                <div className="animate-pulse">

                    <div
                        className="
                            h-5
                            w-40
                            rounded-md
                            bg-[var(--color-surface-muted)]
                        "
                    />

                    <div
                        className="
                            mt-2
                            h-3
                            w-56
                            rounded-md
                            bg-[var(--color-surface-muted)]
                        "
                    />

                    <div className="mt-8 flex justify-center">

                        <div
                            className="
                                h-56
                                w-56
                                rounded-full
                                border-[36px]
                                border-[var(--color-surface-muted)]
                            "
                        />

                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">

                        <div
                            className="
                                h-10
                                rounded-lg
                                bg-[var(--color-surface-muted)]
                            "
                        />

                        <div
                            className="
                                h-10
                                rounded-lg
                                bg-[var(--color-surface-muted)]
                            "
                        />

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
                transition-all
                duration-200
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div className="mb-4">

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-[var(--color-text-primary)]
                    "
                >
                    {t('dashboard.messages.visibility.title')}
                </h2>

                <p
                    className="
                        mt-1
                        text-sm
                        text-[var(--color-text-muted)]
                    "
                >
                    {t('dashboard.messages.visibility.subtitle')}
                </p>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Chart
            |--------------------------------------------------------------------------
            */}

            <div className="relative h-[280px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={82}
                            outerRadius={112}
                            paddingAngle={3}
                            cornerRadius={6}
                            stroke="none"
                        >

                            {data.map((item) => (
                                <Cell
                                    key={item.key}
                                    fill={item.color}
                                />
                            ))}

                        </Pie>

                        <Tooltip
                            cursor={false}
                            content={({
                                          active,
                                          payload,
                                      }) => {

                                if (
                                    !active ||
                                    !payload ||
                                    !payload.length
                                ) {
                                    return null
                                }

                                const item =
                                    payload[0]?.payload

                                if (!item) {
                                    return null
                                }

                                return (
                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-[var(--color-border)]
                                            bg-[var(--color-surface)]
                                            px-3
                                            py-2.5
                                            shadow-[var(--shadow-md)]
                                        "
                                        style={{
                                            fontFamily:
                                                'var(--font-ar)',
                                        }}
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <span
                                                className="
                                                    h-2.5
                                                    w-2.5
                                                    rounded-full
                                                "
                                                style={{
                                                    backgroundColor:
                                                    item.color,
                                                }}
                                            />

                                            <span
                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-[var(--color-text-primary)]
                                                "
                                            >
                                                {item.name}
                                            </span>

                                        </div>

                                        <div
                                            className="
                                                mt-1
                                                text-lg
                                                font-bold
                                                text-[var(--color-text-primary)]
                                            "
                                        >
                                            {item.percentage}%
                                        </div>

                                    </div>
                                )
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

                {/*
                |--------------------------------------------------------------------------
                | Center Content
                |--------------------------------------------------------------------------
                */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                    "
                >

                    <div className="text-center">

                        <div
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-[var(--color-text-primary)]
                            "
                        >
                            {total > 0
                                ? `${data[0].percentage}%`
                                : '0%'
                            }
                        </div>

                        <div
                            className="
                                mt-1
                                text-xs
                                font-medium
                                text-[var(--color-text-muted)]
                            "
                        >
                            {t('dashboard.messages.visible')}
                        </div>

                    </div>

                </div>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Legend
            |--------------------------------------------------------------------------
            */}

            <div
                className="
                    mt-2
                    grid
                    grid-cols-2
                    gap-3
                "
            >

                {data.map((item) => (
                    <div
                        key={item.key}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            border
                            border-[var(--color-border-light)]
                            bg-[var(--color-surface-soft)]
                            px-3
                            py-2.5
                        "
                    >

                        <div className="flex items-center gap-2">

                            <span
                                className="
                                    h-2.5
                                    w-2.5
                                    rounded-full
                                "
                                style={{
                                    backgroundColor:
                                    item.color,
                                }}
                            />

                            <span
                                className="
                                    text-sm
                                    font-medium
                                    text-[var(--color-text-secondary)]
                                "
                            >
                                {item.name}
                            </span>

                        </div>

                        <span
                            className="
                                text-sm
                                font-bold
                                text-[var(--color-text-primary)]
                            "
                        >
                            {item.percentage}%
                        </span>

                    </div>
                ))}

            </div>

        </div>
    )
}