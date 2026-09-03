import { Cpu, Network, Shield } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| @component SallaEngineCard
|--------------------------------------------------------------------------
|
| Premium responsive card displaying Salla engine status, sync connectivity,
| webhook indicator, and plan type details with refined proportions and a
| high-end executive bento style.
| Supports light mode and dark mode (`dark:bg-[#121212]`).
|
*/
export function SallaEngineCard({ t }: any) {
    return (
        <div className="relative bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl border border-slate-200/90 dark:border-neutral-800/90 rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-900/[0.02] dark:shadow-black/40 space-y-6 transition-all duration-300">

            {/*
            |--------------------------------------------------------------------------
            | Card Header & Webhook Status Badge
            |--------------------------------------------------------------------------
            */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 shadow-sm shadow-blue-500/10 border border-blue-500/20">
                        <Cpu className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                            {t('tenant.engineTitle') || 'Salla Engine'}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-400 font-medium">
                            {t('tenant.engineSubtitle') || 'Sync status, webhook connection, and plan info'}
                        </p>
                    </div>
                </div>

                {/* Webhook Connection Indicator Badge */}
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20 shadow-xs self-start sm:self-center">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                    </span>
                    {t('tenant.webhookConnected') || 'Webhook Connected'}
                </span>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Engine Metrics Grid Layout
            |--------------------------------------------------------------------------
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Sync Status Box */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-neutral-900/60 border border-slate-200/70 dark:border-neutral-800/80 space-y-2 transition-colors">
                    <div className="flex items-center justify-between text-slate-400 dark:text-neutral-500 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            {t('tenant.syncStatusLabel') || 'Sync Status'}
                        </span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <Network className="size-3.5" />
                        </div>
                    </div>
                    <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                        {t('tenant.syncStatusValue') || 'Fully Synchronized'}
                    </p>
                </div>

                {/* Plan Type Box */}
                <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-neutral-900/60 border border-slate-200/70 dark:border-neutral-800/80 space-y-2 transition-colors">
                    <div className="flex items-center justify-between text-slate-400 dark:text-neutral-500 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            {t('tenant.planTypeLabel') || 'Plan Type'}
                        </span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <Shield className="size-3.5" />
                        </div>
                    </div>
                    <p className="text-sm sm:text-base font-black text-indigo-600 dark:text-indigo-400 truncate">
                        {t('tenant.planTypeValue') || 'Pro Plan'}
                    </p>
                </div>

            </div>
        </div>
    )
}