'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { subscribeToMessageChannel } from '@/services/realtime/channels/message'

/*
|--------------------------------------------------------------------------
| Realtime Provider Props
|--------------------------------------------------------------------------
|
| Defines the props accepted by the realtime provider.
|
*/

type RealtimeProviderProps = {
    children: React.ReactNode
}

/*
|--------------------------------------------------------------------------
| Realtime Provider
|--------------------------------------------------------------------------
|
| Provides global realtime subscriptions for the application.
|
| Responsibilities:
| - Subscribe to the message realtime channel.
| - Handle message notifications globally.
| - Keep the subscription active while the application is mounted.
| - Clean up the subscription when the provider is unmounted.
|
*/

export default function RealtimeProvider({children,}: RealtimeProviderProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    | Provides the translation function for realtime notifications.
    |
    */

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Message Realtime Subscription
    |--------------------------------------------------------------------------
    |
    | Subscribes to message events globally so notifications work
    | regardless of the current page.
    |
    */

    useEffect(() => {

        const cleanupMessage = subscribeToMessageChannel({
            t,

            /*
            |--------------------------------------------------------------------------
            | Message Published
            |--------------------------------------------------------------------------
            |
            | Handles newly published messages.
            |
            */

            published: (event: any) => {
                console.log('Reverb: Message published.', event)
            },

            /*
            |--------------------------------------------------------------------------
            | Message Updated
            |--------------------------------------------------------------------------
            |
            | Handles message updates.
            |
            */

            updated: (event: any) => {
                console.log('Reverb: Message updated.', event)
            },

            /*
            |--------------------------------------------------------------------------
            | Message Hidden
            |--------------------------------------------------------------------------
            |
            | Handles hidden messages.
            |
            */

            hidden: (event: any) => {
                console.log('Reverb: Message hidden.', event)
            },
        })

        /*
        |--------------------------------------------------------------------------
        | Cleanup
        |--------------------------------------------------------------------------
        */

        return () => {
            cleanupMessage?.()
        }

    }, [t])

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return <>{children}</>
}