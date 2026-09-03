'use client'

import React from 'react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/

interface StatCardProps {
    value: string | number
    icon: React.ReactNode
    title: string
    subtitle?: string
    iconBackground?: string
    iconColor?: string
    valueColor?: string
}

/*
|--------------------------------------------------------------------------
| Branch Stat Card
|--------------------------------------------------------------------------
|
*/

export default function StatCard({value, icon, title, subtitle, iconBackground = 'bg-slate-100', iconColor = 'text-slate-600', valueColor = 'text-slate-900 dark:text-white',}: StatCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">

            <div className="flex items-start justify-between">

                <div className="min-w-0">

                    <p className="text-sm font-medium text-slate-500 dark:text-neutral-400">
                        {title}
                    </p>

                    <div className="mt-3 flex items-end gap-2">

                        <span className={`text-3xl font-bold tracking-tight ${valueColor}`}>
                            {value}
                        </span>

                    </div>

                </div>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBackground} ${iconColor} transition-all duration-300 group-hover:scale-105`}
                >
                    {icon}
                </div>

            </div>

            {subtitle && (
                <div className="mt-5 border-t border-slate-100 pt-3 dark:border-neutral-800">

                    <span className="text-xs text-slate-500 dark:text-neutral-400">
                        {subtitle}
                    </span>

                </div>
            )}

        </div>
    )
}