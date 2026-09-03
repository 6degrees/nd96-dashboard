import { Quality, QualityFilters } from '@/features/qualities'
import { createCrudService } from '@/services/createCrudService'

export const qualityService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Quality, QualityFilters>('/api/v1/tenants/{{tenant}}/qualities/'),
}