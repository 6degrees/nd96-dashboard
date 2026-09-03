/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Order {
    id?: string;
    branch_id: string;
    customer_id: string;
    number: string;
    total: number;
    status: string;
    created_at?: string;
    updated_at?: string;
}

export interface OrderFilters {
    search?: string;
    id?: string;
    branch_id: string;
    customer_id: string;
    number: string;
    total: number;
    status: string;
    created_at?: string;
    updated_at?: string;
}
