'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
| Ant Design
|
*/
import { Drawer } from 'antd'

/*
|--------------------------------------------------------------------------
| Translation
|--------------------------------------------------------------------------
|
*/
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
import { AppDrawerProps } from '@/types/app-drawer-props'

/*
|--------------------------------------------------------------------------
| App Drawer Component
|--------------------------------------------------------------------------
|
| Shared reusable drawer component.
|
| Features:
| - centralized drawer behavior
| - reusable across all features
| - smooth modern animation
| - blurred background overlay
| - responsive width
| - full dark mode support
|
| Usage:
| - Create Drawer
| - Update Drawer
| - Details Drawer
|
*/
export default function AppDrawer({open, onClose, title, width = null, children}: AppDrawerProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    | Initialize translation hook for i18n support.
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Responsive Drawer Width
    |--------------------------------------------------------------------------
    |
    | Makes drawer fullscreen on mobile devices
    | and uses custom width on larger screens.
    |
    */
    const drawerWidth =
        typeof window !== 'undefined' && window.innerWidth < 768
            ? '100%'
            : (width ?? '460px')

    /*
    |--------------------------------------------------------------------------
    | Render Drawer
    |--------------------------------------------------------------------------
    |
    */
    return (
        <Drawer

            /*
            |--------------------------------------------------------------------------
            | Drawer State
            |--------------------------------------------------------------------------
            */
            open={open}
            onClose={onClose}

            /*
            |--------------------------------------------------------------------------
            | Drawer Header
            |--------------------------------------------------------------------------
            */
            title={title ? t(title) : ''}

            /*
            |--------------------------------------------------------------------------
            | Drawer Width
            |--------------------------------------------------------------------------
            */
            size={drawerWidth}

            /*
            |--------------------------------------------------------------------------
            | Drawer Position
            |--------------------------------------------------------------------------
            */
            placement="right"

            /*
            |--------------------------------------------------------------------------
            | Performance
            |--------------------------------------------------------------------------
            |
            | Destroy section after closing drawer
            | to reset internal state & forms.
            |
            */
            destroyOnHidden

            /*
            |--------------------------------------------------------------------------
            | Modern Drawer Styles
            |--------------------------------------------------------------------------
            */
            classNames={{
                body: `
                    bg-[#fafafa]
                    dark:bg-neutral-950
                    px-6
                    py-6
                `,

                header: `
                    bg-white/80
                    dark:bg-neutral-900/80
                    backdrop-blur-md
                    border-b border-neutral-100
                    dark:border-neutral-800/60
                    px-6
                    py-4
                    [&_.ant-drawer-title]:!text-[16px]
                    [&_.ant-drawer-title]:!font-bold
                    [&_.ant-drawer-title]:!text-neutral-800
                    dark:[&_.ant-drawer-title]:!text-neutral-200
                `,

                footer: `
                    border-t border-neutral-100
                    dark:border-neutral-800/60
                    bg-white
                    dark:bg-neutral-950
                `,
            }}

            /*
            |--------------------------------------------------------------------------
            | Modern Overlay Effect
            |--------------------------------------------------------------------------
            |
            | Adds blur & darker background
            | behind the drawer.
            |
            */
            styles={{
                mask: {
                    backdropFilter: 'blur(4px)',
                    background: 'rgba(0, 0, 0, 0.15)',
                },

                section: {
                    background: 'transparent',
                    boxShadow: '-8px 0 32px rgba(0,0,0,0.04)',
                },

                wrapper: {
                    overflow: 'hidden',
                },
            }}

            /*
            |--------------------------------------------------------------------------
            | Close Icon
            |--------------------------------------------------------------------------
            */
            closeIcon={
                <div
                    className="
                        w-7 h-7
                        rounded-full
                        flex items-center justify-center
                        text-neutral-400
                        hover:text-neutral-600
                        dark:hover:text-neutral-200
                        hover:bg-neutral-100
                        dark:hover:bg-neutral-800
                        transition-all
                        duration-200
                        text-[12px]
                    "
                >
                    ✕
                </div>
            }
        >

            {/* ---------------------------------------------------------------- */}
            {/* Animated section */}
            {/* ---------------------------------------------------------------- */}
            <div
                className="
                    animate-in
                    slide-in-from-right
                    duration-300
                    h-full
                    w-full
                "
            >
                {children}
            </div>

        </Drawer>
    )
}