'use client'

import { PanelLeft } from 'lucide-react'
import { useSidebar } from '@/providers/sidebar-provider'
import {useIsMobile} from "@/hooks/use-mobile";

export default function SidebarTrigger() {
    const isMobile = useIsMobile()

    const {
        toggleSidebar,
        openMobile,
    } = useSidebar()

    const handleClick = () => {
        if (isMobile) {
            openMobile()
        } else {
            toggleSidebar()
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="
                inline-flex
                size-10
                items-center
                justify-center
                rounded-xl
                border
                border-transparent
                transition-all
                hover:bg-accent
                active:scale-95
            "
        >
            <PanelLeft className="size-[18px]" />
        </button>
    )
}