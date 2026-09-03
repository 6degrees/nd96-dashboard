import {customerService} from '@/services/customer.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Customer Actions
|--------------------------------------------------------------------------
*/
export const actions = createActions('customers')

/*
|--------------------------------------------------------------------------
| Customer API
|--------------------------------------------------------------------------
*/
export const api = createCrudActions(actions, customerService)