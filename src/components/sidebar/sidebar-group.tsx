'use client'

import { NavigationGroup } from '@/lib/navigation'
import { useSidebar } from '@/providers/sidebar-provider'

import SidebarItem from './sidebar-item'
import {useTranslation} from "react-i18next";

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
| - Group title
| - Collapsible title
| - Navigation items
|
*/

export default function SidebarGroup({group}: SidebarGroupProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */
    const { collapsed } = useSidebar()
    const { i18n } = useTranslation()
    const title = i18n.language === 'ar' ? group.title.ar : group.title.en

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-2">
            {!collapsed && (
                <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {title}
                </h2>
            )}

            <div className="space-y-1">
                {group.items.map((item) => (
                    <SidebarItem key={item.key} item={item}/>
                ))}
            </div>
        </div>
    )
}