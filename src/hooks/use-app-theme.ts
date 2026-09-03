'use client'

import {theme} from 'antd'
import {useTheme} from 'next-themes'

/*
|--------------------------------------------------------------------------
| App Theme
|--------------------------------------------------------------------------
|
| Provides the current application theme and maps it to the
| corresponding Ant Design theme algorithm.
|
*/

export function useAppTheme() {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */
    const {theme: currentTheme, resolvedTheme, setTheme} = useTheme()

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {
        currentTheme,
        resolvedTheme,
        setTheme,
        algorithm: resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }
}