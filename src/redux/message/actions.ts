import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Messages Actions
|--------------------------------------------------------------------------
*/
export const actions = {
    ...createActions('messages'),

    /*
    |--------------------------------------------------------------------------
    | Realtime Message Created
    |--------------------------------------------------------------------------
    |
    | Stores a newly created message received through the realtime channel.
    |
    */
    REALTIME_MESSAGE_CREATED: 'messages/REALTIME_MESSAGE_CREATED',
}