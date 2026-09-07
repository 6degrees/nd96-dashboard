'use client'

import Image from 'next/image'

/*
|--------------------------------------------------------------------------
| Sidebar Logo
|--------------------------------------------------------------------------
|
| Displays the SATORP brand logo.
|
*/

export default function SidebarLogo() {
    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="identity-sidebar-logo">
            <Image
                src="/brand/satorp-logo-light.png"
                alt="SATORP"
                width={220}
                height={200}
                priority
                className="identity-sidebar-logo-image"
            />
        </div>
    )
}