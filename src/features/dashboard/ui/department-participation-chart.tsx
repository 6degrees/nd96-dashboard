'use client'

import React, {useMemo} from 'react'
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from 'recharts'
import {useTranslation} from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface DepartmentParticipation {
    department_id: string | null
    department_ar: string | null
    department_en: string | null
    total: number
}

interface DepartmentParticipationChartProps {
    departments?: DepartmentParticipation[]
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| Displays the percentage of message participation for each department.
| Message counts are used internally to calculate percentages but are
| never displayed to the user.
|
*/

export function DepartmentParticipationChart({departments = [], loading = false,}: DepartmentParticipationChartProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    */

    const {t, i18n} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Colors
    |--------------------------------------------------------------------------
    |
    | Department ranking colors.
    |
    */

    const COLORS = [
        '#C49B54',
        '#0050AF',
        '#6565E0',
        '#00894A',
        '#971A4D',
    ]

    /*
    |--------------------------------------------------------------------------
    | Prepare Chart Data
    |--------------------------------------------------------------------------
    */

    const chartData = useMemo(() => {

        const total = departments.reduce(
            (sum, department) => sum + Number(department.total || 0),
            0
        )

        return departments
            .filter((department) => Number(department.total || 0) > 0)
            .slice(0, 5)
            .map((department) => {

                const percentage =
                    total > 0
                        ? Number(
                            (
                                (Number(department.total) / total) *
                                100
                            ).toFixed(1)
                        )
                        : 0

                const name =
                    i18n.language.startsWith('ar')
                        ? department.department_ar
                        : department.department_en

                return {
                    ...department,
                    name: name || t('dashboard.department_participation.unknown'),
                    percentage,
                }
            })

    }, [departments, i18n.language, t])

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
                            w-48
                            rounded-md
                            bg-[var(--color-surface-muted)]
                        "
                    />

                    <div
                        className="
                            mt-2
                            h-3
                            w-72
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
                                border-[45px]
                                border-[var(--color-surface-muted)]
                            "
                        />

                    </div>

                    <div className="mt-8 space-y-4">

                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            h-3
                                            w-3
                                            rounded-full
                                            bg-[var(--color-surface-muted)]
                                        "
                                    />

                                    <div
                                        className="
                                            h-4
                                            w-28
                                            rounded-md
                                            bg-[var(--color-surface-muted)]
                                        "
                                    />

                                </div>

                                <div
                                    className="
                                        h-4
                                        w-12
                                        rounded-md
                                        bg-[var(--color-surface-muted)]
                                    "
                                />

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (chartData.length === 0) {
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

                <div>

                    <h2
                        className="
                            text-lg
                            font-semibold
                            text-[var(--color-text-primary)]
                        "
                    >
                        {t('dashboard.department_participation.title')}
                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-[var(--color-text-muted)]
                        "
                    >
                        {t('dashboard.department_participation.subtitle')}
                    </p>

                </div>

                <div
                    className="
                        flex
                        h-[360px]
                        items-center
                        justify-center
                        text-sm
                        text-[var(--color-text-muted)]
                    "
                >
                    {t('dashboard.department_participation.no_data')}
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

            <div className="mb-4">

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-[var(--color-text-primary)]
                    "
                >
                    {t('dashboard.department_participation.title')}
                </h2>

                <p
                    className="
                        mt-1
                        text-sm
                        text-[var(--color-text-muted)]
                    "
                >
                    {t('dashboard.department_participation.subtitle')}
                </p>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Chart
            |--------------------------------------------------------------------------
            */}

            <div className="h-[300px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={78}
                            outerRadius={112}
                            paddingAngle={3}
                            stroke="var(--color-surface)"
                            strokeWidth={3}
                        >

                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`department-${entry.department_id ?? index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}

                        </Pie>

                        <Tooltip
                            cursor={false}
                            content={({active, payload}) => {
                                if (!active || !payload || !payload.length) {
                                    return null
                                }

                                const data = payload[0].payload

                                return (
                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-[var(--color-border)]
                                            bg-[var(--color-surface)]
                                            px-3
                                            py-2
                                            shadow-[var(--shadow-md)]
                                        ">
                                        <div
                                            className="
                                            text-sm
                                            font-semibold
                                            text-[var(--color-text-primary)]
                                        "
                                        >
                                            {data.name}
                                        </div>

                                        <div
                                            className="
                                            mt-1
                                            text-sm
                                            font-bold
                                            text-[var(--brand-green)]
                                        "
                                        >
                                            {data.percentage}%
                                        </div>
                                    </div>
                                )
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Department Percentages
            |--------------------------------------------------------------------------
            */}

            <div className="mt-4 space-y-3">

                {chartData.map((department, index) => (

                    <div
                        key={department.department_id ?? index}
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        <div className="flex min-w-0 items-center gap-3">

                            <span
                                className="h-3 w-3 shrink-0 rounded-full"
                                style={{
                                    backgroundColor:
                                        COLORS[index % COLORS.length],
                                }}
                            />

                            <span
                                className="
                                    truncate
                                    text-sm
                                    font-medium
                                    text-[var(--color-text-primary)]
                                "
                            >
                                {department.name}
                            </span>

                        </div>

                        <span
                            className="
                                shrink-0
                                text-sm
                                font-bold
                                text-[var(--color-text-primary)]
                            "
                        >
                            {department.percentage}%
                        </span>

                    </div>

                ))}

            </div>

        </div>
    )
}