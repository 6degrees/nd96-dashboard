import {
    LayoutDashboard,
    Building2,
    Users,
    CalendarDays,
    type LucideIcon,
} from 'lucide-react'

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

export const navigation: NavigationGroup[] = [
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

    {
        key: 'management',
        title: {
            en: 'Management',
            ar: 'الإدارة',
        },
        items: [
            {
                key: 'department',
                label: {
                    en: 'Departments',
                    ar: 'الإدارات',
                },
                href: '/dashboard/departments',
                icon: Building2,
            },
            {
                key: 'users',
                label: {
                    en: 'Users',
                    ar: 'المستخدمون',
                },
                href: '/dashboard/users',
                icon: Users,
            },
        ],
    },

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
                icon: CalendarDays,
            },
        ],
    },
]