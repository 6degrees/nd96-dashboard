/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Notification {
    id?: string;
    created_at?: string;
    updated_at?: string;
}

export interface NotificationFilters {
    search?: string;
    id?: string;
    created_at?: string;
    updated_at?: string;
}
