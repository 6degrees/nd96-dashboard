import {Invitation, InvitationFilters} from '@/features/invitations'
import {createCrudService} from '@/services/createCrudService'
import {httpClient} from "@/services/http";

export const invitationService = {
    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */
    ...createCrudService<Invitation, InvitationFilters>('/api/v1/tenants/{{tenant}}/invitations/'),

    /*
    |--------------------------------------------------------------------------
    | Create Branch Staff
    |--------------------------------------------------------------------------
    */
    async createBranchStaff(data: any) {
        const res = await httpClient.post<Invitation>('/api/v1/tenants/{{tenant}}/branches/{{branch}}/invitations/', data)
        return res.data
    },

    /*
    |--------------------------------------------------------------------------
    | show invitations
    |--------------------------------------------------------------------------
    */
    async show(token: string) {
        const res = await httpClient.get<any[]>(`/api/v1/invitations/${token}`, {})
        return res.data
    },

    /*
    |--------------------------------------------------------------------------
    | accept invitations
    |--------------------------------------------------------------------------
    */
    async accept(payload: any) {
        const res = await httpClient.post<any[]>('/api/v1/invitations/accept/', payload)
        return res.data
    },
}