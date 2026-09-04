/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Milestone {
    id?: string
    timeline_id: string
    year: number
    title_ar: string
    title_en?: string
    description_ar?: string
    description_en?: string
    sort_order: number
    is_active?: boolean
    activated_at?: string
    created_at?: string
    updated_at?: string
    image?: string
}

export interface MilestoneFilters {
    search?: string
    id?: string
    timeline_id?: string
    title_ar?: string
    title_en?: string
    year?: number
    sort_order?: number
    created_at?: string[]
    updated_at?: string[]
}