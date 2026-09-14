/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
|
| Responsive sidebar wrapper.
|
| Renders:
| - Desktop sidebar
| - Mobile sidebar
|
*/

import DesktopSidebar from './desktop-sidebar'
import MobileSidebar from './mobile-sidebar'

export default function Sidebar() {
    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <DesktopSidebar />
            <MobileSidebar />
        </>
    )
}