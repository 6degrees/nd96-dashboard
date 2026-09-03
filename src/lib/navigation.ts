import {
    LayoutDashboard,
    Users,
    Building2,
    ShoppingBag,
    Package,
    UserRound,
    Bell,
    Settings,
    Send,
    ShieldCheck,
    Star,
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
        key: 'branch-management',
        title: {
            en: 'Branches & Locations',
            ar: 'الفروع والمواقع',
        },
        items: [
            {
                key: 'branches',
                label: {
                    en: 'Branches',
                    ar: 'إدارة الفروع',
                },
                href: '/dashboard/branches',
                icon: Building2,
            },
        ],
    },

    {
        key: 'catalog',
        title: {
            en: 'Catalog',
            ar: 'إدارة الطلبات والمنتجات',
        },
        items: [
            {
                key: 'orders',
                label: {
                    en: 'Orders',
                    ar: 'الطلبات',
                },
                href: '/dashboard/orders',
                icon: ShoppingBag,
            },
            {
                key: 'quality-standards',
                label: {
                    en: 'Quality Standards',
                    ar: 'معايير الجودة',
                },
                href: '/dashboard/qualities',
                icon: ShieldCheck,
            },
            {
                key: 'products',
                label: {
                    en: 'Products',
                    ar: 'المنتجات',
                },
                href: '/dashboard/products',
                icon: Package,
            },
        ],
    },

    {
        key: 'customer-management',
        title: {
            en: 'Customer Management',
            ar: 'إدارة العملاء و التقييمات',
        },
        items: [
            {
                key: 'customers',
                label: {
                    en: 'Customers',
                    ar: 'العملاء',
                },
                href: '/dashboard/customers',
                icon: UserRound,
            },
            {
                key: 'ratings',
                label: {
                    en: 'Ratings',
                    ar: 'التقييمات',
                },
                href: '/dashboard/ratings',
                icon: Star,
            },
        ],
    },

    {
        key: 'others',
        title: {
            en: 'Others',
            ar: 'أخرى',
        },
        items: [
            {
                key: 'managers',
                label: {
                    en: 'Employee Managements',
                    ar: 'طاقم العمل',
                },
                href: '/dashboard/users',
                icon: Users,
            },
            {
                key: 'invitations',
                label: {
                    en: 'Invitations',
                    ar: 'الدعوات',
                },
                href: '/dashboard/invitations',
                icon: Send,
            },
            {
                key: 'notification',
                label: {
                    en: 'Notifications',
                    ar: 'الاشعارات',
                },
                href: '/dashboard/notifications',
                icon: Bell,
            },
            {
                key: 'settings',
                label: {
                    en: 'Settings',
                    ar: 'الإعدادات',
                },
                href: '/dashboard/settings',
                icon: Settings,
            },
        ],
    },
]