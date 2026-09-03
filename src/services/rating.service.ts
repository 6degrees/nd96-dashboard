import { Order, OrderFilters } from '@/features/orders'
import { createCrudService } from '@/services/createCrudService'

export const ratingService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Order, OrderFilters>('/api/v1/tenants/{{tenant}}/ratings'),

}