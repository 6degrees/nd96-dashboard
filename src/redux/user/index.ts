import { userService } from '@/services/user.service'
import { createCrudActions } from '@/redux/curd/actionCreator'
import { actions as BaseActions } from './actions'
import createActionCreators from './actionCreators'

/*
|--------------------------------------------------------------------------
| Users Action Creators
|--------------------------------------------------------------------------
*/
const {
    getRolesBegin,
    getRolesSuccess,
    getRolesErr,
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
    ...createCrudActions(actions, userService),

    getRoles: () => {
        return async (dispatch: any) => {
            dispatch(getRolesBegin())
            try {
                const data = await userService.getRoles()
                dispatch(getRolesSuccess(data))
                return data
            } catch (err: any) {
                dispatch(getRolesErr(err.response?.data))
            }
        }
    },
}