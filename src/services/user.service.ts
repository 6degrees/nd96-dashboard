import { User, UserFilters } from '@/features/users'
import { createCrudService } from '@/services/createCrudService'
import { httpClient } from '@/services/http'

export const userService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<User, UserFilters>('/api/v1/users/'),
}