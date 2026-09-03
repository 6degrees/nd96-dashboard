import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Users Actions
|--------------------------------------------------------------------------
*/
export const actions = {
    ...createActions('orders'),

    /*
    |--------------------------------------------------------------------------
    | Get Options
    |--------------------------------------------------------------------------
    */
    GET_STATUSES_BEGIN: 'users/GET_STATUSES_BEGIN',
    GET_STATUSES_SUCCESS: 'users/GET_STATUSES_SUCCESS',
    GET_STATUSES_ERR: 'users/GET_STATUSES_ERR',
}