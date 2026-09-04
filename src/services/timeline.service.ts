import { Timeline, TimelineFilters } from '@/features/timelines'
import { createCrudService } from '@/services/createCrudService'

export const timelineService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Timeline, TimelineFilters>('/api/v1/timelines/'),
}