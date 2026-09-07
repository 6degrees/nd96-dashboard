import actions from './actions'
import {UnknownAction} from "redux"

/*
|--------------------------------------------------------------------------
| dashboard Reducer
|--------------------------------------------------------------------------
*/

const {
    FETCH_DASHBOARD_BEGIN,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_ERR,
} = actions

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initState = {
    dashboard: null,
    loading: false,
    error: null,
}

/*
|--------------------------------------------------------------------------
| DashboardReducer
|--------------------------------------------------------------------------
*/

const DashboardReducer = (state = initState, action: UnknownAction) => {
    const {type} = action

    const data = (action as any).data
    const err = (action as any).err

    switch (type) {

        /*
        |--------------------------------------------------------------------------
        | Tenant dashboard Fetch Flow
        |--------------------------------------------------------------------------
        */

        case FETCH_DASHBOARD_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                dashboard: data,
                loading: false,
                error: null,
            }

        case FETCH_DASHBOARD_ERR:
            return {
                ...state,
                dashboard: null,
                loading: false,
                error: err,
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