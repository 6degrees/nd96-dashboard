'use client'

import { Drawer } from 'antd'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AppDrawerProps } from '@/types/app-drawer-props'

/*
|--------------------------------------------------------------------------
| App Drawer
|--------------------------------------------------------------------------
|
| Shared drawer component following the SATORP / Saudi National Day
| visual identity.
|
| Features:
| - Responsive width
| - Full-screen drawer on mobile
| - SATORP brand styling
| - Saudi green accent
| - RTL friendly
| - Clean header
| - Soft overlay
| - Smooth animation
|
*/

export default function AppDrawer({
                                      open,
                                      onClose,
                                      title,
                                      width = null,
                                      children,
                                  }: AppDrawerProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    */

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Drawer Width
    |--------------------------------------------------------------------------
    |
    | Ant Design supports responsive sizing through CSS.
    | We avoid reading window.innerWidth during render.
    |
    */

    const drawerWidth = width ?? '460px'

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Drawer
            open={open}
            onClose={onClose}

            placement="right"

            size={drawerWidth}

            destroyOnHidden

            title={
                title ? (
                    <div className="flex items-center gap-3">

                        {/* Brand Accent */}
                        <span
                            className="
                                h-8
                                w-1
                                shrink-0
                                rounded-full
                                bg-[#006C35]
                            "
                        />

                        {/* Title */}
                        <span
                            className="
                                text-[17px]
                                font-bold
                                leading-none
                                tracking-tight
                                text-[#172018]
                                dark:text-white
                            "
                        >
                            {t(title)}
                        </span>

                    </div>
                ) : null
            }

            /*
            |--------------------------------------------------------------------------
            | Drawer Classes
            |--------------------------------------------------------------------------
            */

            classNames={{
                wrapper: `
                    max-md:!w-full
                `,

                section: `
                    overflow-hidden
                    bg-white
                    dark:bg-[#111713]
                `,

                header: `
                    relative
                    border-b
                    border-[#E7ECE8]
                    bg-white
                    px-6
                    py-5
                    dark:border-[#26302A]
                    dark:bg-[#111713]

                    [&_.ant-drawer-title]:!m-0
                    [&_.ant-drawer-title]:!p-0
                `,

                body: `
                    bg-[#F8FAF8]
                    px-6
                    py-6

                    dark:bg-[#0D120F]

                    max-md:px-5
                    max-md:py-5
                `,

                footer: `
                    border-t
                    border-[#E7ECE8]
                    bg-white
                    dark:border-[#26302A]
                    dark:bg-[#111713]
                `,
            }}

            /*
            |--------------------------------------------------------------------------
            | Inline Styles
            |--------------------------------------------------------------------------
            */

            styles={{
                mask: {
                    background: 'rgba(15, 23, 18, 0.30)',
                    backdropFilter: 'blur(5px)',
                },

                section: {
                    boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.08)',
                },

                wrapper: {
                    maxWidth: '100%',
                },
            }}

            /*
            |--------------------------------------------------------------------------
            | Close Button
            |--------------------------------------------------------------------------
            */

            closeIcon={
                <span
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full

                        border
                        border-[#E1E8E3]

                        bg-white
                        text-[#5F6B63]

                        transition-all
                        duration-200

                        hover:border-[#006C35]
                        hover:bg-[#EFF8F2]
                        hover:text-[#006C35]

                        dark:border-[#303B33]
                        dark:bg-[#18201B]
                        dark:text-[#AAB5AE]

                        dark:hover:border-[#4BAF76]
                        dark:hover:bg-[#173523]
                        dark:hover:text-[#72C995]
                    "
                    aria-label="Close"
                >
                    <X size={17} strokeWidth={2} />
                </span>
            }
        >

            {/* ---------------------------------------------------------------- */}
            {/* Content */}
            {/* ---------------------------------------------------------------- */}

            <div
                className="
                    h-full
                    w-full

                    animate-in
                    slide-in-from-right
                    duration-300

                    font-[SaudiWeb]
                "
            >
                {children}
            </div>

        </Drawer>
    )
}