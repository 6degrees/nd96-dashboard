import {ratingService} from '@/services/rating.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import createActions from '@/redux/curd/actions'

/*
|--------------------------------------------------------------------------
| Rating Actions
|--------------------------------------------------------------------------
*/
export const actions = createActions('ratings')

/*
|--------------------------------------------------------------------------
| Rating API
|--------------------------------------------------------------------------
*/
/*
|--------------------------------------------------------------------------
| Quality API
|--------------------------------------------------------------------------
|
| Defines CRUD API actions for managing quality standards.
|
*/
export const api = createCrudActions(actions, ratingService)