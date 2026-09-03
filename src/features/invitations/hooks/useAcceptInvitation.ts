import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { useTranslation } from 'react-i18next'
import { api as invitationApi } from '@/redux/invitation'
import {toast} from "@/lib/toast/toast";

/*
|--------------------------------------------------------------------------
| useAcceptInvitation Hook
|--------------------------------------------------------------------------
|
| Handles accepting invitation logic via Redux Thunks and triggering notifications.
|
*/
export const useAcceptInvitation = () => {
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const { t } = useTranslation()

    // Selector based on your store state structure for invitation module
    const { actionLoading, error } = useSelector((state: any) => state.invitation || {})

    /*
    |--------------------------------------------------------------------------
    | Handle Accept Invitation Action
    |--------------------------------------------------------------------------
    */
    const acceptInvitation = async (payload: { token: string; [key: string]: any }, onSuccess?: (res?: any) => void) => {
        try {
            const resultAction = await dispatch(invitationApi.accept(payload))
            const response = resultAction?.payload || resultAction
            toast.success({message: t('invitation.accept.successMessage', 'Invitation accepted successfully!'),})

            if (onSuccess) {
                onSuccess(response)
            } else {
                await router.push('/auth/login')
            }

            return response
        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                t('invitation.accept.errorMessage', 'Failed to accept invitation.')

            toast.error({message: errorMessage,})
            throw err
        }
    }

    return {
        acceptInvitation,
        actionLoading,
        error,
    }
}