import React from 'react'
import {useTranslation} from 'react-i18next'
import {
    UilBuilding,
    UilArrowLeft,
    UilArrowRight,
    UilCheck,
    UilCopy
} from '@iconscout/react-unicons'

/*
|--------------------------------------------------------------------------
| Component Interfaces
|--------------------------------------------------------------------------
|
| Defines statistics item schema and header banner properties.
|
*/
export interface HeaderStatItem {
    label: string
    value: string | number
    valueClassName?: string
    isMono?: boolean
}

export interface HeaderBannerProps {
    title: string
    subtitle?: string
    icon?: React.ReactNode
    badgeText?: string
    badgeActive?: boolean
    code?: string
    uuid?: string
    copiedCode?: boolean
    copiedUuid?: boolean
    onCopyCode?: () => void
    onCopyUuid?: () => void
    onBack?: () => void
    stats?: HeaderStatItem[]
    isRtl?: boolean
    className?: string
}

/*
|--------------------------------------------------------------------------
| UI Component: Header Banner
|--------------------------------------------------------------------------
|
| Renders a high-impact gradient header banner with status badges,
| copyable identifiers, statistics grid, and navigation back actions.
|
*/
export default function HeaderBanner(
    {
        title,
        icon,
        badgeText,
        badgeActive = false,
        code,
        uuid,
        copiedCode = false,
        copiedUuid = false,
        onCopyCode,
        onCopyUuid,
        onBack,
        stats = [],
        isRtl = false,
        className = ''
    }: HeaderBannerProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Local States
    |--------------------------------------------------------------------------
    */
    const {t} = useTranslation()

    return (
        <header className={`relative overflow-hidden rounded-3xl border border-slate-800/20 dark:border-white/10 bg-slate-900 text-white shadow-2xl shadow-slate-950/20 p-6 sm:p-10 font-sans ${className}`}>
            {/* Background Ambient Glow Effects */}
            <div
                className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none"/>
            <div
                className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"/>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left Side: Icon, Badges, and Title */}
                <div className="flex items-start sm:items-center gap-5">
                    <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 flex items-center justify-center text-white ring-4 ring-white/10 shadow-xl shadow-indigo-500/20 shrink-0">
                        {icon || <UilBuilding size={36}/>}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* Status Badge */}
                            {badgeText && (
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md transition-all ${
                                        badgeActive
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                    }`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${
                                            badgeActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                                        }`}
                                    />
                                    {badgeText}
                                </span>
                            )}

                            {/* Code Identifier & Copy Action */}
                            {code && (
                                <div
                                    className="flex items-center gap-2 font-mono text-xs bg-white/10 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full border border-white/10 shadow-sm">
                                    <span className="text-slate-400">CODE:</span>
                                    <span className="font-bold tracking-wider">{code}</span>
                                    {onCopyCode && (
                                        <button
                                            type="button"
                                            aria-label="Copy Code"
                                            onClick={onCopyCode}
                                            className="text-slate-400 hover:text-white transition-colors ms-1 cursor-pointer"
                                        >
                                            {copiedCode ? (
                                                <UilCheck size={14} className="text-emerald-400"/>
                                            ) : (
                                                <UilCopy size={14}/>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* UUID Identifier & Copy Action */}
                            {uuid && (
                                <div
                                    className="hidden sm:flex items-center gap-2 font-mono text-xs bg-white/10 backdrop-blur-md text-slate-300 px-3 py-1 rounded-full border border-white/10 dir-ltr">
                                    <span className="text-slate-400">UUID:</span>
                                    <span className="truncate max-w-[120px]">{uuid}</span>
                                    {onCopyUuid && (
                                        <button
                                            type="button"
                                            aria-label="Copy UUID"
                                            onClick={onCopyUuid}
                                            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            {copiedUuid ? (
                                                <UilCheck size={14} className="text-emerald-400"/>
                                            ) : (
                                                <UilCopy size={14}/>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Main Title */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            {title || '-'}
                        </h1>
                    </div>
                </div>

                {/* Right Side: Back Button Action */}
                {onBack && (
                    <div className="flex items-center gap-3 self-end lg:self-center">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-2xl text-xs font-bold backdrop-blur-md border border-white/15 shadow-sm transition-all cursor-pointer"
                        >
                            {isRtl ? <UilArrowLeft size={18}/> : <UilArrowRight size={18}/>}
                            {t('common.back', 'السابق')}
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Grid Statistics Section */}
            {stats.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-0.5">
                            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                {stat.label}
                            </span>
                            <p
                                className={`text-sm font-bold text-slate-200 ${
                                    stat.isMono ? 'font-mono' : ''
                                } ${stat.valueClassName || ''}`}
                            >
                                {stat.value || '-'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </header>
    )
}