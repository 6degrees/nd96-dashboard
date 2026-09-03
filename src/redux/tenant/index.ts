import {tenantService} from '@/services/tenant.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Tenant Actions
|--------------------------------------------------------------------------
*/
export const actions = createActions('tenants')

/*
|--------------------------------------------------------------------------
| Tenant API
|--------------------------------------------------------------------------
*/
export const api = createCrudActions(actions, tenantService)