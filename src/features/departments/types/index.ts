/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Department {
    id?: string;
    name_ar: string;
    name_en: string;
    created_at?: string;
    updated_at?: string;
}

export interface DepartmentFilters {
    search?: string;
    id?: string;
    name_ar: string;
    name_en: string;
    created_at?: string;
    updated_at?: string;
}
