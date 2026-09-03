import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { api as invitationApi } from '@/redux/invitation'

/*
|--------------------------------------------------------------------------
| useShowInvitation Hook
|--------------------------------------------------------------------------
|
| Custom hook to handle fetching invitation details by token.
|
*/
export const useShowInvitation = () => {
    const dispatch = useDispatch()

    /*
    |--------------------------------------------------------------------------
    | States
    |--------------------------------------------------------------------------
    */
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    /*
    |--------------------------------------------------------------------------
    | Handlers
    |--------------------------------------------------------------------------
    */
    // Fetch invitation details using token
    const showInvitation = useCallback(async (token: string) => {
        setLoading(true)
        setError(null)
        try {
            const data = await dispatch<any>(invitationApi.show(token))
            setLoading(false)
            return data
        } catch (err: any) {
            setError(err)
            setLoading(false)
            throw err
        }
    }, [dispatch])

    return {
        showInvitation,
        loading,
        error,
    }
}