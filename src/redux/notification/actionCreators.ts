import { actions } from './actions'

/*
|--------------------------------------------------------------------------
| Notification Action Creators
|--------------------------------------------------------------------------
*/
const createActionCreators = () => {

    /*
    |--------------------------------------------------------------------------
    | Mark As Read
    |--------------------------------------------------------------------------
    */
    const markAsReadBegin = () => {
        return {
            type: actions.MARK_AS_READ_BEGIN,
        }
    }

    const markAsReadSuccess = (data: any) => {
        return {
            type: actions.MARK_AS_READ_SUCCESS,
            data,
        }
    }

    const markAsReadErr = (err: any) => {
        return {
            type: actions.MARK_AS_READ_ERR,
            err,
        }
    }

    return {
        markAsReadBegin,
        markAsReadSuccess,
        markAsReadErr,
    }
}

export default createActionCreators