'use client'

import { MoonStar, SunMedium } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAppTheme } from '@/hooks/use-app-theme'

export default function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useAppTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="
                relative flex size-10 items-center justify-center
                rounded-full
                border border-border/60
                bg-background/70
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-accent
                hover:shadow-md
                active:scale-95
            "
        >
            <SunMedium
                className={`
                    absolute size-[18px]
                    transition-all duration-300
                    ${
                    isDark
                        ? 'rotate-90 scale-0 opacity-0'
                        : 'rotate-0 scale-100 opacity-100'
                }
                `}
            />

            <MoonStar
                className={`
                    absolute size-[18px]
                    transition-all duration-300
                    ${
                    isDark
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-90 scale-0 opacity-0'
                }
                `}
            />
        </button>
    )
}