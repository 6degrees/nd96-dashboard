'use client'

import { navigation } from '@/lib/navigation'
import SidebarLogo from './sidebar-logo'
import SidebarGroup from './sidebar-group'
import SidebarFooter from './sidebar-footer'

/*
|--------------------------------------------------------------------------
| Sidebar Content
|--------------------------------------------------------------------------
|
| Shared sidebar content used by both desktop and mobile layouts.
|
| Structure:
| - Logo
| - Navigation
| - Footer
|
*/

export default function SidebarContent() {
    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <>
            {/*
            |--------------------------------------------------------------------------
            | Logo
            |--------------------------------------------------------------------------
            */}

            <div className="border-b border-border/50 p-4">
                <SidebarLogo />
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Navigation
            |--------------------------------------------------------------------------
            */}

            <nav className="flex-1 overflow-y-auto px-3 py-6">
                <div className="space-y-8">
                    {navigation.map((group) => (
                        <SidebarGroup
                            key={group.key}
                            group={group}
                        />
                    ))}
                </div>
            </nav>

            {/*
            |--------------------------------------------------------------------------
            | Footer
            |--------------------------------------------------------------------------
            */}

            <div className="border-t border-border/50 p-4">
                <SidebarFooter />
            </div>
        </>
    )
}