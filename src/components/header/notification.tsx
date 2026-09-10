'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, ExternalLink, ArrowRight, Sparkles } from "lucide-react"
import { useTranslation } from 'react-i18next'
import { useCollections } from "@/features/notifications"
import { api } from '@/features/notifications/api'
import {useDispatch, useSelector} from "react-redux"

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ar'
import 'dayjs/locale/en'
import Link from "next/link"
import {RootState} from "@/redux/store";

export default function Notification() {
    /*
     |--------------------------------------------------------------------------
     | Translation & Direction Hook
     |--------------------------------------------------------------------------
     |
     */
    dayjs.extend(relativeTime)
    const { t, i18n } = useTranslation()
    const isRtl = i18n.language === 'ar'
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dayjs.locale(i18n.language)
    }, [i18n.language])

    /*
     |--------------------------------------------------------------------------
     | Dropdown States & Refs
     |--------------------------------------------------------------------------
     |
     */
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const realtimeMessage = useSelector((state: RootState) => state.message.realtimeMessage)


    /*
     |--------------------------------------------------------------------------
     | Collections Hook
     |--------------------------------------------------------------------------
     |
     */
    const { list, loading, refresh } = useCollections()

    /*
     |--------------------------------------------------------------------------
     | Notifications Items
     |--------------------------------------------------------------------------
     |
     */
    const items = list?.data || []

    /*
     |--------------------------------------------------------------------------
     | Notifications State
     |--------------------------------------------------------------------------
     |
     */
    const [notifications, setNotifications] = useState(items)

    useEffect(() => {
        setNotifications(list?.data || [])
    }, [list?.data])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (!realtimeMessage) {
            return
        }

        // Reload notifications when a new message is published.
        refresh()
    }, [realtimeMessage])

    /*
     |--------------------------------------------------------------------------
     | Handle Toggle Dropdown & Mark As Read
     |--------------------------------------------------------------------------
     |
     */
    const handleToggleDropdown = () => {
        const nextState = !isOpen
        setIsOpen(nextState)

        if (nextState && unreadCount > 0) {
            dispatch(api.markAsRead() as any)

            setNotifications((prev: any[]) =>
                prev.map((item) => ({
                    ...item,
                    read_at: item.read_at || new Date().toISOString(),
                }))
            )
        }
    }

    /*
     |--------------------------------------------------------------------------
     | Unread Count & Display Count
     |--------------------------------------------------------------------------
     |
     */
    const unreadCount = notifications.filter((n: any) => !n.read_at).length
    const displayCount = unreadCount > 99 ? '99+' : unreadCount

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/*
             |--------------------------------------------------------------------------
             | Notification Button & Badge
             |--------------------------------------------------------------------------
             |
             */}
            <button onClick={handleToggleDropdown} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-slate-600 dark:text-slate-300 transition-all duration-200 hover:bg-accent hover:shadow-sm active:scale-95 focus:outline-none">
                <Bell className="size-4 text-black dark:text-white" />
                {unreadCount > 0 && (
                    <span
                        className={`absolute -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-background shadow-sm ${
                            isRtl ? '-left-1.5' : '-right-1.5'
                        }`}
                    >
                        {displayCount}
                    </span>
                )}
            </button>

            {/*
             |--------------------------------------------------------------------------
             | Dropdown Menu & Content
             |--------------------------------------------------------------------------
             |
             */}
            {isOpen && (
                <div
                    className={`absolute mt-3 w-80 sm:w-[390px] rounded-3xl border border-border bg-background shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
                        isRtl ? 'left-0 text-right' : 'right-0 text-left'
                    }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-muted/50 border-b border-border">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-foreground text-sm tracking-tight">
                                {t('notification.title')}
                            </span>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 text-[11px] font-bold bg-rose-500 text-white rounded-full shadow-sm">
                                    {displayCount}
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <span className="text-[11px] font-medium text-muted-foreground">
                                {t('notification.new')}
                            </span>
                        )}
                    </div>

                    {/* Body List */}
                    <div className="max-h-[380px] overflow-y-auto divide-y divide-border/60">
                        {loading ? (
                            <div className="py-12 text-center text-xs text-muted-foreground">
                                {t('common.loading')}
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="py-14 text-center text-xs text-muted-foreground flex flex-col items-center gap-3">
                                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground shadow-inner">
                                    <Bell className="h-6 w-6" />
                                </div>
                                <span className="font-medium text-muted-foreground">
                                    {t('notification.empty')}
                                </span>
                            </div>
                        ) : (
                            notifications.slice(0, 5).map((item: any) => (
                                <div key={item.id} className={`group relative flex items-start gap-3.5 p-4 transition-all duration-150 ${item.read_at ? 'bg-background hover:bg-muted/50' : 'hover:bg-muted/50'}`}>
                                    {/* Status Indicator */}
                                    <div className={`mt-1.5 flex h-2 w-2 flex-shrink-0 rounded-full transition-all ${item.read_at ? 'bg-muted-foreground/40' : 'bg-violet-600 ring-4 ring-violet-500/20'}`}/>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs leading-relaxed ${item.read_at ? 'text-muted-foreground font-normal' : 'text-foreground font-semibold'}`}>{item.message}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[10px] text-muted-foreground font-medium">
                                                {dayjs(item.created_at).fromNow()}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                {item.url && (
                                                    <a href={`/dashboard/messages`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-medium text-violet-600 dark:!text-white hover:text-violet-700 dark:hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 px-2.5 py-1 rounded-lg transition-colors">
                                                        {t('common.view')}
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/*
                     |--------------------------------------------------------------------------
                     | View All Notifications Footer Button
                     |--------------------------------------------------------------------------
                     |
                     */}
                    {notifications.length > 0 && (
                        <div className="p-2 bg-muted/50 border-t border-border">
                            <Link href="/dashboard/notifications" className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white dark:!text-white text-xs font-medium transition-all active:scale-[0.99]">
                                <span>{t('notification.view_all')}</span>
                                <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}