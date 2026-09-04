import { Milestone, MilestoneFilters } from '@/features/milestones'
import { createCrudService } from '@/services/createCrudService'

export const milestoneService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Milestone, MilestoneFilters>('/api/v1/timeline-milestones/'),
}