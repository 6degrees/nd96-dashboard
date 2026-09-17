import actions from './actions'
import {commandService} from '@/services/command.service'

/*
|--------------------------------------------------------------------------
| Command Action Creators
|--------------------------------------------------------------------------
|
| Handles actions related to sending commands to remote screens.
|
*/

const {
    sendCommandBegin,
    sendCommandSuccess,
    sendCommandErr,
} = actions

/*
|--------------------------------------------------------------------------
| sendCommandAction
|--------------------------------------------------------------------------
|
| Sends a command to a specific remote screen.
| - Dispatches sendCommandBegin before the request.
| - Dispatches sendCommandSuccess on success.
| - Dispatches sendCommandErr on failure.
| - Executes the callback after a successful request.
|
*/

const sendCommandAction = (
    screen: string,
    command: string,
    success?: (data: any) => void,
    error?: () => void
) => {
    return async (dispatch: any) => {
        dispatch(sendCommandBegin())

        try {
            const data = await commandService.send({
                screen,
                command,
            })

            dispatch(sendCommandSuccess(data))

            if (success) success(data)
        } catch (err: any) {
            dispatch(sendCommandErr(err.response?.data))
            if (error) error()
        }
    }
}

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/

export {sendCommandAction}