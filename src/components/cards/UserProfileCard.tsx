import { User, Mail, Phone, ShieldCheck } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| @component UserProfileCard
|--------------------------------------------------------------------------
|
| Modern responsive card displaying the current admin user session profile
| information (Name, Email, Phone) formatted cleanly as input-style boxes.
| Supports light mode and dark mode (`dark:bg-[#121212]`).
|
*/
export function UserProfileCard({ user, t }: any) {
    return (
        <div className="bg-white dark:bg-[#121212] border border-slate-200/80 dark:border-neutral-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-300">

            {/*
            |--------------------------------------------------------------------------
            | Card Header & Role Badge
            |--------------------------------------------------------------------------
            */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shadow-md shadow-indigo-500/10 border border-indigo-500/20">
                        <User className="size-6" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                            {t('tenant.currentAdmin') || 'Current Admin'}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-400 font-medium">
                            {t('tenant.sessionDetails') || 'Active session profile details'}
                        </p>
                    </div>
                </div>

                {/* Super Admin Role Badge */}
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-500/20 self-start sm:self-center">
                    <ShieldCheck className="size-3.5" />
                    {t('tenant.superAdmin') || 'Super Admin'}
                </span>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Profile Info Inputs Container
            |--------------------------------------------------------------------------
            */}
            <div className="space-y-4 sm:space-y-5">

                {/* Name Field */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">
                        {t('tenant.inputs.name') || 'Full Name'}
                    </label>
                    <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-neutral-900/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/60 dark:border-neutral-800 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200/60 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
                            <User className="size-4" />
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate flex-1" title={user?.name}>
                            {user?.name || t('profile.anonymous') || 'Anonymous'}
                        </p>
                    </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-widest block">
                        {t('tenant.inputs.email') || 'Email Address'}
                    </label>
                    <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-neutral-900/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/60 dark:border-neutral-800 transition-colors">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200/60 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
                            <Mail className="size-4" />
                        </div>
                        <p className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate flex-1" title={user?.email}>
                            {user?.email || t('common.notAvailable') || 'N/A'}
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
                            {user?.phone || t('common.notAvailable') || 'N/A'}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}