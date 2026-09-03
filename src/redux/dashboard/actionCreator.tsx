import actions from './actions'
import {dashboardService} from '@/services/dashboard.service'

/*
|--------------------------------------------------------------------------
| Dashboard Action Creators
|--------------------------------------------------------------------------
*/

const {
    fetchTenantDashboardBegin,
    fetchTenantDashboardSuccess,
    fetchTenantDashboardErr,

    fetchTenantOrdersBegin,
    fetchTenantOrdersSuccess,
    fetchTenantOrdersErr,

    fetchTopSalesBranchesBegin,
    fetchTopSalesBranchesSuccess,
    fetchTopSalesBranchesErr,

    fetchBranchDashboardStatisticsBegin,
    fetchBranchDashboardStatisticsSuccess,
    fetchBranchDashboardStatisticsErr,

    fetchBranchRatingsBegin,
    fetchBranchRatingsSuccess,
    fetchBranchRatingsErr,

    fetchRatingSentimentBegin,
    fetchRatingSentimentSuccess,
    fetchRatingSentimentErr,
} = actions

/*
|--------------------------------------------------------------------------
| fetchTenantDashboardAction
|--------------------------------------------------------------------------
|
| Handles fetching aggregated statistics and queue metrics for a specific tenant.
|
*/

const fetchTenantDashboardAction = (callback?: (data: any) => void) => {
    return async (dispatch: any) => {
        dispatch(fetchTenantDashboardBegin())

        try {
            const data = await dashboardService.getTenantDashboard()

            dispatch(fetchTenantDashboardSuccess(data))

            if (callback) callback(data)
        } catch (err: any) {
            dispatch(fetchTenantDashboardErr(err.response?.data || err))
        }
    }
}

/*
|--------------------------------------------------------------------------
| fetchTenantOrdersAction
|--------------------------------------------------------------------------
|
| Handles fetching monthly order statistics for a specific tenant.
|
*/

const fetchTenantOrdersAction = (callback?: (data: any) => void) => {
    return async (dispatch: any) => {
        dispatch(fetchTenantOrdersBegin())

        try {
            const data = await dashboardService.getTenantOrders()

            dispatch(fetchTenantOrdersSuccess(data))

            if (callback) callback(data)
        } catch (err: any) {
            dispatch(fetchTenantOrdersErr(err.response?.data || err))
        }
    }
}

/*
|--------------------------------------------------------------------------
| fetchTopSalesBranchesAction
|--------------------------------------------------------------------------
|
| Handles fetching the top-performing branches based on total sales.
|
*/

const fetchTopSalesBranchesAction = (callback?: (data: any) => void) => {
    return async (dispatch: any) => {
        dispatch(fetchTopSalesBranchesBegin())

        try {
            const data = await dashboardService.getTopSalesBranches()

            dispatch(fetchTopSalesBranchesSuccess(data))

            if (callback) callback(data)
        } catch (err: any) {
            dispatch(fetchTopSalesBranchesErr(err.response?.data || err))
        }
    }
}

/*
|--------------------------------------------------------------------------
| fetchBranchDashboardStatisticsAction
|--------------------------------------------------------------------------
|
| Handles fetching branch dashboard statistics including:
| - Total branches
| - Branches requiring attention
| - Total orders
| - Attention branches
| - Top-performing branches
|
*/

const fetchBranchDashboardStatisticsAction = (
    callback?: (data: any) => void
) => {
    return async (dispatch: any) => {
        dispatch(fetchBranchDashboardStatisticsBegin())

        try {
            const data =
                await dashboardService.getBranchDashboardStatistics()

            dispatch(
                fetchBranchDashboardStatisticsSuccess(data)
            )

            if (callback) callback(data)
        } catch (err: any) {
            dispatch(
                fetchBranchDashboardStatisticsErr(
                    err.response?.data || err
                )
            )
        }
    }
}

/*
|--------------------------------------------------------------------------
| fetchBranchRatingsAction
|--------------------------------------------------------------------------
|
| Handles fetching the average customer rating for each branch.
|
*/

const fetchBranchRatingsAction = (callback?: (data: any) => void) => {
    return async (dispatch: any) => {
        dispatch(fetchBranchRatingsBegin())

        try {
            const data = await dashboardService.getBranchRatings()

            dispatch(fetchBranchRatingsSuccess(data))

            if (callback) callback(data)
        } catch (err: any) {
            dispatch(fetchBranchRatingsErr(err.response?.data || err))
        }
    }
}

/*
|--------------------------------------------------------------------------
| fetchRatingSentimentAction
|--------------------------------------------------------------------------
|
| Handles fetching positive, neutral, and negative rating statistics.
|
*/

const fetchRatingSentimentAction = (callback?: (data: any) => void) => {
    return async (dispatch: any) => {
        dispatch(fetchRatingSentimentBegin())

        try {
            const data = await dashboardService.getRatingSentiment()

            dispatch(fetchRatingSentimentSuccess(data))

            if (callback) callback(data)
        } catch (err: any) {
            dispatch(fetchRatingSentimentErr(err.response?.data || err))
        }
    }
}

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/

export {
    fetchTenantDashboardAction,
    fetchTenantOrdersAction,
    fetchTopSalesBranchesAction,
    fetchBranchDashboardStatisticsAction,
    fetchBranchRatingsAction,
    fetchRatingSentimentAction,
}