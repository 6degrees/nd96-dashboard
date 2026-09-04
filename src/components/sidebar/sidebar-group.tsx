'use client'

import { NavigationGroup } from '@/lib/navigation'
import { useSidebar } from '@/providers/sidebar-provider'
import { useTranslation } from 'react-i18next'

import SidebarItem from './sidebar-item'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type SidebarGroupProps = {
    group: NavigationGroup
}

/*
|--------------------------------------------------------------------------
| Sidebar Group
|--------------------------------------------------------------------------
|
| Renders a navigation group and its items.
|
| Features:
| - Identity-based group title
| - Collapsed sidebar support
| - Navigation items
|
*/

export default function SidebarGroup({ group }: SidebarGroupProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

    const { collapsed } = useSidebar()
    const { i18n } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Group Title
    |--------------------------------------------------------------------------
    */

    const title = i18n.language === 'ar' ? group.title.ar : group.title.en

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <section className="identity-sidebar-group">
            {!collapsed && (
                <div className="identity-sidebar-group-title">
                    <span className="identity-sidebar-group-marker" aria-hidden="true">
                        <span />
                        <span />
                    </span>

                    <h2>{title}</h2>
                </div>
            )}

            <div className="identity-sidebar-group-items">
                {group.items.map((item) => (
                    <SidebarItem key={item.key} item={item} />
                ))}
            </div>
        </section>
    )
}