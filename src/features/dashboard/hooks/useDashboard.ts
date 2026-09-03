import {useDispatch, useSelector} from 'react-redux'
import {
    fetchTenantDashboardAction,
    fetchTenantOrdersAction,
    fetchTopSalesBranchesAction,
    fetchBranchDashboardStatisticsAction,
    fetchBranchRatingsAction,
    fetchRatingSentimentAction,
} from '@/redux/dashboard/actionCreator'
import {RootState} from '@/redux/store'

/*
|--------------------------------------------------------------------------
| useTenantDashboard Hook
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

export const useTenantDashboard = () => {
    const dispatch = useDispatch<any>()

    /*
    |--------------------------------------------------------------------------
    | Redux State Selector
    |--------------------------------------------------------------------------
    */

    const {
        tenantDashboard,
        tenantOrders,
        topSalesBranches,
        branchDashboardStatistics,
        branchRatings,
        ratingSentiment,

        loading,
        ordersLoading,
        topSalesBranchesLoading,
        branchDashboardStatisticsLoading,
        branchRatingsLoading,
        ratingSentimentLoading,

        error,
        ordersError,
        topSalesBranchesError,
        branchDashboardStatisticsError,
        branchRatingsError,
        ratingSentimentError,
    } = useSelector((state: RootState) => state.dashboard)

    /*
    |--------------------------------------------------------------------------
    | Fetch Dashboard
    |--------------------------------------------------------------------------
    |
    | Triggers fetching the main tenant dashboard data.
    |
    */

    const fetchDashboard = (callback?: (data: any) => void) => {
        dispatch(fetchTenantDashboardAction(callback))
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch Monthly Orders
    |--------------------------------------------------------------------------
    |
    | Triggers fetching monthly order statistics for the tenant.
    |
    */

    const fetchOrders = (callback?: (data: any) => void) => {
        dispatch(fetchTenantOrdersAction(callback))
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch Top Sales Branches
    |--------------------------------------------------------------------------
    |
    | Triggers fetching the top-performing branches based on total sales.
    |
    */

    const fetchTopSalesBranches = (callback?: (data: any) => void) => {
        dispatch(fetchTopSalesBranchesAction(callback))
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch Branch Dashboard Statistics
    |--------------------------------------------------------------------------
    |
    | Triggers fetching branch dashboard statistics including:
    | - Total branches
    | - Branches requiring attention
    | - Total orders
    | - Attention branches
    | - Top-performing branches
    |
    */

    const fetchBranchDashboardStatistics = (
        callback?: (data: any) => void
    ) => {
        dispatch(
            fetchBranchDashboardStatisticsAction(callback)
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch Branch Ratings
    |--------------------------------------------------------------------------
    |
    | Triggers fetching the average customer rating for each branch.
    |
    */

    const fetchBranchRatings = (callback?: (data: any) => void) => {
        dispatch(fetchBranchRatingsAction(callback))
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch Rating Sentiment
    |--------------------------------------------------------------------------
    |
    | Triggers fetching positive, neutral, and negative rating statistics.
    |
    */

    const fetchRatingSentiment = (callback?: (data: any) => void) => {
        dispatch(fetchRatingSentimentAction(callback))
    }

    /*
    |--------------------------------------------------------------------------
    | Hook Return
    |--------------------------------------------------------------------------
    */

    return {
        /*
        | Dashboard Data
        */

        tenantDashboard,
        tenantOrders,
        topSalesBranches,
        branchDashboardStatistics,
        branchRatings,
        ratingSentiment,

        /*
        | Loading States
        */

        loading,
        ordersLoading,
        topSalesBranchesLoading,
        branchDashboardStatisticsLoading,
        branchRatingsLoading,
        ratingSentimentLoading,

        /*
        | Error States
        */

        error,
        ordersError,
        topSalesBranchesError,
        branchDashboardStatisticsError,
        branchRatingsError,
        ratingSentimentError,

        /*
        | Fetch Actions
        */

        fetchDashboard,
        fetchOrders,
        fetchTopSalesBranches,
        fetchBranchDashboardStatistics,
        fetchBranchRatings,
        fetchRatingSentiment,
    }
}