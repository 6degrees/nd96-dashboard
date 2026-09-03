import {api as curdApi} from '@/redux/order'

/*
|--------------------------------------------------------------------------
| API Actions Map
|--------------------------------------------------------------------------
|
| Centralized object for grouping API action handlers.
| Used to expose and organize service calls in a consistent structure.
|
*/

export const api = {
    fetch: curdApi.fetch,
    detail: curdApi.detail,
    create: curdApi.create,
    update: curdApi.update,
    status: curdApi.getStatuses,
    delete: curdApi.delete,
}