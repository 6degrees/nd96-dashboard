import {
    LayoutDashboard,
    Building2,
    UsersRound,
    Landmark,
    MessagesSquare,
    MonitorCog,
    Bell,
    type LucideIcon,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export type NavigationItem = {
    key: string
    label: {
        en: string
        ar: string
    }
    href: string
    icon: LucideIcon
    badge?: string
}

export type NavigationGroup = {
    key: string
    title: {
        en: string
        ar: string
    }
    items: NavigationItem[]
}

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

export const navigation: NavigationGroup[] = [
    /*
    |--------------------------------------------------------------------------
    | Main
    |--------------------------------------------------------------------------
    */

    {
        key: 'main',
        title: {
            en: 'Main',
            ar: 'الرئيسية',
        },
        items: [
            {
                key: 'overview',
                label: {
                    en: 'Overview',
                    ar: 'نظرة عامة',
                },
                href: '/dashboard',
                icon: LayoutDashboard,
            },
        ],
    },

    /*
    |--------------------------------------------------------------------------
    | Management
    |--------------------------------------------------------------------------
    */

    {
        key: 'management',
        title: {
            en: 'Management',
            ar: 'الإدارة',
        },
        items: [
            {
                key: 'users',
                label: {
                    en: 'Users',
                    ar: 'المستخدمون',
                },
                href: '/dashboard/users',
                icon: UsersRound,
            },
            {
                key: 'departments',
                label: {
                    en: 'Departments',
                    ar: 'الإدارات',
                },
                href: '/dashboard/departments',
                icon: Building2,
            },
            {
                key: 'screen-commands',
                label: {
                    en: 'Screen Controls',
                    ar: 'التحكم بالشاشات',
                },
                href: '/dashboard/commands',
                icon: MonitorCog,
            },
        ],
    },

    /*
    |--------------------------------------------------------------------------
    | Communication
    |--------------------------------------------------------------------------
    */

    {
        key: 'communication',
        title: {
            en: 'Communication',
            ar: 'التواصل',
        },
        items: [
            {
                key: 'messages',
                label: {
                    en: 'Messages',
                    ar: 'الرسائل',
                },
                href: '/dashboard/messages',
                icon: MessagesSquare,
            },
            {
                key: 'notifications',
                label: {
                    en: 'Notifications',
                    ar: 'الإشعارات',
                },
                href: '/dashboard/notifications',
                icon: Bell,
                badge: '0',
            },
        ],
    },

    /*
    |--------------------------------------------------------------------------
    | Timeline
    |--------------------------------------------------------------------------
    */

    {
        key: 'timeline',
        title: {
            en: 'Timeline',
            ar: 'الخط الزمني',
        },
        items: [
            {
                key: 'timeline',
                label: {
                    en: 'National Timeline',
                    ar: 'الخط الزمني الوطني',
                },
                href: '/dashboard/timelines',
                icon: Landmark,
            },
        ],
    },
]