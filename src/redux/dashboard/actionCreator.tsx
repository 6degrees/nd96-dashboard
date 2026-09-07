import actions from './actions'
import {dashboardService} from '@/services/dashboard.service'

/*
|--------------------------------------------------------------------------
| Dashboard Action Creators
|--------------------------------------------------------------------------
*/

const {
    fetchDashboardBegin,
    fetchDashboardSuccess,
    fetchDashboardErr,
} = actions

/*
|--------------------------------------------------------------------------
| fetchDashboardAction
|--------------------------------------------------------------------------
|
| Handles fetching aggregated statistics and queue metrics for a specific tenant.
|
*/

const fetchDashboardAction = (callback?: (data: any) => void) => {
    return async (dispatch: any) => {
        dispatch(fetchDashboardBegin())

        try {
            const data = await dashboardService.getDashboard()

            dispatch(fetchDashboardSuccess(data))

            if (callback) callback(data)
        } catch (err: any) {
            dispatch(fetchDashboardErr(err.response?.data || err))
        }
    }
}


/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/

export {
    fetchDashboardAction,
}