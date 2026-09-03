'use client'

import { ReactNode } from 'react'
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import {SidebarProvider} from "@/providers/sidebar-provider";

type DashboardLayoutProps = {
    children: ReactNode
}

/*
|--------------------------------------------------------------------------
| Dashboard Layout
|--------------------------------------------------------------------------
|
| Main layout for all dashboard pages.
|
| Structure:
| - Sidebar navigation
| - Top header
| - Responsive content area
|
*/
export default function DashboardLayout({children,}: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background">
                <div className="flex">
                    {/*
                    |--------------------------------------------------------------------------
                    | Sidebar
                    |--------------------------------------------------------------------------
                    |
                    | Main navigation for the dashboard.
                    |
                    */}
                    <Sidebar />
                    {/*
                    |--------------------------------------------------------------------------
                    | Content
                    |--------------------------------------------------------------------------
                    |
                    | Contains the header and page content.
                    |
                    */}
                    <div className="flex min-h-screen flex-1 flex-col overflow-y-auto">
                        <Header />
                        {/*
                        |--------------------------------------------------------------------------
                        | Main Content
                        |--------------------------------------------------------------------------
                        |
                        | Responsive page container.
                        |
                        */}
                        <main className="flex-1">
                            <div className="mx-auto w-full p-2 bg-muted/20">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}