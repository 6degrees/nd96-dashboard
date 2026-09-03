/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Product {
    id?: string;
    name: string;
    sku: string;
    price: string;
    created_at?: string;
    updated_at?: string;
}

export interface ProductFilters {
    search?: string;
    id?: string;
    name: string;
    sku: string;
    price: string;
    created_at?: string;
    updated_at?: string;
}
