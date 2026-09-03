import { staffService } from '@/services/staff.service'
import { createCrudActions } from '@/redux/curd/actionCreator'
import { actions as BaseActions } from './actions'
import createActionCreators from './actionCreators'

/*
|--------------------------------------------------------------------------
| Staff Action Creators
|--------------------------------------------------------------------------
*/
const {
    getRolesBegin,
    getRolesSuccess,
    getRolesErr,
} = createActionCreators()

/*
|--------------------------------------------------------------------------
| Staff Action Creators
|--------------------------------------------------------------------------
*/
export const actions = BaseActions

/*
|--------------------------------------------------------------------------
| Staff Action Creators
|--------------------------------------------------------------------------
*/
export const api = {
    ...createCrudActions(actions, staffService),

    getRoles: () => {
        return async (dispatch: any) => {
            dispatch(getRolesBegin())
            try {
                const data = await staffService.getRoles()
                dispatch(getRolesSuccess(data))
                return data
            } catch (err: any) {
                dispatch(getRolesErr(err.response?.data))
            }
        }
    },
}