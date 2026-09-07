'use client'

import {ChevronUp, LogOut,} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useSidebar } from '@/providers/sidebar-provider'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { logOutAction } from '@/redux/auth/actionCreator'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from 'react-i18next'

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
        dispatch<any>(
            logOutAction(() => {
                router.push('/auth/login')
            })
        )
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
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-2.5
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-white/10
                    focus:outline-none
                "
            >
                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/10
                        text-sm
                        font-semibold
                        text-white
                    "
                >
                    {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
                </div>

                {!collapsed && (
                    <>
                        <div className="min-w-0 flex-1 rtl:text-right ltr:text-left">
                            <p className="truncate text-sm font-medium text-white">
                                {user?.name}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                                {user?.email}
                            </p>
                        </div>

                        <ChevronUp className="size-4 shrink-0 text-slate-400" />
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
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111827]
                    p-2
                    shadow-2xl
                "
            >
                {/*
                |--------------------------------------------------------------------------
                | Actions
                |--------------------------------------------------------------------------
                */}

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-slate-300
                        transition-colors
                        focus:bg-white/10
                        focus:text-white
                    "
                >
                    <div
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-white/5
                            text-slate-400
                        "
                    >
                        <LogOut className="size-4" />
                    </div>

                    <span className="text-xs">
                        {t('profile.logout')}
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

