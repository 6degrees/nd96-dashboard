import { Building2, Mail, Phone, Hash, Copy, Check } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| @component StoreCredentialsCard
|--------------------------------------------------------------------------
|
| Modern responsive store credentials card displaying general info,
| contact details, and technical ID with a copy-to-clipboard action.
| Supports light mode and dark mode (`dark:bg-[#121212]`).
|
*/
export function StoreCredentialsCard({ tenant, t, copiedId, onCopy }: any) {
    return (
        <div className="bg-white dark:bg-[#121212] border border-slate-200/80 dark:border-neutral-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-300">

            {/*
            |--------------------------------------------------------------------------
            | Card Header & Active Status
            |--------------------------------------------------------------------------
            */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/10 border border-blue-500/20">
                        <Building2 className="size-6" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                            {t('tenant.generalInfo') || 'Store Information'}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-400 font-medium">
                            {t('tenant.contactAndIdentity') || 'Contact details and technical credentials'}
                        </p>
                    </div>
                </div>

                {/* Active / Inactive Status Badge */}
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black self-start sm:self-center ${
                    tenant?.is_active
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-500/20'
                        : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/40 dark:border-rose-500/20'
                }`}>
                    <span className={`size-2 rounded-full ${tenant?.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                    {tenant?.is_active ? (t('common.active') || 'Active') : (t('common.inactive') || 'Inactive')}
                </span>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Credentials Fields Container
            |--------------------------------------------------------------------------
            */}
            <div className="space-y-4 sm:space-y-5">

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">
                        {t('tenant.inputs.email') || 'Email Address'}
                    </label>
                    <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-neutral-900/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/60 dark:border-neutral-800 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200/60 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
                            <Mail className="size-4" />
                        </div>
                        <p className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate flex-1" title={tenant?.email}>
                            {tenant?.email || '-'}
                        </p>
                    </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">
                        {t('tenant.inputs.phone') || 'Phone Number'}
                    </label>
                    <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-neutral-900/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/60 dark:border-neutral-800 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200/60 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
                            <Phone className="size-4" />
                        </div>
                        <p className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate flex-1">
                            {tenant?.phone || t('common.notAvailable') || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Technical ID & Copy Action */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">
                        {t('tenant.id')}
                    </label>
                    <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-neutral-900/80 p-3 sm:p-3.5 rounded-2xl border border-slate-200/60 dark:border-neutral-800 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200/60 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
                            <Hash className="size-4" />
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-600 dark:text-neutral-400 truncate flex-1">
                            {tenant?.id || '-'}
                        </span>
                        <button
                            onClick={() => onCopy(tenant?.id)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 shrink-0 shadow-sm ${
                                copiedId
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20'
                                    : 'bg-white dark:bg-neutral-800/80 text-slate-700 dark:text-neutral-300 border border-slate-200/80 dark:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-700'
                            }`}
                        >
                            {copiedId ? (
                                <>
                                    <Check className="size-3.5" />
                                    <span>{t('common.copied') || 'Copied'}</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="size-3.5" />
                                    <span>{t('common.copy') || 'Copy'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}