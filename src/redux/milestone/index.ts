import {milestoneService} from '@/services/milestone.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Milestones Actions
|--------------------------------------------------------------------------
|
| Defines Redux actions for managing milestones standards.
|
*/
export const actions = createActions('milestones')

/*
|--------------------------------------------------------------------------
| Milestones API
|--------------------------------------------------------------------------
|
| Defines CRUD API actions for managing milestones standards.
|
*/
export const api = createCrudActions(actions, milestoneService)