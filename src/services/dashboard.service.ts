import {httpClient} from "@/services/http";

export const dashboardService = {
    /*
    |--------------------------------------------------------------------------
    | Tenant Dashboard Data
    |--------------------------------------------------------------------------
    |
    | Fetch aggregated statistics, metrics, and pickup queue for a specific tenant.
    |
    */
    async getTenantDashboard() {
        const res = await httpClient.get<any>(
            `/api/v1/{{tenant}}/dashboard`
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | Tenant Monthly Orders
    |--------------------------------------------------------------------------
    |
    | Fetch monthly order counts for the last 12 months.
    |
    */
    async getTenantOrders() {
        const res = await httpClient.get<any>(
            `/api/v1/{{tenant}}/dashboard/orders`
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | Tenant Top Sales Branches
    |--------------------------------------------------------------------------
    |
    | Fetch the top-performing branches based on their total order sales.
    |
    */
    async getTopSalesBranches() {
        const res = await httpClient.get<any>(
            `/api/v1/{{tenant}}/dashboard/top-sales-branches`
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | Tenant Branch Dashboard Statistics
    |--------------------------------------------------------------------------
    |
    | Fetch branch dashboard statistics including:
    | - Total branches
    | - Branches requiring attention
    | - Total orders
    | - Attention branches
    | - Top-performing branches
    |
    */
    async getBranchDashboardStatistics() {
        const res = await httpClient.get<any>(
            `/api/v1/{{tenant}}/dashboard/branches/statistics`
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | Tenant Branch Ratings
    |--------------------------------------------------------------------------
    |
    | Fetch the average customer rating for each branch.
    |
    */
    async getBranchRatings() {
        const res = await httpClient.get<any>(
            `/api/v1/{{tenant}}/dashboard/ratings/branches`
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | Tenant Rating Sentiment
    |--------------------------------------------------------------------------
    |
    | Fetch positive, neutral, and negative rating statistics.
    |
    */
    async getRatingSentiment() {
        const res = await httpClient.get<any>(
            `/api/v1/{{tenant}}/dashboard/ratings/sentiment`
        );

        return res.data;
    },
};