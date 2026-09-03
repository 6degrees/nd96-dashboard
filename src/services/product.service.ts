import { Product, ProductFilters } from '@/features/products'
import { createCrudService } from '@/services/createCrudService'

export const productService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Product, ProductFilters>('/api/v1/tenants/{{tenant}}/products/'),
}