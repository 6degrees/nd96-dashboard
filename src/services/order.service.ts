import { Order, OrderFilters } from '@/features/orders'
import { createCrudService } from '@/services/createCrudService'
import {httpClient} from "@/services/http";

export const orderService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Order, OrderFilters>('/api/v1/tenants/{{tenant}}/orders/'),

    /*
    |--------------------------------------------------------------------------
    | Get Statuses
    |--------------------------------------------------------------------------
    */
    async getStatuses() {
        const res = await httpClient.get<any[]>('/api/v1/orders/statuses/', {  })
        return res.data
    },
}