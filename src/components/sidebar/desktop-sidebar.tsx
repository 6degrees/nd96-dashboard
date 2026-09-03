'use client'

import clsx from 'clsx'

import SidebarContent from './sidebar-content'
import { useSidebar } from '@/providers/sidebar-provider'

/*
|--------------------------------------------------------------------------
| Desktop Sidebar
|--------------------------------------------------------------------------
|
| Desktop version of the dashboard sidebar.
|
| Features:
| - Collapsible
| - Responsive
| - Animated width transition
|
*/

export default function DesktopSidebar() {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

    const { collapsed } = useSidebar()

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <aside
            className={clsx(`hidden lg:flex min-h-screen shrink-0 flex-col bg-slate-950 dark:bg-neutral-950/80 text-slate-100 border-r border-slate-800/80 shadow-[8px_0_30px_rgba(15,23,42,0.25)] transition-[width] duration-300`,
                collapsed ? "w-20" : "w-86"
            )}
        >
            <SidebarContent />
        </aside>
    )
}