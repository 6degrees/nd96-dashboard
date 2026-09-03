import {qualityService} from '@/services/quality.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Quality Actions
|--------------------------------------------------------------------------
|
| Defines Redux actions for managing quality standards.
|
*/
export const actions = createActions('qualities')

/*
|--------------------------------------------------------------------------
| Quality API
|--------------------------------------------------------------------------
|
| Defines CRUD API actions for managing quality standards.
|
*/
export const api = createCrudActions(actions, qualityService)