'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { NavigationItem } from '@/lib/navigation'
import {useSidebar} from "@/providers/sidebar-provider";
import {useTranslation} from "react-i18next";

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
| - Icon support
| - Optional badge
| - Hover & active states
|
*/

export default function SidebarItem({item}: SidebarItemProps) {
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
            className={clsx(
                "group relative flex h-11 items-center rounded-xl transition-all duration-200 !no-underline", // إضافة !no-underline لمنع خط الرابط
                collapsed ? "justify-center" : "px-3",
                active
                    ? "bg-gradient-to-r from-[#4F46E5] via-[#2563EB] to-[#0EA5E9] !text-white shadow-lg shadow-blue-500/20"
                    : "!text-slate-400 hover:bg-white/5 hover:!text-white"
            )}
        >
            {active && (
                <span className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" />
            )}

            <div className="flex items-center gap-3">
                <Icon className={clsx("size-5 transition-colors", active ? "text-white" : "text-slate-400 group-hover:text-white")}/>
                {!collapsed && (<span className="text-sm font-medium">{label}</span>)}
            </div>
        </Link>
    )
}