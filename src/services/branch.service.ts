import { Branch, BranchFilters } from '@/features/branches'
import { createCrudService } from '@/services/createCrudService'

export const branchService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Branch, BranchFilters>('/api/v1/tenants/{{tenant}}/branches/'),
}