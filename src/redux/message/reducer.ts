import {createCrudReducer} from '@/redux/curd/createCrudReducer'
import {actions} from './actions'

/*
|--------------------------------------------------------------------------
| Base CRUD Reducer
|--------------------------------------------------------------------------
|
| Reuses the generic CRUD reducer for Messages.
|
*/
const crudReducer = createCrudReducer(actions)

/*
|--------------------------------------------------------------------------
| Order Reducer
|--------------------------------------------------------------------------
|
| Extends the generic CRUD state with Message statistics and
| realtime Message events.
|
*/
const MessageReducer = (
    state: any = {
        ...crudReducer(undefined, {
            type: '@@INIT',
            data: undefined,
            err: undefined,
        }),
        realtimeMessage: null,
    },
    action: any,
) => {

    switch (action.type) {

        /*
        |--------------------------------------------------------------------------
        | Realtime Order Created
        |--------------------------------------------------------------------------
        |
        | Stores the latest Message received through the realtime channel.
        |
        */
        case actions.REALTIME_MESSAGE_CREATED:
            return {
                ...state,
                realtimeMessage: action.data,
            }

        /*
        |--------------------------------------------------------------------------
        | CRUD Actions
        |--------------------------------------------------------------------------
        */
        default:
            return crudReducer(state, action)
    }
}

export default MessageReducer