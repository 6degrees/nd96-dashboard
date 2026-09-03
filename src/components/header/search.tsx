'use client'

import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
|
| Search input displayed in the dashboard header.
|
| Features:
| - Responsive visibility
| - Search icon
| - Search input
|
*/

export default function Search() {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="hidden items-center gap-2 rounded-xl border border-border/50 bg-muted/50 px-3 md:flex">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />

            <input
                placeholder={t('common.search')}
                className="h-10 w-64 bg-transparent text-sm outline-none"
            />
        </div>
    )
}