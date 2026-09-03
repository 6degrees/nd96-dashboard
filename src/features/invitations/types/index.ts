/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Invitation {
    id?: string;
    email: string;
    role: string;
    created_at?: string;
    updated_at?: string;
}

export interface InvitationFilters {
    search?: string;
    email?: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
}
