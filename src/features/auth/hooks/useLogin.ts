import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { logInAction } from '@/redux/auth/actionCreator'

/*
|--------------------------------------------------------------------------
| useLogin Hook
|--------------------------------------------------------------------------
|
| Encapsulates all login logic including:
| - Dispatching login action
| - Handling navigation after success
| - Providing loading & error states
|
*/

export const useLogin = () => {
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const { loading, error } = useSelector((state: any) => state.auth)

    /*
    |--------------------------------------------------------------------------
    | handleLogin
    |--------------------------------------------------------------------------
    |
    | Executes login request and redirects on success.
    |
    */
    const handleLogin = (values: any) => {
        dispatch(
            logInAction(
                values.email,
                values.password, () => router.push('/dashboard')
            )
        )
    }

    return {
        handleLogin,
        loading,
        error,
    }
}