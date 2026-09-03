import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Notification Actions
|--------------------------------------------------------------------------
*/
export const actions = {
    ...createActions('notifications'),

    /*
    |--------------------------------------------------------------------------
    | Mark As Read Actions
    |--------------------------------------------------------------------------
    */
    MARK_AS_READ_BEGIN: 'notifications/MARK_AS_READ_BEGIN',
    MARK_AS_READ_SUCCESS: 'notifications/MARK_AS_READ_SUCCESS',
    MARK_AS_READ_ERR: 'notifications/MARK_AS_READ_ERR',
}