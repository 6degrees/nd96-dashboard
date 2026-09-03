import {branchService} from '@/services/branch.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Branch Actions
|--------------------------------------------------------------------------
*/
export const actions = createActions('branches')

/*
|--------------------------------------------------------------------------
| Branch API
|--------------------------------------------------------------------------
*/
export const api = createCrudActions(actions, branchService)