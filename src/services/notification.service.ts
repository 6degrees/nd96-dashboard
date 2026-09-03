import { Notification, NotificationFilters } from '@/features/notifications'
import { createCrudService } from '@/services/createCrudService'
import {httpClient} from "@/services/http";

export const notificationService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Notification, NotificationFilters>('/api/v1/tenants/{{tenant}}/notifications/'),

    /*
    |--------------------------------------------------------------------------
    | Mark Notification as Read
    |--------------------------------------------------------------------------
    */
    async markAsRead() {
        const res = await httpClient.post<Notification>(`/api/v1/tenants/{{tenant}}/notifications/mark-all-as-read`, {})
        return res.data
    },
}