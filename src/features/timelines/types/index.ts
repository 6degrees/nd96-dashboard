/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Timeline {
    id?: string;
    name_ar: string;
    name_en: string;
    sort_order: string;
    created_at?: string;
    updated_at?: string;
}

export interface TimelineFilters {
    search?: string;
    id?: string;
    name_ar: string;
    name_en: string;
    sort_order: string;
    created_at?: string;
    updated_at?: string;
}
