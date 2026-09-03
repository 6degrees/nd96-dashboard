import {invitationService} from '@/services/invitation.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from "@/redux/curd/actions";

/*
|--------------------------------------------------------------------------
| Invitation Actions
|--------------------------------------------------------------------------
*/
export const actions = createActions('invitations')

/*
|--------------------------------------------------------------------------
| Invitations API Thunks
|--------------------------------------------------------------------------
*/
export const api = {
    ...createCrudActions(actions, invitationService),

    createBranchStaff: (payload: any, callback?: any) => {
        return async (dispatch: any) => {
            dispatch(actions.createItemBegin())
            try {
                const data = await invitationService.createBranchStaff(payload)
                if (callback) callback()
                dispatch(actions.createItemSuccess(data))
            } catch (err: any) {
                dispatch(actions.createItemErr(err.response?.data))
            }
        }
    },

    show: (token: string) => {
        return async (dispatch: any) => {
            dispatch(actions.getItemsBegin())
            try {
                const data = await invitationService.show(token)
                dispatch(actions.getItemsSuccess(data))
                return data
            } catch (err: any) {
                dispatch(actions.getItemsErr(err.response?.data))
                throw err
            }
        }
    },

    accept: (payload: { token: string; name?: string; password?: string; password_confirmation?: string }) => {
        return async (dispatch: any) => {
            dispatch(actions.createItemBegin())
            try {
                const data = await invitationService.accept(payload)
                dispatch(actions.createItemSuccess(data))
                return data
            } catch (err: any) {
                dispatch(actions.createItemErr(err.response?.data))
                throw err
            }
        }
    },
}