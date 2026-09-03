import actions from './actions'
import {UnknownAction} from "redux"

/*
|--------------------------------------------------------------------------
| Dashboard Reducer
|--------------------------------------------------------------------------
*/

const {
    FETCH_TENANT_DASHBOARD_BEGIN,
    FETCH_TENANT_DASHBOARD_SUCCESS,
    FETCH_TENANT_DASHBOARD_ERR,

    FETCH_TENANT_ORDERS_BEGIN,
    FETCH_TENANT_ORDERS_SUCCESS,
    FETCH_TENANT_ORDERS_ERR,

    FETCH_TOP_SALES_BRANCHES_BEGIN,
    FETCH_TOP_SALES_BRANCHES_SUCCESS,
    FETCH_TOP_SALES_BRANCHES_ERR,

    FETCH_BRANCH_DASHBOARD_STATISTICS_BEGIN,
    FETCH_BRANCH_DASHBOARD_STATISTICS_SUCCESS,
    FETCH_BRANCH_DASHBOARD_STATISTICS_ERR,

    FETCH_BRANCH_RATINGS_BEGIN,
    FETCH_BRANCH_RATINGS_SUCCESS,
    FETCH_BRANCH_RATINGS_ERR,

    FETCH_RATING_SENTIMENT_BEGIN,
    FETCH_RATING_SENTIMENT_SUCCESS,
    FETCH_RATING_SENTIMENT_ERR,
} = actions

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initState = {
    tenantDashboard: null,
    tenantOrders: null,
    topSalesBranches: null,

    branchDashboardStatistics: null,

    branchRatings: null,
    ratingSentiment: null,

    loading: false,
    ordersLoading: false,
    topSalesBranchesLoading: false,
    branchDashboardStatisticsLoading: false,
    branchRatingsLoading: false,
    ratingSentimentLoading: false,

    error: null,
    ordersError: null,
    topSalesBranchesError: null,
    branchDashboardStatisticsError: null,
    branchRatingsError: null,
    ratingSentimentError: null,
}

/*
|--------------------------------------------------------------------------
| DashboardReducer
|--------------------------------------------------------------------------
*/

const DashboardReducer = (
    state = initState,
    action: UnknownAction
) => {
    const {type} = action

    const data = (action as any).data
    const err = (action as any).err

    switch (type) {

        /*
        |--------------------------------------------------------------------------
        | Tenant Dashboard Fetch Flow
        |--------------------------------------------------------------------------
        */

        case FETCH_TENANT_DASHBOARD_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case FETCH_TENANT_DASHBOARD_SUCCESS:
            return {
                ...state,
                tenantDashboard: data,
                loading: false,
                error: null,
            }

        case FETCH_TENANT_DASHBOARD_ERR:
            return {
                ...state,
                tenantDashboard: null,
                loading: false,
                error: err,
            }

        /*
        |--------------------------------------------------------------------------
        | Tenant Orders Fetch Flow
        |--------------------------------------------------------------------------
        |
        | Handles monthly order statistics for the tenant.
        |
        */

        case FETCH_TENANT_ORDERS_BEGIN:
            return {
                ...state,
                ordersLoading: true,
                ordersError: null,
            }

        case FETCH_TENANT_ORDERS_SUCCESS:
            return {
                ...state,
                tenantOrders: data,
                ordersLoading: false,
                ordersError: null,
            }

        case FETCH_TENANT_ORDERS_ERR:
            return {
                ...state,
                tenantOrders: null,
                ordersLoading: false,
                ordersError: err,
            }

        /*
        |--------------------------------------------------------------------------
        | Top Sales Branches Fetch Flow
        |--------------------------------------------------------------------------
        |
        | Handles top-performing branches based on total sales.
        |
        */

        case FETCH_TOP_SALES_BRANCHES_BEGIN:
            return {
                ...state,
                topSalesBranchesLoading: true,
                topSalesBranchesError: null,
            }

        case FETCH_TOP_SALES_BRANCHES_SUCCESS:
            return {
                ...state,
                topSalesBranches: data,
                topSalesBranchesLoading: false,
                topSalesBranchesError: null,
            }

        case FETCH_TOP_SALES_BRANCHES_ERR:
            return {
                ...state,
                topSalesBranches: null,
                topSalesBranchesLoading: false,
                topSalesBranchesError: err,
            }

        /*
        |--------------------------------------------------------------------------
        | Branch Dashboard Statistics Fetch Flow
        |--------------------------------------------------------------------------
        |
        | Handles branch dashboard statistics including:
        | - Total branches
        | - Branches requiring attention
        | - Total orders
        | - Attention branches
        | - Top-performing branches
        |
        */

        case FETCH_BRANCH_DASHBOARD_STATISTICS_BEGIN:
            return {
                ...state,
                branchDashboardStatisticsLoading: true,
                branchDashboardStatisticsError: null,
            }

        case FETCH_BRANCH_DASHBOARD_STATISTICS_SUCCESS:
            return {
                ...state,
                branchDashboardStatistics: data,
                branchDashboardStatisticsLoading: false,
                branchDashboardStatisticsError: null,
            }

        case FETCH_BRANCH_DASHBOARD_STATISTICS_ERR:
            return {
                ...state,
                branchDashboardStatistics: null,
                branchDashboardStatisticsLoading: false,
                branchDashboardStatisticsError: err,
            }

        /*
        |--------------------------------------------------------------------------
        | Branch Ratings Fetch Flow
        |--------------------------------------------------------------------------
        |
        | Handles average customer ratings for each branch.
        |
        */

        case FETCH_BRANCH_RATINGS_BEGIN:
            return {
                ...state,
                branchRatingsLoading: true,
                branchRatingsError: null,
            }

        case FETCH_BRANCH_RATINGS_SUCCESS:
            return {
                ...state,
                branchRatings: data,
                branchRatingsLoading: false,
                branchRatingsError: null,
            }

        case FETCH_BRANCH_RATINGS_ERR:
            return {
                ...state,
                branchRatings: null,
                branchRatingsLoading: false,
                branchRatingsError: err,
            }

        /*
        |--------------------------------------------------------------------------
        | Rating Sentiment Fetch Flow
        |--------------------------------------------------------------------------
        |
        | Handles positive, neutral, and negative rating statistics.
        |
        */

        case FETCH_RATING_SENTIMENT_BEGIN:
            return {
                ...state,
                ratingSentimentLoading: true,
                ratingSentimentError: null,
            }

        case FETCH_RATING_SENTIMENT_SUCCESS:
            return {
                ...state,
                ratingSentiment: data,
                ratingSentimentLoading: false,
                ratingSentimentError: null,
            }

        case FETCH_RATING_SENTIMENT_ERR:
            return {
                ...state,
                ratingSentiment: null,
                ratingSentimentLoading: false,
                ratingSentimentError: err,
            }

        default:
            return state
    }
}

/*
|--------------------------------------------------------------------------
| Module Export
|--------------------------------------------------------------------------
|
| Exports the dashboard reducer as the default reducer.
|
*/

export default DashboardReducer