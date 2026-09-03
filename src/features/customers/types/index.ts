/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Customer {
    id?: string;
    name: string;
    email: string;
    mobile: string;
    created_at?: string;
    updated_at?: string;
}

export interface CustomerFilters {
    search?: string;
    id?: string;
    name: string;
    email: string;
    mobile: string;
    created_at?: string;
    updated_at?: string;
}
