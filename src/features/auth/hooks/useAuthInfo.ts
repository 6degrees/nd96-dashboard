import { useDispatch, useSelector } from 'react-redux'
import { getInfoAction } from '@/redux/auth/actionCreator'

/*
|--------------------------------------------------------------------------
| useAuthInfo Hook
|--------------------------------------------------------------------------
|
| Encapsulates all user info retrieval logic including:
| - Dispatching getInfo action
| - Providing user data, loading, and error states
|
*/

export const useAuthInfo = () => {
    const dispatch = useDispatch<any>()
    const { user, loading, error } = useSelector((state: any) => state.auth)

    /*
    |--------------------------------------------------------------------------
    | fetchInfo
    |--------------------------------------------------------------------------
    |
    | Executes user info request and handles optional success callback.
    |
    */
    const fetchInfo = (callback?: (res: any) => void) => {
        dispatch(
            getInfoAction((res: any) => {
                if (callback) callback(res)
            })
        )
    }

    return {
        fetchInfo,
        user,
        loading,
        error,
    }
}