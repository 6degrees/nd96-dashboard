import {actions} from './actions'

/*
|--------------------------------------------------------------------------
| Messages Action Creators
|--------------------------------------------------------------------------
*/
const createActionCreators = () => {
    /*
    |--------------------------------------------------------------------------
    | Realtime Message Created
    |--------------------------------------------------------------------------
    |
    | Creates an action for a newly created Message received through
    | the realtime channel.
    |
    */
    const realtimeMessageCreated = (Message: any) => {
        return {
            type: actions.REALTIME_MESSAGE_CREATED,
            data: Message,
        }
    }

    return {
        realtimeMessageCreated,
    }
}

export default createActionCreators