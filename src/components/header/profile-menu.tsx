'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
    LogOut,
    ChevronDown,
    Store,
    User,
} from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'
import {
    logOutAction,
    switchTenantAction,
} from '@/redux/auth/actionCreator'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/*
|--------------------------------------------------------------------------
| ProfileMenu Component
|--------------------------------------------------------------------------
|
| Renders the authenticated user menu within the application header.
| Provides user information, tenant context switching, and logout actions.
|
*/

export default function ProfileMenu() {

    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

    const { t } = useTranslation()

    const { user } = useAuth()

    const dispatch = useDispatch()

    const router = useRouter()

    const currentTenantId = useSelector(
        (state: any) => state.auth.currentTenantId
    )

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    |
    | Restore the previously selected tenant when the user session
    | is initialized.
    |
    */

    useEffect(() => {

        if (
            typeof window !== 'undefined' &&
            user?.tenants
        ) {

            const savedTenantId =
                localStorage.getItem('active_tenant_id')

            if (savedTenantId) {

                if (
                    savedTenantId !== currentTenantId
                ) {
                    dispatch<any>(
                        switchTenantAction(savedTenantId)
                    )
                }

            } else if (user.tenants.length > 0) {

                dispatch<any>(
                    switchTenantAction(
                        user.tenants[0].id
                    )
                )
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.tenants, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    |
    | Terminates the current authenticated session and redirects
    | the user to the login page.
    |
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
            | Profile Trigger
            |--------------------------------------------------------------------------
            */}

            <DropdownMenuTrigger
                className="
                    group
                    flex
                    h-11
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[var(--color-border-light)]
                    bg-[var(--color-surface)]
                    px-3.5
                    text-sm
                    font-medium
                    text-[var(--color-text-primary)]
                    shadow-[var(--shadow-xs)]
                    transition-all
                    duration-300
                    hover:border-[var(--color-border)]
                    hover:bg-[var(--color-surface-soft)]
                    active:scale-[0.98]
                    focus-visible:outline-none
                    dark:border-[var(--color-border)]
                    dark:bg-[var(--color-surface)]
                    dark:hover:bg-[var(--color-surface-soft)]
                "
            >

                {/*
                |--------------------------------------------------------------------------
                | User Avatar
                |--------------------------------------------------------------------------
                */}

                <div
                    className="
                        relative
                        flex
                        h-7.5
                        w-7.5
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[var(--brand-primary)]
                        text-xs
                        font-bold
                        text-white
                        shadow-md
                        shadow-[rgb(0_52_58_/_18%)]
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                >

                    {user?.name ? (
                        user.email?.charAt(0).toUpperCase()
                    ) : (
                        <Store className="size-4" />
                    )}

                    {/*
                    |--------------------------------------------------------------------------
                    | Online Indicator
                    |--------------------------------------------------------------------------
                    */}

                    <span
                        className="
                            absolute
                            -bottom-0.5
                            -right-0.5
                            flex
                            h-2.5
                            w-2.5
                        "
                    >

                        <span
                            className="
                                absolute
                                inline-flex
                                h-full
                                w-full
                                animate-ping
                                rounded-full
                                bg-[var(--brand-lime)]
                                opacity-75
                            "
                        />

                        <span
                            className="
                                relative
                                inline-flex
                                h-2.5
                                w-2.5
                                rounded-full
                                border-2
                                border-white
                                bg-[var(--brand-green)]
                                dark:border-[var(--color-surface)]
                            "
                        />

                    </span>

                </div>

                {/*
                |--------------------------------------------------------------------------
                | User Name
                |--------------------------------------------------------------------------
                */}

                <div className="hidden min-w-0 text-left lg:block">

                    <p
                        className="
                            truncate
                            text-md
                            font-semibold
                            text-[var(--color-text-primary)]
                        "
                    >
                        {user?.name ||
                            t('profile.select_store')}
                    </p>

                </div>

                {/*
                |--------------------------------------------------------------------------
                | Dropdown Icon
                |--------------------------------------------------------------------------
                */}

                <ChevronDown
                    className="
                        hidden
                        size-4
                        text-[var(--color-text-muted)]
                        transition-transform
                        duration-300
                        group-data-[state=open]:rotate-180
                        lg:block
                    "
                />

            </DropdownMenuTrigger>

            {/*
            |--------------------------------------------------------------------------
            | Dropdown Content
            |--------------------------------------------------------------------------
            */}

            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="
                    w-72
                    rounded-2xl
                    border
                    border-[var(--color-border-light)]
                    bg-[var(--color-surface)]
                    p-2
                    shadow-[var(--shadow-lg)]
                    dark:border-[var(--color-border)]
                    dark:bg-[var(--color-surface)]
                "
            >

                {/*
                |--------------------------------------------------------------------------
                | User Information
                |--------------------------------------------------------------------------
                */}

                <div
                    className="
                        mb-1.5
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-[var(--color-surface-soft)]
                        px-3
                        py-2.5
                    "
                >

                    <div
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[var(--color-surface-muted)]
                            text-[var(--color-text-secondary)]
                        "
                    >
                        <User className="size-5" />
                    </div>

                    <div className="flex min-w-0 flex-col">

                        <p
                            className="
                                truncate
                                text-sm
                                font-bold
                                text-[var(--color-text-primary)]
                            "
                        >
                            {user?.name ||
                                t('profile.no_active_store')}
                        </p>

                        <p
                            className="
                                truncate
                                text-base
                                font-medium
                                text-[var(--color-text-muted)]
                            "
                        >
                            {user?.email}
                        </p>

                    </div>

                </div>

                <DropdownMenuSeparator
                    className="
                        mx-1
                        my-1.5
                        bg-[var(--color-border-light)]
                    "
                />

                {/*
                |--------------------------------------------------------------------------
                | Logout
                |--------------------------------------------------------------------------
                */}

                <div className="px-1">

                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="
                            flex
                            cursor-pointer
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-2.5
                            text-sm
                            font-medium
                            text-[var(--color-error)]
                            transition-colors
                            focus:bg-[var(--color-error-background)]
                            focus:text-[var(--color-error)]
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
                                rounded-xl
                                bg-[var(--color-error-background)]
                                text-[var(--color-error)]
                            "
                        >
                            <LogOut className="size-4" />
                        </div>

                        <span className="text-lg">
                            {t('profile.logout')}
                        </span>

                    </DropdownMenuItem>

                </div>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}