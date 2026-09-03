'use client'
import SidebarTrigger from './sidebar-trigger'
import LanguageSwitcher from './language-switcher'
import ThemeSwitcher from './theme-switcher'
import Notification from './notification'
import ProfileMenu from './profile-menu'
import Search from "@/components/header/search";

export default function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-18 px-6 py-[38px] items-center justify-between border-b border-border/50 bg-background/70 backdrop-blur-2xl shadow-sm">
            {/* Left */}
            <div className="flex items-center gap-4">
                <SidebarTrigger />

                <Search />
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                <LanguageSwitcher />

                <ThemeSwitcher />

                <Notification />

                <ProfileMenu />
            </div>
        </header>
    )
}