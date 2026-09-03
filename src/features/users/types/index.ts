/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface User {
    id?: string;
    logo?: string | null;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserFilters {
    search?: string;
    name?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
}
