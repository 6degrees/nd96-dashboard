/*
|--------------------------------------------------------------------------
| Rating Summary Card
|--------------------------------------------------------------------------
|
| Displays a compact rating statistic with optional percentage,
| icon, suffix, and loading state.
|
*/
interface RatingSummaryCardProps {
    title: string
    value: string
    suffix?: string
    percentage?: number
    icon: React.ReactNode
    iconClass: string
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Rating Summary Card
|--------------------------------------------------------------------------
|
*/
export default function RatingSummaryCard({title, value, suffix, percentage, icon, iconClass, loading = false}: RatingSummaryCardProps) {
    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    */
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

            {loading ? (

                <div className="animate-pulse space-y-4">

                    <div className="flex items-center justify-between">

                        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-neutral-800"/>

                        <div className="h-3 w-10 rounded bg-slate-200 dark:bg-neutral-800"/>

                    </div>

                    <div className="h-3 w-24 rounded bg-slate-200 dark:bg-neutral-800"/>

                    <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-neutral-800"/>

                </div>

            ) : (

                <>

                    <div className="flex items-start justify-between">

                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}>
                            {icon}
                        </div>

                        {percentage !== undefined && (
                            <span className="text-xs font-semibold text-slate-400 dark:text-neutral-500">
                                {percentage.toFixed(0)}%
                            </span>
                        )}

                    </div>

                    <p className="mt-5 text-xs font-medium text-slate-400 dark:text-neutral-500">
                        {title}
                    </p>

                    <div className="mt-1 flex items-baseline gap-2">

                        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {value}
                        </span>

                        {suffix && (
                            <span className="text-xs font-semibold text-slate-400 dark:text-neutral-500">
                                {suffix}
                            </span>
                        )}

                    </div>

                </>

            )}

        </div>
    )
}