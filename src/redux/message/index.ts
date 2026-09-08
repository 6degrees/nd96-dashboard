import {messageService} from '@/services/message.service'
import {createCrudActions} from '@/redux/curd/actionCreator'
import {actions as BaseActions} from './actions'
import createActionCreators from './actionCreators'

/*
|--------------------------------------------------------------------------
| Messages Action Creators
|--------------------------------------------------------------------------
*/
const {
    realtimeMessageCreated,
} = createActionCreators()

/*
|--------------------------------------------------------------------------
| Messages Actions
|--------------------------------------------------------------------------
*/
export const actions = BaseActions

/*
|--------------------------------------------------------------------------
| Messages Realtime Actions
|--------------------------------------------------------------------------
|
| Redux actions used by realtime events.
|
*/
export const realtimeActions = {
    realtimeMessageCreated,
}

/*
|--------------------------------------------------------------------------
| Messages API Actions
|--------------------------------------------------------------------------
*/
export const api = {
    ...createCrudActions(actions, messageService),
}