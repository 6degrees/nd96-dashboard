'use client'

import { ReactNode } from 'react'
import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface AuthLayoutProps {
    title: string
    subtitle: string
    heroTitle: string
    heroSubtitle: string
    children: ReactNode
}

/*
|--------------------------------------------------------------------------
| AuthLayout Component
|--------------------------------------------------------------------------
|
| Authentication layout designed for SATORP's Saudi National Day
| event management platform.
|
| Features:
| - Saudi National Day visual identity
| - SATORP branding
| - Fully responsive layout
| - Full RTL/LTR support
| - Arabic/English language switching
| - Identity-based colors and typography
|
*/
export default function AuthLayout({ title, subtitle, heroTitle, heroSubtitle, children }: AuthLayoutProps) {
    /*
    |--------------------------------------------------------------------------
    | Localization & Translation Setup
    |--------------------------------------------------------------------------
    */
    const { i18n, t } = useTranslation()

    const locale = i18n.language
    const isRtl = locale === 'ar'

    /*
    |--------------------------------------------------------------------------
    | Toggle Language Handler
    |--------------------------------------------------------------------------
    */
    const toggleLanguage = () => {
        const next = isRtl ? 'en' : 'ar'

        i18n.changeLanguage(next)

        document.documentElement.lang = next
        document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
    }

    return (
        <>
            <title>{title}</title>

            <main dir={isRtl ? 'rtl' : 'ltr'} className="relative min-h-screen overflow-hidden bg-surface-page text-text-primary">

                {/*
                |--------------------------------------------------------------------------
                | Global Background
                |--------------------------------------------------------------------------
                */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(0,52,58,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,52,58,1)_1px,transparent_1px)] [background-size:64px_64px]" />
                    <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-lime/10 blur-3xl" />
                    <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />
                </div>

                {/*
                |--------------------------------------------------------------------------
                | Language Switcher
                |--------------------------------------------------------------------------
                |
                | Mobile: Full-width top bar.
                | Desktop: Compact floating button.
                |
                */}
                <button type="button" onClick={toggleLanguage} aria-label={t('auth.changeLanguage')} className={`absolute inset-x-0 top-0 z-50 flex h-[40px] items-center bg-brand-primary px-8 text-sm font-bold text-white transition hover:bg-brand-primary/95 lg:inset-x-auto lg:top-6 lg:h-auto lg:w-auto lg:border lg:border-border-default lg:bg-surface-card lg:px-3 lg:py-2 lg:text-xs lg:text-text-primary lg:shadow-sm lg:hover:border-brand-green lg:hover:bg-surface-card lg:hover:text-brand-green ${isRtl ? 'justify-start lg:left-5 lg:justify-center' : 'justify-start lg:right-5 lg:justify-center'}`}>
                    <Globe size={15} strokeWidth={1.8} className="hidden lg:block" />
                    <span>{isRtl ? t('auth.language.english') : t('auth.language.arabic')}</span>
                </button>

                {/*
                |--------------------------------------------------------------------------
                | Desktop / Mobile Layout
                |--------------------------------------------------------------------------
                */}
                <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-[44%_56%]">

                    {/*
                    |--------------------------------------------------------------------------
                    | Desktop Brand Section
                    |--------------------------------------------------------------------------
                    */}
                    <section className="relative hidden min-h-screen overflow-hidden bg-brand-primary text-white lg:flex lg:flex-col">

                        {/* Identity Grid */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(90,186,28,1)_1px,transparent_1px),linear-gradient(90deg,rgba(90,186,28,1)_1px,transparent_1px)] [background-size:72px_72px]" />

                        {/* Diagonal Pattern */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(135deg,transparent_0%,transparent_47%,rgba(255,255,255,1)_47%,rgba(255,255,255,1)_49%,transparent_49%,transparent_100%)] [background-size:140px_140px]" />

                        {/* Identity Accent */}
                        <div className={`absolute bottom-0 top-0 z-20 w-1 bg-brand-lime ${isRtl ? 'left-0' : 'right-0'}`} />

                        <div className="relative z-10 flex min-h-screen flex-col px-8 py-9 xl:px-12 xl:py-11 2xl:px-16">

                            {/*
                            |--------------------------------------------------------------------------
                            | Desktop Header
                            |--------------------------------------------------------------------------
                            */}
                            <header className="flex items-start justify-between gap-6">

                                {/* SATORP Logo */}
                                <img src="/brand/satorp-logo.png" alt="SATORP" className="h-auto w-40 object-contain xl:w-48 2xl:w-56" />

                                {/* National Day 96 Badge */}
                                <div className="relative w-32 shrink-0 xl:w-36 2xl:w-40">

                                    <div className="absolute -inset-1 border border-brand-green/50" />

                                    <div className="relative border-[3px] border-brand-green bg-[#002D32] p-1">

                                        {/* Pixel Corners */}
                                        <div className="absolute left-1 top-1 flex gap-1">
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                        </div>

                                        <div className="absolute right-1 top-1 flex gap-1">
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                        </div>

                                        <div className="absolute bottom-1 left-1 flex gap-1">
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                        </div>

                                        <div className="absolute bottom-1 right-1 flex gap-1">
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                            <span className="h-1.5 w-1.5 bg-brand-green" />
                                        </div>

                                        <div className="flex min-h-28 flex-col items-center justify-center border border-brand-green/40 px-2 py-4 text-center xl:min-h-32">

                                            <span className="font-en text-5xl font-black leading-none tracking-[-0.08em] text-white xl:text-6xl 2xl:text-7xl">
                                                96
                                            </span>

                                            <span className="mt-2 font-brand text-[9px] font-bold leading-tight text-brand-lime xl:text-[10px]">
                                                {t('auth.nationalDay.label')}
                                            </span>

                                            <span className="mt-1 text-[6px] font-bold uppercase tracking-[0.25em] text-white/50 xl:text-[7px]">
                                                {t('auth.nationalDay.englishLabel')}
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/*
                            |--------------------------------------------------------------------------
                            | Desktop Hero Content
                            |--------------------------------------------------------------------------
                            */}
                            <div className="my-auto max-w-xl py-10 xl:py-14">

                                <div className="mb-6 flex items-center gap-3">
                                    <span className="h-[3px] w-8 bg-brand-lime" />

                                    <span className="font-brand text-xs font-bold text-brand-lime xl:text-sm">
                                        {t('auth.hero.eyebrow')}
                                    </span>
                                </div>

                                <h1 className="font-brand text-4xl font-bold leading-[1.3] tracking-tight text-white xl:text-5xl 2xl:text-[3.5rem]">
                                    {heroTitle}
                                </h1>

                                <p className="mt-6 max-w-lg text-sm leading-8 text-white/65 xl:text-base">
                                    {heroSubtitle}
                                </p>

                            </div>

                            {/*
                            |--------------------------------------------------------------------------
                            | Desktop Footer
                            |--------------------------------------------------------------------------
                            */}
                            <footer className="flex items-center justify-between gap-5 border-t border-white/10 pt-5">

                                <div className="flex items-center gap-3">
                                    <span className="h-2 w-2 bg-brand-lime" />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                                        {t('auth.footer.company')}
                                    </span>
                                </div>

                                <span className="text-[10px] text-white/40">
                                    {t('auth.footer.authorizedUsers')}
                                </span>

                            </footer>

                        </div>
                    </section>

                    {/*
                    |--------------------------------------------------------------------------
                    | Authentication Section
                    |--------------------------------------------------------------------------
                    */}
                    <section className="relative flex min-h-screen flex-col px-5 pb-[90px] pt-[40px] sm:px-10 sm:pb-[100px] lg:flex-row lg:items-center lg:justify-center lg:px-12 lg:py-16 xl:px-20 2xl:px-28">

                        {/*
                        |--------------------------------------------------------------------------
                        | Mobile Header
                        |--------------------------------------------------------------------------
                        |
                        | Normal document flow.
                        | Starts below the language bar.
                        |
                        */}
                        <div className="relative -mx-5 flex shrink-0 border-b border-border-light bg-brand-primary px-5 py-5 backdrop-blur sm:-mx-10 sm:px-8 lg:hidden">

                            <div className="flex w-full items-center justify-between gap-5">

                                {/* SATORP Logo */}
                                <img src="/brand/satorp-logo.png" alt="SATORP" className="h-auto w-32 object-contain sm:w-36" />

                                {/* National Day Badge */}
                                <div className="relative w-20 shrink-0 sm:w-24">

                                    <div className="absolute -inset-1 border border-brand-green/40" />

                                    <div className="relative border-2 border-brand-green bg-brand-primary p-0.5">

                                        <div className="flex min-h-16 flex-col items-center justify-center border border-brand-green/40 py-2 sm:min-h-20">

                                            <span className="font-en text-3xl font-black leading-none tracking-[-0.08em] text-white sm:text-4xl">
                                                96
                                            </span>

                                            <span className="mt-1 font-brand text-[6px] font-bold text-brand-lime sm:text-[7px]">
                                                {t('auth.nationalDay.label')}
                                            </span>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/*
                        |--------------------------------------------------------------------------
                        | Authentication Content
                        |--------------------------------------------------------------------------
                        */}
                        <div className="flex w-full max-w-md flex-1 flex-col justify-center py-10 lg:flex-none lg:py-0">

                            {/* Secure Access */}
                            <div className="mb-6 flex items-center gap-3 sm:mb-7">

                                <span className="h-2 w-2 shrink-0 bg-brand-lime" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                                    {t('auth.secureAccess')}
                                </span>

                            </div>

                            {/* Authentication Heading */}
                            <div className="mb-7 sm:mb-8">

                                <h2 className="font-brand text-2xl lg:text-4xl font-bold leading-tight tracking-tight text-text-primary">
                                    {title}
                                </h2>

                                <p className="mt-3 max-w-sm text-sm hidden lg:block leading-7 text-text-secondary">
                                    {subtitle}
                                </p>

                            </div>

                            {/* Authentication Form */}
                            <div className="w-full">
                                {children}
                            </div>

                            {/* Security Notice */}
                            <div className="mt-7 flex items-start gap-3 border-t border-border-light pt-5 sm:mt-8">

                                <div className="mt-1 h-5 w-1 shrink-0 bg-brand-lime" />

                                <p className="text-[11px] leading-6 text-text-muted">
                                    {t('auth.securityNotice')}
                                </p>

                            </div>

                        </div>

                        {/*
                        |--------------------------------------------------------------------------
                        | Mobile Footer
                        |--------------------------------------------------------------------------
                        |
                        | Normal document flow.
                        | Stays at the bottom after the authentication content.
                        |
                        */}
                        <footer className="absolute inset-x-0 bottom-0 border-t border-border-light bg-surface-card px-5 py-4 sm:px-10 lg:hidden">

                            <div className="flex items-center justify-between gap-4">

                                <div className="flex items-center gap-2">

                                    <span className="h-1.5 w-1.5 bg-brand-lime" />

                                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-text-muted">
                                            {t('auth.footer.company')}
                                        </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    <span className="font-en text-lg font-black leading-none text-brand-primary">
                                        96
                                    </span>

                                    <span className="h-4 w-1 bg-brand-lime" />

                                    <span className="font-brand text-[10px] font-bold text-text-secondary sm:text-xs">
                                            {t('auth.hero.slogan')}
                                    </span>

                                </div>

                            </div>

                        </footer>
                    </section>
                </div>
            </main>
        </>
    )
}