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

    FETCH_DASHBOARD_BEGIN: 'FETCH_DASHBOARD_BEGIN',
    FETCH_DASHBOARD_SUCCESS: 'FETCH_DASHBOARD_SUCCESS',
    FETCH_DASHBOARD_ERR: 'FETCH_DASHBOARD_ERR',

    /*
    |--------------------------------------------------------------------------
    |  Dashboard Actions
    |--------------------------------------------------------------------------
    */

    fetchDashboardBegin: () => {
        return {
            type: actions.FETCH_DASHBOARD_BEGIN,
        };
    },

    fetchDashboardSuccess: (data: any) => {
        return {
            type: actions.FETCH_DASHBOARD_SUCCESS,
            data,
        };
    },

    fetchDashboardErr: (err: any) => {
        return {
            type: actions.FETCH_DASHBOARD_ERR,
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