import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Users Actions
|--------------------------------------------------------------------------
*/
export const actions = {
    ...createActions('users'),

    /*
    |--------------------------------------------------------------------------
    | Get Options
    |--------------------------------------------------------------------------
    */
    GET_ROLES_BEGIN: 'users/GET_ROLES_BEGIN',
    GET_ROLES_SUCCESS: 'users/GET_ROLES_SUCCESS',
    GET_ROLES_ERR: 'users/GET_ROLES_ERR',
}