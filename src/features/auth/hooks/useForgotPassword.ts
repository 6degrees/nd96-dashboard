import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { forgotPasswordAction } from '@/redux/auth/actionCreator'
import {useTranslation} from "react-i18next";
import {toast} from "@/lib/toast/toast";

/*
|--------------------------------------------------------------------------
| useForgotPassword Hook
|--------------------------------------------------------------------------
|
| Handles forgot password logic including:
| - dispatching action
| - success message
| - redirect
|
*/

export const useForgotPassword = () => {
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const { loading, error } = useSelector((state: any) => state.auth)
    const { t } = useTranslation()

    const handleSubmit = (values: any) => {
        dispatch(
            forgotPasswordAction(
                values.email,
                values.code,
                () => {
                    toast.success({message: t('auth.forgotPasswordPage.instructionsSent'),})
                    router.push({pathname: '/auth/reset-password', query: { email: values.email },})
                }
            )
        )
    }

    return {
        handleSubmit,
        loading,
        error,
    }
}