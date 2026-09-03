'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

type SidebarContextType = {
    collapsed: boolean
    mobileOpen: boolean
    toggleSidebar: () => void
    openMobile: () => void
    closeMobile: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

type SidebarProviderProps = {
    children: ReactNode
}

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

export function useSidebar() {
    const context = useContext(SidebarContext)

    if (!context) {
        throw new Error('useSidebar must be used inside SidebarProvider')
    }

    return context
}