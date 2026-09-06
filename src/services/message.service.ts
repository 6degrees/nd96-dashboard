import { Message, MessageFilters } from '@/features/messages'
import { createCrudService } from '@/services/createCrudService'

export const messageService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Message, MessageFilters>('/api/v1/messages/'),
}