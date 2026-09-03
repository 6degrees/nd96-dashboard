'use client'

import {Provider} from 'react-redux'
import {ConfigProvider, App as AntdApp} from 'antd'
import {useTranslation} from 'react-i18next'
import {Alexandria, Inter} from 'next/font/google'

import {store} from '@/redux/store'
import {ThemeProvider} from './theme-provider'
import {useAppTheme} from '@/hooks/use-app-theme'
import {useEffect, useState} from 'react'
import {Loader2} from "lucide-react";

import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';

import 'dayjs/locale/ar'
import 'dayjs/locale/en'
import {AuthInitializer} from "@/components/auth/AuthInitializer";
import {setNotificationInstance} from '@/lib/toast/toast'

/*
|--------------------------------------------------------------------------
| Fonts
|--------------------------------------------------------------------------
|
| Application fonts for supported locales.
|
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
|
| Connects the Ant Design notification instance to the global toast service.
|
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
|
| Configures the application UI.
|
| Responsibilities:
| - Detect current language
| - Apply theme algorithm
| - Configure Ant Design
| - Switch application font
|
*/

function AppProviderContent({children,}: AppProviderProps) {
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
    const fontFamily = isArabic ? alexandria.style.fontFamily : inter.style.fontFamily
    const antdLocale = isArabic ? arEG : enUS

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    |
    */
    useEffect(() => {
        setMounted(true)
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    |
    | Synchronizes the document language and text direction with
    | the current application language.
    |
    */
    useEffect(() => {
        document.documentElement.lang = i18n.language
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    }, [i18n.language, isArabic])

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
                token: {
                    fontFamily,
                    colorLink: 'inherit',
                    colorLinkHover: 'inherit',
                    colorLinkActive: 'inherit',
                }
            }}>
            <AntdApp>
                <ToastInitializer />
                <AuthInitializer>
                        <main
                            dir={isArabic ? 'rtl' : 'ltr'}
                            className={isArabic ? alexandria.className : inter.className}>
                            {children}
                        </main>
                </AuthInitializer>
            </AntdApp>
        </ConfigProvider>
    )
}

/*
|--------------------------------------------------------------------------
| App Provider
|--------------------------------------------------------------------------
|
| Registers all global application providers.
|
| Providers:
| - Redux Store
| - Theme Provider
| - Ant Design Configuration
|
*/

export default function AppProvider({children,}: AppProviderProps) {
    return (
        <Provider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                <AppProviderContent>
                    {children}
                </AppProviderContent>
            </ThemeProvider>
        </Provider>
    )
}