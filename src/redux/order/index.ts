import {orderService} from '@/services/order.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import {actions as BaseActions} from './actions'
import createActionCreators from './actionCreators'

/*
|--------------------------------------------------------------------------
| Users Action Creators
|--------------------------------------------------------------------------
*/
const {
    getStatusesBegin,
    getStatusesSuccess,
    getStatusesErr,
} = createActionCreators()

/*
|--------------------------------------------------------------------------
| Users Action Creators
|--------------------------------------------------------------------------
*/
export const actions = BaseActions

/*
|--------------------------------------------------------------------------
| Users Action Creators
|--------------------------------------------------------------------------
*/
export const api = {
    ...createCrudActions(actions, orderService),

    getStatuses: () => {
        return async (dispatch: any) => {
            dispatch(getStatusesBegin())
            try {
                const data = await orderService.getStatuses()
                dispatch(getStatusesSuccess(data))
                return data
            } catch (err: any) {
                dispatch(getStatusesErr(err.response?.data))
            }
        }
    },
}