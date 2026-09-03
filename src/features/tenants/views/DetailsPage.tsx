'use client'

import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Utilities & API Actions
|--------------------------------------------------------------------------
|
*/

import {handleCopyAction} from '@/utils/helpers'
import {api} from '../api'
import {useAuth} from '@/hooks/useAuth'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/

import {SettingsOverview} from '@/components/settings'

/*
|--------------------------------------------------------------------------
| Settings Details Page
|--------------------------------------------------------------------------
|
*/

export default function SettingsDetailsPage() {

    /*
    |--------------------------------------------------------------------------
    | Redux & Translation
    |--------------------------------------------------------------------------
    |
    */

    const dispatch = useDispatch()

    const {t, i18n} = useTranslation()

    const {user} = useAuth()

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    |
    */

    const [initialized, setInitialized] = useState(false)

    const [copiedId, setCopiedId] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Direction
    |--------------------------------------------------------------------------
    |
    */

    const isRtl = useMemo(
        () =>
            i18n.language === 'ar' ||
            i18n.dir?.() === 'rtl',
        [i18n],
    )

    /*
    |--------------------------------------------------------------------------
    | Tenant
    |--------------------------------------------------------------------------
    |
    */

    const tenant = useSelector(
        (state: any) =>
            state.tenant?.current,
    )

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    |
    */

    const loading = useSelector(
        (state: any) =>
            state.tenant?.loading ?? true,
    )

    /*
    |--------------------------------------------------------------------------
    | Fetch Tenant
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {

        dispatch(
            api.detail('') as any,
        ).finally(() => {

            setInitialized(true)

        })

    }, [dispatch])

    /*
    |--------------------------------------------------------------------------
    | Copy
    |--------------------------------------------------------------------------
    |
    */

    const handleCopy = (
        text?: string,
        setCopiedState?: (value: boolean) => void,
    ) => {

        return handleCopyAction(
            text,
            setCopiedState,
            t('common.copied'),
        )

    }

    /*
    |--------------------------------------------------------------------------
    | Sync
    |--------------------------------------------------------------------------
    |
    */

    const handleSync = () => {

        // تنفيذ عملية المزامنة

    }

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    |
    */

    if (!initialized || loading) {

        return (
            <div
                className="min-h-screen space-y-8 bg-[#F8FAFC] p-6 font-sans animate-pulse dark:bg-[#0A0A0A] sm:p-10"
                dir={isRtl ? 'rtl' : 'ltr'}
            >

                <div className="h-60 w-full rounded-[2.5rem] bg-slate-200 dark:bg-neutral-900"/>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                    <div className="h-[480px] rounded-[2.5rem] bg-slate-200 dark:bg-neutral-900 lg:col-span-5"/>

                    <div className="h-[480px] rounded-[2.5rem] bg-slate-200 dark:bg-neutral-900 lg:col-span-7"/>

                </div>

            </div>
        )

    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div
            className="min-h-screen bg-[#F8FAFC] p-4 font-sans text-slate-900 selection:bg-blue-600 selection:text-white transition-colors duration-500 dark:bg-[#0A0A0A] dark:text-slate-100 sm:p-8 lg:p-10"
            dir={isRtl ? 'rtl' : 'ltr'}
        >

            <SettingsOverview
                tenant={tenant}
                user={user}
                language={i18n.language}
                t={t}
                copiedId={copiedId}
                onCopy={(id: string) =>
                    handleCopy(
                        id,
                        setCopiedId,
                    )
                }
                onSync={handleSync}
            />

        </div>
    )
}