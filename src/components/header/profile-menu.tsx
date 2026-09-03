'use client'
import { useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { LogOut, ChevronDown, Store, Check, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { logOutAction, switchTenantAction } from '@/redux/auth/actionCreator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tenant } from "@/types/tenant"

/*
|--------------------------------------------------------------------------
| ProfileMenu Component
|--------------------------------------------------------------------------
|
| Renders the authenticated merchant navigation menu within the header.
| Provides interactive controls for context switching between available
| organization tenants and executing secure session logouts.
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
    const currentTenantId = useSelector((state: any) => state.auth.currentTenantId)

    /*
    |--------------------------------------------------------------------------
    | Effects
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        if (typeof window !== 'undefined' && user?.tenants) {
            const savedTenantId = localStorage.getItem('active_tenant_id')

            if (savedTenantId) {
                if (savedTenantId !== currentTenantId) {
                    dispatch<any>(switchTenantAction(savedTenantId))
                }
            } else if (user.tenants.length > 0) {
                dispatch<any>(switchTenantAction(user.tenants[0].id))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.tenants, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Authentication Dispatches
    |--------------------------------------------------------------------------
    |
    | Handles secure session terminations and clean application sign-outs.
    | Clears persistent user credentials and triggers router redirects.
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
    | Tenant Operations
    |--------------------------------------------------------------------------
    |
    | Manages the active organization workspace transitions.
    | Dispatches state adjustments and securely stores the selected tenant context.
    |
    */
    const handleSwitchTenant = (tenantId: string) => {
        dispatch<any>(
            switchTenantAction(tenantId, () => {
                window.location.reload()
            })
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Tenant Memoization
    |--------------------------------------------------------------------------
    |
    | Resolves and caches the currently active tenant profile configuration.
    | Synchronizes dynamic tenant identities across application layers.
    |
    */
    const currentTenant = useMemo(() => {
        if (!user?.tenants) return undefined
        return user.tenants.find((tenant: Tenant) => tenant.id === currentTenantId) || user.tenants[0]
    }, [user?.tenants, currentTenantId])

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group flex h-11 items-center gap-3 rounded-2xl border border-neutral-200/80 bg-white px-3.5 text-sm font-medium transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-300 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] active:scale-[0.98] focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900 font-ar">
                <div className="relative flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 text-xs font-bold text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                    {currentTenant?.name ? currentTenant.name.charAt(0).toUpperCase() : <Store className="size-4" />}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-950"></span>
                    </span>
                </div>

                <div className="hidden min-w-0 text-left lg:block">
                    <p className="truncate text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                        {currentTenant?.name || t('profile.select_store')}
                    </p>
                </div>

                <ChevronDown className="hidden size-4 text-neutral-400 transition-transform duration-300 group-data-[state=open]:rotate-180 lg:block" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={10} className="w-72 rounded-2xl border border-neutral-200/60 bg-white/95 p-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-lg dark:border-neutral-800/60 dark:bg-neutral-950/95 font-ar">
                <div className="flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/50">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-200/60 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        <User className="size-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <p className="truncate text-sm font-bold text-neutral-800 dark:text-neutral-100">
                            {currentTenant?.name || t('profile.no_active_store')}
                        </p>
                        <p className="truncate text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator className="mx-1 my-1.5 bg-neutral-200/60 dark:bg-neutral-800/60" />

                <div className="space-y-1 max-h-[200px] overflow-y-auto px-1">
                    {user?.tenants && user.tenants.length > 0 ? (
                        user.tenants.map((tenant: Tenant) => {
                            const isSelected = tenant.id === currentTenant?.id

                            return (
                                <DropdownMenuItem
                                    key={tenant.id}
                                    onClick={() => handleSwitchTenant(tenant.id)}
                                    className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer focus:outline-none ${
                                        isSelected
                                            ? 'bg-indigo-50/80 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200'
                                            : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900 focus:bg-neutral-50 dark:focus:bg-neutral-900'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                            isSelected ? 'bg-indigo-600 text-white shadow-sm' : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400'
                                        }`}>
                                            <Store className="size-4.5" />
                                        </div>
                                        <span className={`truncate text-xs font-medium ${isSelected ? 'font-semibold text-indigo-900 dark:text-indigo-200' : 'text-neutral-700 dark:text-neutral-300'}`}>
                                            {tenant.name}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                                            <Check className="size-3.5 stroke-[2.5]" />
                                        </div>
                                    )}
                                </DropdownMenuItem>
                            )
                        })
                    ) : (
                        <p className="text-xs text-neutral-400 italic px-3 py-2">
                            {t('profile.no_stores')}
                        </p>
                    )}
                </div>

                <DropdownMenuSeparator className="mx-1 my-1.5 bg-neutral-200/60 dark:bg-neutral-800/60" />

                <div className="px-1">
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 font-medium cursor-pointer transition-colors focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950/30 dark:focus:text-red-300"
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                            <LogOut className="size-4" />
                        </div>
                        <span className="text-xs">{t('profile.logout')}</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}