'use client'

import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

/*
|--------------------------------------------------------------------------
| Language Switcher
|--------------------------------------------------------------------------
|
| Switches the application language and updates the document
| direction based on the selected locale.
|
*/

export default function LanguageSwitcher() {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */
    const { i18n } = useTranslation()
    const [mounted, setMounted] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        setMounted(true)
        const savedLanguage = localStorage.getItem('language')
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage)
            document.documentElement.lang = savedLanguage
            document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
        }
    }, [i18n])

    useEffect(() => {
        const currentLang = i18n.language
        document.documentElement.lang = currentLang
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    }, [i18n.language])

    /*
    |--------------------------------------------------------------------------
    | Handlers
    |--------------------------------------------------------------------------
    */
    const handleChangeLanguage = async () => {
        const currentLanguage = localStorage.getItem('language') || i18n.language || 'en'
        const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'

        localStorage.setItem('language', newLanguage)
        document.documentElement.lang = newLanguage
        document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'

        await i18n.changeLanguage(newLanguage)
    }

    if (!mounted) {
        return null
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */
    return (
        <button
            type="button"
            onClick={handleChangeLanguage}
            className="
                inline-flex
                h-10
                items-center
                gap-2
                rounded-full
                border
                border-border
                bg-background
                px-4
                text-sm
                font-semibold
                transition-all
                duration-200
                hover:bg-accent
                hover:shadow-sm
                active:scale-95
            "
        >
            <Globe className="size-4 text-violet-600" />

            <span>
                {(localStorage.getItem('language') || i18n.language) === 'en' ? 'العربية' : 'English'}
            </span>
        </button>
    )
}