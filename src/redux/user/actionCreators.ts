import { actions } from './actions'

/*
|--------------------------------------------------------------------------
| Users Action Creators
|--------------------------------------------------------------------------
*/
const createActionCreators = () => {

    /*
    |--------------------------------------------------------------------------
    | Get Roles
    |--------------------------------------------------------------------------
    */
    const getRolesBegin = () => {
        return {
            type: actions.GET_ROLES_BEGIN,
        }
    }

    const getRolesSuccess = (data: any) => {
        return {
            type: actions.GET_ROLES_SUCCESS,
            data,
        }
    }

    const getRolesErr = (err: any) => {
        return {
            type: actions.GET_ROLES_ERR,
            err,
        }
    }

    return {
        getRolesBegin,
        getRolesSuccess,
        getRolesErr,
    }
}

export default createActionCreators