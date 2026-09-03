'use client'
import {ChevronUp, LogOut} from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useSidebar } from '@/providers/sidebar-provider'
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {logOutAction} from "@/redux/auth/actionCreator";
import {useAuth} from "@/hooks/useAuth";
import {useTranslation} from "react-i18next";

/*
|--------------------------------------------------------------------------
| Sidebar Footer
|--------------------------------------------------------------------------
|
| Displays the current user information and provides
| quick access to account-related actions.
|
| Features:
| - User information
| - Account menu
| - Logout action
|
*/

export default function SidebarFooter() {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const router = useRouter()
    const { collapsed } = useSidebar()
    const { user } = useAuth()

    /*
    |--------------------------------------------------------------------------
    | Handlers
    |--------------------------------------------------------------------------
    */
    const handleLogout = () => {
        dispatch<any>(logOutAction(() => {router.push('/auth/login')}))
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <DropdownMenu>
            {/*
            |--------------------------------------------------------------------------
            | Trigger
            |--------------------------------------------------------------------------
            */}

            <DropdownMenuTrigger
                className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-3
                    text-left
                    transition-all
                    duration-300
                    hover:bg-white/10
                    font-ar
                "
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] via-[#2563EB] to-[#0EA5E9] font-semibold text-white shadow-lg shadow-blue-500/20">
                    A
                </div>

                {!collapsed && (
                    <>
                        <div className="flex-1 overflow-hidden rtl:text-right ltr:text-left">
                            <p className="truncate text-sm font-semibold text-white">
                                {user?.name}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                                {user?.email}
                            </p>
                        </div>

                        <ChevronUp className="size-4 text-slate-500" />
                    </>
                )}
            </DropdownMenuTrigger>

            {/*
            |--------------------------------------------------------------------------
            | Content
            |--------------------------------------------------------------------------
            */}

            <DropdownMenuContent
                side="top"
                align="end"
                className="
                  w-72
                  rounded-2xl
                  border
                  border-border/60
                  bg-background/95
                  p-2
                  shadow-2xl
                  backdrop-blur-xl
                  font-ar">
                {/*
                |--------------------------------------------------------------------------
                | Actions
                |--------------------------------------------------------------------------
                */}
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 font-medium cursor-pointer transition-colors focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950/30 dark:focus:text-red-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                        <LogOut className="size-4" />
                    </div>
                    <span className="text-xs">{t('profile.logout')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}