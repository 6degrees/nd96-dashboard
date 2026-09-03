'use client'

import { useSidebar } from '@/providers/sidebar-provider'
import {useTranslation} from "react-i18next";

/*
|--------------------------------------------------------------------------
| Sidebar Logo
|--------------------------------------------------------------------------
|
| Displays the application branding.
|
| Features:
| - Brand icon
| - Application name
| - Subtitle
| - Collapsible layout
|
*/

export default function SidebarLogo() {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */
    const { collapsed } = useSidebar()
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] via-[#2563EB] to-[#0EA5E9] text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                C
            </div>

            {!collapsed && (
                <div>
                    <h1 className="text-base font-semibold tracking-tight">
                        {t('sidebar.brand')}
                    </h1>

                    <p className="text-xs text-muted-foreground mt-1">
                        {t('sidebar.merchant_dashboard')}
                    </p>
                </div>
            )}
        </div>
    )
}