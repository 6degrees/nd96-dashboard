import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getInfoAction} from '@/redux/auth/actionCreator'

/*
|--------------------------------------------------------------------------
| Auth Initializer Component
|--------------------------------------------------------------------------
|
| Automatically fetches the latest authenticated user profile data
| on page load or reload if the user session exists.
|
*/
export const AuthInitializer = ({children}: { children: React.ReactNode }) => {
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true'
        const token = localStorage.getItem('tenant_access_token')

        if (isLoggedIn && token) {
            dispatch(getInfoAction())
        }
    }, [dispatch])

    return <>{children}</>
}