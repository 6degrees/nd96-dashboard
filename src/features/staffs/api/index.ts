import {api as staffApi} from '@/redux/staff'
import {api as invitationApi} from '@/redux/invitation'

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
    fetch: staffApi.fetch,
    detail: staffApi.detail,
    create: invitationApi.createBranchStaff,
    update: staffApi.update,
    status: staffApi.status,
    delete: staffApi.delete,
    roles: staffApi.getRoles,
}