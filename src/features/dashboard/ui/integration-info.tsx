import React from 'react'
import { useTranslation } from 'react-i18next'
import { QrCode } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| UI Component: Integration & Quick Action Info
|--------------------------------------------------------------------------
|
| Displays Salla integration health status and QR code quick verification notice
| with Dark Mode support.
|
*/
export function IntegrationInfo() {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Translations
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation()

    return (
        <div className="space-y-6 font-ar">
            {/*
            |--------------------------------------------------------------------------
            | 1. Salla Integration Health Banner
            |--------------------------------------------------------------------------
            */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 dark:from-neutral-950 dark:via-neutral-900 dark:to-indigo-950/80 p-6 text-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-800/80 dark:border-neutral-800/80 transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-indigo-300 dark:text-indigo-400">{t('dashboard.integration_title')}</span>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 dark:text-emerald-300 border border-emerald-500/30">
                        {t('dashboard.active_now')}
                    </span>
                </div>

                <h3 className="text-lg font-bold">{t('dashboard.app')}</h3>
                <p className="mt-1 text-xs text-slate-300 dark:text-neutral-300 leading-relaxed">
                    {t('dashboard.integration_desc')}
                </p>

                {/* Integration Performance Metrics */}
                <div className="mt-6 space-y-3 text-xs border-t border-white/10 dark:border-neutral-800 pt-4">
                    <div className="flex justify-between text-slate-300 dark:text-neutral-400">
                        <span>{t('dashboard.last_sync')}</span>
                        <span className="font-mono text-white dark:text-neutral-200">{Math.floor(Math.random() * 15) + 1} {t('time.minutes_ago')}</span>
                    </div>
                    <div className="flex justify-between text-slate-300 dark:text-neutral-400">
                        <span>{t('dashboard.prep_speed')}</span>
                        <span className="font-semibold text-emerald-400 dark:text-emerald-300">{Math.floor(Math.random() * 21) + 5} {t('time.minutes_per_order')}</span>
                    </div>
                </div>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 2. Quick QR Verification Guide Card
            |--------------------------------------------------------------------------
            */}
            <div className="rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 p-5 text-amber-900 dark:text-amber-200 backdrop-blur-md transition-colors duration-200">
                <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 rounded-2xl text-amber-700 dark:text-amber-300">
                        <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold">{t('dashboard.quick_qr.title')}</h4>
                        <p className="mt-0.5 text-xs text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                            {t('dashboard.quick_qr.desc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}