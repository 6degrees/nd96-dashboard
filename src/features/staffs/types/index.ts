/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Staff {
    id?: string;
    logo?: string | null;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export interface StaffFilters {
    search?: string;
    name?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
}
