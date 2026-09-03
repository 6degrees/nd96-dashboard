import {api as curdApi} from '@/redux/invitation'

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
    show: curdApi.show,
    create: curdApi.create,
    accept: curdApi.accept,
    update: curdApi.update,
    status: curdApi.status,
    delete: curdApi.delete,
}