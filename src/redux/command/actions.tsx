/*
|--------------------------------------------------------------------------
| Command Actions (Redux Action Types & Creators)
|--------------------------------------------------------------------------
|
| This file defines all command-related Redux action types and
| their corresponding action creators for sending commands to screens.
|
| It is used to manage command state transitions such as:
| - Begin request
| - Success response
| - Error handling
|
*/

const actions = {

    /*
    |--------------------------------------------------------------------------
    | Action Types
    |--------------------------------------------------------------------------
    |
    | Constants used as Redux action type identifiers.
    |
    */

    SEND_COMMAND_BEGIN: 'SEND_COMMAND_BEGIN',
    SEND_COMMAND_SUCCESS: 'SEND_COMMAND_SUCCESS',
    SEND_COMMAND_ERR: 'SEND_COMMAND_ERR',

    /*
    |--------------------------------------------------------------------------
    | Send Command Actions
    |--------------------------------------------------------------------------
    |
    | Action creators used to manage the screen command request lifecycle.
    |
    */

    sendCommandBegin: () => {
        return {
            type: actions.SEND_COMMAND_BEGIN,
        }
    },

    sendCommandSuccess: (data: any) => {
        return {
            type: actions.SEND_COMMAND_SUCCESS,
            data,
        }
    },

    sendCommandErr: (err: any) => {
        return {
            type: actions.SEND_COMMAND_ERR,
            err,
        }
    },
}

/*
|--------------------------------------------------------------------------
| Module Export
|--------------------------------------------------------------------------
|
| Exports all command actions for use in Redux store and thunks.
|
*/

export default actions;