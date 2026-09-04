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
| Department API
|--------------------------------------------------------------------------
|
| Defines CRUD API actions for managing department standards.
|
*/
export const api = createCrudActions(actions, ratingService)