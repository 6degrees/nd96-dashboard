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
| - Identity header
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
        <div className="identity-sidebar-inner">
            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div className="identity-sidebar-header">
                <div className="identity-sidebar-logo">
                    <SidebarLogo />
                </div>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Navigation
            |--------------------------------------------------------------------------
            */}

            <nav className="identity-sidebar-nav">
                <div className="identity-sidebar-nav-groups">
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

            <div className="identity-sidebar-footer">
                <SidebarFooter />
            </div>
        </div>
    )
}