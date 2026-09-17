import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { sendCommandAction } from '@/redux/command/actionCreator'
import { toast } from '@/lib/toast/toast'

/*
|--------------------------------------------------------------------------
| useCommand Hook
|--------------------------------------------------------------------------
|
| Encapsulates all screen command logic including:
| - Dispatching screen commands
| - Showing success notifications
| - Showing error notifications
| - Providing loading & error states
|
*/

export const useCommand = () => {
    const dispatch = useDispatch<any>()
    const { t } = useTranslation()

    const { loading, error } = useSelector(
        (state: any) => state.command
    )

    /*
    |--------------------------------------------------------------------------
    | handleCommand
    |--------------------------------------------------------------------------
    |
    | Sends a command to the selected screen and displays a notification
    | based on the request result.
    |
    */
    const handleCommand = (
        screen: string,
        command: string
    ) => {
        dispatch(
            sendCommandAction(
                screen,
                command,
                () => {
                    toast.success({
                        message: t('command.success.title'),
                        description: t('command.success.description'),
                    })
                },
                (error: any) => {
                    toast.error({
                        message: t('command.error.title'),
                        description: error?.message || t('command.error.description'),
                    })
                }
            )
        )
    }

    return {
        handleCommand,
        loading,
        error,
    }
}