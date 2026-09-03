'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import {useTranslation} from 'react-i18next'
import {UserRoundCheck} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/

import {ListView as StaffTable} from '@/features/staffs'

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/

export default function StaffTab() {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="space-y-5">

            <div className="bg-white p-6 dark:bg-neutral-900">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <UserRoundCheck size={20}/>
                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            {t('branch.staffTitle')}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                            {t('branch.staffDescription')}
                        </p>

                    </div>

                </div>

            </div>

            <StaffTable/>

        </div>
    )
}