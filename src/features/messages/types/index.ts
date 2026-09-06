/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Message {
    id?: string

    client_ref: string

    message: string

    name?: string | null

    department_id?: string | null

    activated_at?: string | null

    created_at?: string

    updated_at?: string
}

/*
|--------------------------------------------------------------------------
| Message Filters
|--------------------------------------------------------------------------
*/

export interface MessageFilters {
    search?: string

    id?: string

    client_ref?: string

    name?: string

    department_id?: string

    activated_at?: string

    created_at?: string

    updated_at?: string
}