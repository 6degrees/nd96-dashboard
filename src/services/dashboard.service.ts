import {httpClient} from "@/services/http";

export const dashboardService = {
    /*
    |--------------------------------------------------------------------------
    | Dashboard Data
    |--------------------------------------------------------------------------
    |
    | Fetch aggregated statistics, metrics, and pickup queue for a specific tenant.
    |
    */
    async getDashboard() {
        const res = await httpClient.get<any>(`/api/v1/dashboard`);
        return res.data;
    },
};