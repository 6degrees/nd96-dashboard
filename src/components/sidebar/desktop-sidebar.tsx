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
| - Saudi National Day visual identity
| - Geometric identity accents
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
            className={clsx('identity-sidebar hidden min-h-screen shrink-0 flex-col lg:flex',
                collapsed ? 'w-20' : 'w-72',
            )}>
            <div className="identity-sidebar-pattern" aria-hidden="true" />

            <div className="identity-sidebar-accent identity-sidebar-accent-top" aria-hidden="true" />

            <div className="identity-sidebar-content">
                <SidebarContent />
            </div>

            <div className="identity-sidebar-accent identity-sidebar-accent-bottom" aria-hidden="true" />
        </aside>
    )
}