/*
|--------------------------------------------------------------------------
| Dashboard Actions (Redux Action Types & Creators)
|--------------------------------------------------------------------------
|
| This file defines all dashboard-related Redux action types and
| their corresponding action creators for tenant and branch metrics.
|
*/

const actions = {

    /*
    |--------------------------------------------------------------------------
    | Action Types
    |--------------------------------------------------------------------------
    */

    FETCH_TENANT_DASHBOARD_BEGIN: 'FETCH_TENANT_DASHBOARD_BEGIN',
    FETCH_TENANT_DASHBOARD_SUCCESS: 'FETCH_TENANT_DASHBOARD_SUCCESS',
    FETCH_TENANT_DASHBOARD_ERR: 'FETCH_TENANT_DASHBOARD_ERR',

    FETCH_TENANT_ORDERS_BEGIN: 'FETCH_TENANT_ORDERS_BEGIN',
    FETCH_TENANT_ORDERS_SUCCESS: 'FETCH_TENANT_ORDERS_SUCCESS',
    FETCH_TENANT_ORDERS_ERR: 'FETCH_TENANT_ORDERS_ERR',

    FETCH_TOP_SALES_BRANCHES_BEGIN: 'FETCH_TOP_SALES_BRANCHES_BEGIN',
    FETCH_TOP_SALES_BRANCHES_SUCCESS: 'FETCH_TOP_SALES_BRANCHES_SUCCESS',
    FETCH_TOP_SALES_BRANCHES_ERR: 'FETCH_TOP_SALES_BRANCHES_ERR',

    FETCH_BRANCH_DASHBOARD_STATISTICS_BEGIN:
        'FETCH_BRANCH_DASHBOARD_STATISTICS_BEGIN',

    FETCH_BRANCH_DASHBOARD_STATISTICS_SUCCESS:
        'FETCH_BRANCH_DASHBOARD_STATISTICS_SUCCESS',

    FETCH_BRANCH_DASHBOARD_STATISTICS_ERR:
        'FETCH_BRANCH_DASHBOARD_STATISTICS_ERR',

    FETCH_BRANCH_RATINGS_BEGIN: 'FETCH_BRANCH_RATINGS_BEGIN',
    FETCH_BRANCH_RATINGS_SUCCESS: 'FETCH_BRANCH_RATINGS_SUCCESS',
    FETCH_BRANCH_RATINGS_ERR: 'FETCH_BRANCH_RATINGS_ERR',

    FETCH_RATING_SENTIMENT_BEGIN: 'FETCH_RATING_SENTIMENT_BEGIN',
    FETCH_RATING_SENTIMENT_SUCCESS: 'FETCH_RATING_SENTIMENT_SUCCESS',
    FETCH_RATING_SENTIMENT_ERR: 'FETCH_RATING_SENTIMENT_ERR',

    /*
    |--------------------------------------------------------------------------
    | Tenant Dashboard Actions
    |--------------------------------------------------------------------------
    */

    fetchTenantDashboardBegin: () => {
        return {
            type: actions.FETCH_TENANT_DASHBOARD_BEGIN,
        };
    },

    fetchTenantDashboardSuccess: (data: any) => {
        return {
            type: actions.FETCH_TENANT_DASHBOARD_SUCCESS,
            data,
        };
    },

    fetchTenantDashboardErr: (err: any) => {
        return {
            type: actions.FETCH_TENANT_DASHBOARD_ERR,
            err,
        };
    },

    /*
    |--------------------------------------------------------------------------
    | Tenant Orders Actions
    |--------------------------------------------------------------------------
    */

    fetchTenantOrdersBegin: () => {
        return {
            type: actions.FETCH_TENANT_ORDERS_BEGIN,
        };
    },

    fetchTenantOrdersSuccess: (data: any) => {
        return {
            type: actions.FETCH_TENANT_ORDERS_SUCCESS,
            data,
        };
    },

    fetchTenantOrdersErr: (err: any) => {
        return {
            type: actions.FETCH_TENANT_ORDERS_ERR,
            err,
        };
    },

    /*
    |--------------------------------------------------------------------------
    | Top Sales Branches Actions
    |--------------------------------------------------------------------------
    */

    fetchTopSalesBranchesBegin: () => {
        return {
            type: actions.FETCH_TOP_SALES_BRANCHES_BEGIN,
        };
    },

    fetchTopSalesBranchesSuccess: (data: any) => {
        return {
            type: actions.FETCH_TOP_SALES_BRANCHES_SUCCESS,
            data,
        };
    },

    fetchTopSalesBranchesErr: (err: any) => {
        return {
            type: actions.FETCH_TOP_SALES_BRANCHES_ERR,
            err,
        };
    },

    /*
    |--------------------------------------------------------------------------
    | Branch Dashboard Statistics Actions
    |--------------------------------------------------------------------------
    |
    | Actions used to manage branch dashboard statistics including:
    | - Total branches
    | - Branches requiring attention
    | - Total orders
    | - Attention branches
    | - Top-performing branches
    |
    */

    fetchBranchDashboardStatisticsBegin: () => {
        return {
            type: actions.FETCH_BRANCH_DASHBOARD_STATISTICS_BEGIN,
        };
    },

    fetchBranchDashboardStatisticsSuccess: (data: any) => {
        return {
            type: actions.FETCH_BRANCH_DASHBOARD_STATISTICS_SUCCESS,
            data,
        };
    },

    fetchBranchDashboardStatisticsErr: (err: any) => {
        return {
            type: actions.FETCH_BRANCH_DASHBOARD_STATISTICS_ERR,
            err,
        };
    },

    /*
    |--------------------------------------------------------------------------
    | Branch Ratings Actions
    |--------------------------------------------------------------------------
    */

    fetchBranchRatingsBegin: () => {
        return {
            type: actions.FETCH_BRANCH_RATINGS_BEGIN,
        };
    },

    fetchBranchRatingsSuccess: (data: any) => {
        return {
            type: actions.FETCH_BRANCH_RATINGS_SUCCESS,
            data,
        };
    },

    fetchBranchRatingsErr: (err: any) => {
        return {
            type: actions.FETCH_BRANCH_RATINGS_ERR,
            err,
        };
    },

    /*
    |--------------------------------------------------------------------------
    | Rating Sentiment Actions
    |--------------------------------------------------------------------------
    */

    fetchRatingSentimentBegin: () => {
        return {
            type: actions.FETCH_RATING_SENTIMENT_BEGIN,
        };
    },

    fetchRatingSentimentSuccess: (data: any) => {
        return {
            type: actions.FETCH_RATING_SENTIMENT_SUCCESS,
            data,
        };
    },

    fetchRatingSentimentErr: (err: any) => {
        return {
            type: actions.FETCH_RATING_SENTIMENT_ERR,
            err,
        };
    },

};

/*
|--------------------------------------------------------------------------
| Module Export
|--------------------------------------------------------------------------
*/

export default actions;