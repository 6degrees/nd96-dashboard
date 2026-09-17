import actions from './actions'
import { UnknownAction } from 'redux'

/*
|--------------------------------------------------------------------------
| Command Reducer
|--------------------------------------------------------------------------
|
| Handles the state transitions for sending commands to remote screens.
|
*/

const {
    SEND_COMMAND_BEGIN,
    SEND_COMMAND_SUCCESS,
    SEND_COMMAND_ERR,
} = actions

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initState = {
    loading: false,
    error: null,
    data: null,
}

/*
|--------------------------------------------------------------------------
| CommandReducer
|--------------------------------------------------------------------------
*/

const CommandReducer = (state = initState, action: UnknownAction) => {
    const { type } = action
    const data = (action as any).data
    const err = (action as any).err

    switch (type) {
        /*
        |--------------------------------------------------------------------------
        | Send Command Flow
        |--------------------------------------------------------------------------
        */

        case SEND_COMMAND_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case SEND_COMMAND_SUCCESS:
            return {
                ...state,
                data,
                loading: false,
                error: null,
            }

        case SEND_COMMAND_ERR:
            return {
                ...state,
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
| Exports the command reducer as the default reducer for the
| command feature.
|
*/

export default CommandReducer