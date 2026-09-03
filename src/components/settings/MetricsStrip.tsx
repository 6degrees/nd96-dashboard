import { BadgeCheck, Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/utils/helpers'

/*
|--------------------------------------------------------------------------
| @component MetricsStrip
|--------------------------------------------------------------------------
|
| Modern responsive metrics strip displaying key tenant dates (Activation, Creation,
| Last Update) with light/dark mode support and colorful accented icons.
|
*/
export function MetricsStrip({ tenant, language, t }: any) {
    /*
    |--------------------------------------------------------------------------
    | Metrics Configuration Data
    |--------------------------------------------------------------------------
    */
    const metrics = [
        {
            title: t('branch.inputs.activatedAt') || 'Activation Date',
            date: tenant?.activated_at,
            icon: BadgeCheck,
            borderColor: 'hover:border-emerald-500/50',
            glowColor: 'bg-emerald-500/10 dark:bg-emerald-500/10',
            iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
        },
        {
            title: t('branch.inputs.createdAt') || 'Creation Date',
            date: tenant?.created_at,
            icon: Calendar,
            borderColor: 'hover:border-blue-500/50',
            glowColor: 'bg-blue-500/10 dark:bg-blue-500/10',
            iconBg: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400'
        },
        {
            title: t('branch.inputs.updatedAt') || 'Last Update',
            date: tenant?.updated_at,
            icon: Clock,
            borderColor: 'hover:border-amber-500/50',
            glowColor: 'bg-amber-500/10 dark:bg-amber-500/10',
            iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((item, idx) => {
                const Icon = item.icon
                return (
                    <div
                        key={idx}
                        className={`relative group overflow-hidden rounded-2xl bg-white dark:bg-[#121212] border border-slate-200/80 dark:border-neutral-800/80 p-5 transition-all duration-300 ${item.borderColor} hover:shadow-xl dark:hover:shadow-indigo-950/20 shadow-sm backdrop-blur-xl`}
                    >
                        {/*
                        |--------------------------------------------------------------------------
                        | Background Hover Glow Effect
                        |--------------------------------------------------------------------------
                        */}
                        <div className={`absolute top-0 right-0 w-28 h-28 ${item.glowColor} rounded-full blur-2xl group-hover:scale-125 transition-all duration-500 pointer-events-none`}></div>

                        {/*
                        |--------------------------------------------------------------------------
                        | Card Content Container
                        |--------------------------------------------------------------------------
                        */}
                        <div className="flex items-center justify-between relative z-10">
                            {/* Titles and Formatted Dates */}
                            <div className="space-y-1.5 min-w-0 flex-1">
                                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-400 block truncate">
                                    {item.title}
                                </span>
                                <span className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-slate-100 tracking-tight block truncate">
                                    {formatDate(item.date, true, language) || t('common.notAvailable') || 'N/A'}
                                </span>
                            </div>

                            {/* Colored Icon Box */}
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-inner ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="size-5" />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}