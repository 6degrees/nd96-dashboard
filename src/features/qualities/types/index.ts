/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Quality {
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface QualityFilters {
    search?: string;
    id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
}
