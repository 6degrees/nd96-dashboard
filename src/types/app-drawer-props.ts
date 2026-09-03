import { DrawerProps } from '@/types/drawer-props'
import { ReactNode } from 'react'

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
export interface AppDrawerProps
    extends DrawerProps {

    title?: string
    width?: string | null
    children: ReactNode
}