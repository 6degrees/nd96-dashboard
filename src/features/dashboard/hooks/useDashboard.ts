import {useDispatch, useSelector} from 'react-redux'
import {
    fetchDashboardAction,
} from '@/redux/dashboard/actionCreator'
import {RootState} from '@/redux/store'

/*
|--------------------------------------------------------------------------
| useDashboard Hook
|--------------------------------------------------------------------------
|
| Encapsulates all tenant dashboard logic including:
| - Fetching tenant dashboard statistics
| - Fetching monthly order statistics
| - Fetching top sales branches
| - Fetching branch dashboard statistics
| - Fetching branch ratings
| - Fetching rating sentiment
| - Providing dashboard state
|
*/

export const useDashboard = () => {
    const dispatch = useDispatch<any>()

    /*
    |--------------------------------------------------------------------------
    | Redux State Selector
    |--------------------------------------------------------------------------
    */

    const {dashboard, loading, error} = useSelector((state: RootState) => state.dashboard)

    /*
    |--------------------------------------------------------------------------
    | Fetch Dashboard
    |--------------------------------------------------------------------------
    |
    | Triggers fetching the main tenant dashboard data.
    |
    */

    const fetchDashboard = (callback?: (data: any) => void) => {
        dispatch(fetchDashboardAction(callback))
    }

    /*
    |--------------------------------------------------------------------------
    | Hook Return
    |--------------------------------------------------------------------------
    */

    return {dashboard, loading, error, fetchDashboard}
}