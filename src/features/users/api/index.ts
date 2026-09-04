import {api as userApi} from '@/redux/user'

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
    fetch: userApi.fetch,
    detail: userApi.detail,
    create: userApi.create,
    update: userApi.update,
    status: userApi.status,
    delete: userApi.delete,
    roles: userApi.getRoles,
}