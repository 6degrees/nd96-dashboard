import { Department, DepartmentFilters } from '@/features/departments'
import { createCrudService } from '@/services/createCrudService'

export const departmentService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Department, DepartmentFilters>('/api/v1/departments/'),
}