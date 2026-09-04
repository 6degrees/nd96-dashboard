'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { NavigationItem } from '@/lib/navigation'
import { useSidebar } from '@/providers/sidebar-provider'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type SidebarItemProps = {
    item: NavigationItem
}

/*
|--------------------------------------------------------------------------
| Sidebar Item
|--------------------------------------------------------------------------
|
| Renders a single navigation item.
|
| Features:
| - Active route detection
| - Identity-based active state
| - Icon support
| - Collapsed sidebar support
| - RTL support
|
*/

export default function SidebarItem({ item }: SidebarItemProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

    const pathname = usePathname()
    const { i18n } = useTranslation()
    const { collapsed } = useSidebar()

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const active = pathname === item.href
    const Icon = item.icon
    const label = i18n.language === 'ar' ? item.label.ar : item.label.en

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Link
            href={item.href}
            aria-current={active ? 'page' : undefined}
            title={collapsed ? label : undefined}
            className={clsx('identity-sidebar-item !no-underline', collapsed && 'identity-sidebar-item-collapsed', active && 'identity-sidebar-item-active')}
        >
            {active && (
                <span className="identity-sidebar-item-active-shape" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>
            )}

            <span className="identity-sidebar-item-icon">
                <Icon />
            </span>

            {!collapsed && (
                <span className="identity-sidebar-item-label">
                    {label}
                </span>
            )}

            {active && !collapsed && (
                <span className="identity-sidebar-item-active-dot" aria-hidden="true" />
            )}
        </Link>
    )
}