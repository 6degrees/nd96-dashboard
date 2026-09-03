import { actions } from './actions'

/*
|--------------------------------------------------------------------------
| Users Action Creators
|--------------------------------------------------------------------------
*/
const createActionCreators = () => {

    /*
    |--------------------------------------------------------------------------
    | Get Statuses
    |--------------------------------------------------------------------------
    */
    const getStatusesBegin = () => {
        return {
            type: actions.GET_STATUSES_BEGIN,
        }
    }

    const getStatusesSuccess = (data: any) => {
        return {
            type: actions.GET_STATUSES_SUCCESS,
            data,
        }
    }

    const getStatusesErr = (err: any) => {
        return {
            type: actions.GET_STATUSES_ERR,
            err,
        }
    }

    return {
        getStatusesBegin,
        getStatusesSuccess,
        getStatusesErr,
    }
}

export default createActionCreators