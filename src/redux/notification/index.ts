import {notificationService} from '@/services/notification.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import {actions as BaseActions} from './actions'
import createActionCreators from "@/redux/notification/actionCreators";

/*
|--------------------------------------------------------------------------
| Users Action Creators
|--------------------------------------------------------------------------
*/
const {
    markAsReadBegin,
    markAsReadSuccess,
    markAsReadErr,
} = createActionCreators()

/*
|--------------------------------------------------------------------------
| Notifications Actions
|--------------------------------------------------------------------------
*/
export const actions = BaseActions


/*
|--------------------------------------------------------------------------
| Invitations API Thunks
|--------------------------------------------------------------------------
*/
export const api = {
    ...createCrudActions(actions, notificationService),

    /*
    |--------------------------------------------------------------------------
    | Mark Notification as Read
    |--------------------------------------------------------------------------
    */
    markAsRead: (callback?: any) => {
        return async (dispatch: any) => {
            dispatch(markAsReadBegin())
            try {
                const data = await notificationService.markAsRead()
                if (callback) callback()
                dispatch(markAsReadSuccess(data))
            } catch (err: any) {
                dispatch(markAsReadErr(err.response?.data))
            }
        }
    },
}