import { Tenant, TenantFilters } from '@/features/tenants'
import { createCrudService } from '@/services/createCrudService'

export const tenantService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Tenant, TenantFilters>('/api/v1/tenants/{{tenant}}'),
}