'use client'

import {createContext, useContext, useMemo, useState, type ReactNode} from 'react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type SidebarContextType = {
    collapsed: boolean
    mobileOpen: boolean
    toggleSidebar: () => void
    openMobile: () => void
    closeMobile: () => void
}

type SidebarProviderProps = {
    children: ReactNode
}

/*
|--------------------------------------------------------------------------
| Context
|--------------------------------------------------------------------------
*/

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Manages the sidebar state for desktop and mobile layouts.
|
| Features:
| - Toggle sidebar collapsed state.
| - Open sidebar on mobile.
| - Close sidebar on mobile.
|
*/

export function SidebarProvider({
    children,
}: SidebarProviderProps) {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    const value = useMemo(
        () => ({
            collapsed,
            mobileOpen,

            toggleSidebar: () => setCollapsed((prev) => !prev),

            openMobile: () => setMobileOpen(true),

            closeMobile: () => setMobileOpen(false),
        }),
        [collapsed, mobileOpen]
    )

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
|
| Provides access to the sidebar context.
|
*/

export function useSidebar() {
    const context = useContext(SidebarContext)

    if (!context) {
        throw new Error('useSidebar must be used inside SidebarProvider')
    }

    return context
}

