import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/router'
import {resetPasswordAction} from '@/redux/auth/actionCreator'
import {useTranslation} from "react-i18next";
import {toast} from "@/lib/toast/toast";

/*
|--------------------------------------------------------------------------
| useResetPassword Hook
|--------------------------------------------------------------------------
|
| Handles reset password logic:
| - dispatch reset action
| - success message
| - redirect to login
|
*/
export const useResetPassword = () => {
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const {loading, error} = useSelector((state: any) => state.auth)
    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Handle Reset Password
    |--------------------------------------------------------------------------
    */
    const handleResetPassword = (values: any) => {
        dispatch(resetPasswordAction(values, () => {
            toast.success({message: t('auth.resetPasswordPage.successMessage'),})
            router.push('/auth/login')
        }))
    }

    return {
        loading,
        error,
        handleResetPassword,
    }
}