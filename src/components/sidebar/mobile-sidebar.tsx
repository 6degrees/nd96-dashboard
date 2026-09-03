'use client'
import {Sheet, SheetContent} from '@/components/ui/sheet'
import SidebarContent from './sidebar-content'
import { useSidebar } from '@/providers/sidebar-provider'

/*
|--------------------------------------------------------------------------
| Mobile Sidebar
|--------------------------------------------------------------------------
|
| Mobile version of the dashboard sidebar.
|
| Features:
| - Drawer navigation
| - Controlled open state
| - Closes automatically on dismiss
|
*/

export default function MobileSidebar() {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

    const {
        mobileOpen,
        closeMobile,
    } = useSidebar()

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Sheet
            open={mobileOpen}
            onOpenChange={(open) => {if (!open) {closeMobile()}}}>
            <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-full flex-col">
                    <SidebarContent />
                </div>
            </SheetContent>
        </Sheet>
    )
}