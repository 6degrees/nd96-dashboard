import { Staff, StaffFilters } from '@/features/staffs'
import { createCrudService } from '@/services/createCrudService'
import { httpClient } from '@/services/http'

export const staffService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Staff, StaffFilters>('/api/v1/tenants/{{tenant}}/branches/{{branch}}/users/'),

    /*
    |--------------------------------------------------------------------------
    | Get Roles
    |--------------------------------------------------------------------------
    */
    async getRoles() {
        const res = await httpClient.get<any[]>('/api/v1/tenants/{{tenant}}/branches/roles/', {  })
        return res.data
    },
}