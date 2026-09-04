import {userService} from '@/services/user.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| User Actions
|--------------------------------------------------------------------------
*/
export const actions = createActions('users')

/*
|--------------------------------------------------------------------------
| User API
|--------------------------------------------------------------------------
*/
export const api = createCrudActions(actions, userService)