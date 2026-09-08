'use client'

import {Provider} from 'react-redux'
import {ConfigProvider, App as AntdApp} from 'antd'
import {useTranslation} from 'react-i18next'
import {Alexandria, Inter} from 'next/font/google'
import {useEffect, useState} from 'react'
import {Loader2} from 'lucide-react'

import arEG from 'antd/locale/ar_EG'
import enUS from 'antd/locale/en_US'

import 'dayjs/locale/ar'
import 'dayjs/locale/en'

import {store} from '@/redux/store'
import {ThemeProvider} from './theme-provider'
import {useAppTheme} from '@/hooks/use-app-theme'
import {AuthInitializer} from '@/components/auth/AuthInitializer'
import {setNotificationInstance} from '@/lib/toast/toast'
import RealtimeProvider from "@/providers/realtime-provider";

/*
|--------------------------------------------------------------------------
| Fonts
|--------------------------------------------------------------------------
*/

const inter = Inter({
    subsets: ['latin'],
})

const alexandria = Alexandria({
    subsets: ['arabic'],
    weight: ['300', '400', '500', '600', '700', '800'],
})

/*
|--------------------------------------------------------------------------
| Toast Initializer
|--------------------------------------------------------------------------
*/

function ToastInitializer() {
    const {notification} = AntdApp.useApp()

    useEffect(() => {
        setNotificationInstance(notification)
    }, [notification])

    return null
}

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type AppProviderProps = {
    children: React.ReactNode
}

/*
|--------------------------------------------------------------------------
| App Provider Content
|--------------------------------------------------------------------------
*/

function AppProviderContent({children}: AppProviderProps) {

    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

    const {i18n} = useTranslation()
    const {algorithm} = useAppTheme()

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [mounted, setMounted] = useState(false)

    const isArabic = i18n.language === 'ar'
    const fontFamily = isArabic
        ? alexandria.style.fontFamily
        : inter.style.fontFamily

    const antdLocale = isArabic ? arEG : enUS

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        setMounted(true)
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Language / Direction
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        document.documentElement.lang = i18n.language
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    }, [i18n.language, isArabic])

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (!mounted) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="size-10 animate-spin text-primary"/>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <ConfigProvider
            locale={antdLocale}
            direction={isArabic ? 'rtl' : 'ltr'}
            theme={{
                algorithm,

                /*
                |--------------------------------------------------------------------------
                | Global Ant Design Tokens
                |--------------------------------------------------------------------------
                |
                | All colors come from CSS variables.
                | Change them from :root / .dark only.
                |
                */

                token: {
                    fontFamily,

                    colorBgContainer: 'var(--color-surface-card)',
                    colorBgElevated: 'var(--color-surface-card)',
                    colorBgLayout: 'var(--color-background)',

                    colorText: 'var(--color-text-primary)',
                    colorTextSecondary: 'var(--color-text-secondary)',
                    colorTextTertiary: 'var(--color-text-muted)',
                    colorTextDisabled: 'var(--color-text-disabled)',

                    colorBorder: 'var(--color-border)',
                    colorBorderSecondary: 'var(--color-border-light)',

                    colorPrimary: 'var(--brand-green)',
                    colorLink: 'var(--color-text-link)',
                    colorLinkHover: 'var(--color-text-link-hover)',

                    colorSuccess: 'var(--color-success)',
                    colorWarning: 'var(--color-warning)',
                    colorError: 'var(--color-error)',
                    colorInfo: 'var(--color-info)',
                },

                /*
                |--------------------------------------------------------------------------
                | Ant Design Components
                |--------------------------------------------------------------------------
                |
                | These are still connected to the same CSS variables.
                |
                */

                components: {
                    Table: {
                        headerBg: 'var(--color-surface-card)',
                        headerColor: 'var(--color-text-primary)',
                        borderColor: 'var(--color-border-light)',
                        rowHoverBg: 'var(--color-surface-card)',
                        bodySortBg: 'var(--color-surface-card)',
                        headerSortActiveBg: 'var(--color-surface-card)',
                        headerSortHoverBg: 'var(--color-surface-card)',
                        footerBg: 'var(--color-surface-card)',
                        footerColor: 'var(--color-text-secondary)',
                        headerSplitColor: 'var(--color-border-light)',
                    },

                    Select: {
                        optionSelectedColor: 'var(--color-text-primary)',
                        optionSelectedBg: 'var(--color-surface-muted)',
                        optionActiveBg: 'var(--color-surface-muted)',
                        selectorBg: 'var(--color-surface-card)',
                        clearBg: 'var(--color-surface-card)',
                        optionFontSize: 14,
                    },

                    Input: {
                        colorBgContainer: 'var(--input-background)',
                        colorBorder: 'var(--input-border)',
                        colorText: 'var(--input-text)',
                        colorTextPlaceholder: 'var(--input-placeholder)',
                    },

                    DatePicker: {
                        cellWidth: 56,
                        colorBgContainer: 'var(--input-background)',
                        colorBorder: 'var(--input-border)',
                        colorText: 'var(--input-text)',
                        colorTextPlaceholder: 'var(--input-placeholder)',
                    },

                    Dropdown: {
                        colorBgElevated: 'var(--color-surface-card)',
                    },

                    Modal: {
                        contentBg: 'var(--color-surface-card)',
                        headerBg: 'var(--color-surface-card)',
                        footerBg: 'var(--color-surface-card)',
                    },

                    Drawer: {
                        colorBgElevated: 'var(--color-surface-card)',
                    },

                    Pagination: {
                        itemBg: 'var(--color-surface-card)',
                        itemActiveBg: 'var(--color-surface-green)',
                        itemLinkBg: 'var(--color-surface-card)',
                    },
                },
            }}
        >
            <AntdApp>
                <ToastInitializer/>

                <AuthInitializer>
                    <RealtimeProvider>
                        <main
                            dir={isArabic ? 'rtl' : 'ltr'}
                            className={isArabic ? alexandria.className : inter.className}>
                            {children}
                        </main>
                    </RealtimeProvider>
                </AuthInitializer>
            </AntdApp>
        </ConfigProvider>
    )
}

/*
|--------------------------------------------------------------------------
| App Provider
|--------------------------------------------------------------------------
*/

export default function AppProvider({children}: AppProviderProps) {
    return (
        <Provider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <AppProviderContent>
                    {children}
                </AppProviderContent>
            </ThemeProvider>
        </Provider>
    )
}