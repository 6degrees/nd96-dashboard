import { Customer, CustomerFilters } from '@/features/customers'
import { createCrudService } from '@/services/createCrudService'

export const customerService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Customer, CustomerFilters>('/api/v1/tenants/{{tenant}}/customers/'),
}