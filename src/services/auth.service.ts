import { httpClient } from '@/services/http'

/*
|--------------------------------------------------------------------------
| Authentication Service
|--------------------------------------------------------------------------
|
| Handles all auth-related API calls.
| - login
| - forgot password
| - reset password
| - info
| - logout (local)
|
*/
export const authService = {
    /*
    |--------------------------------------------------------------------------
    | login
    |--------------------------------------------------------------------------
    |
    | Sends user credentials to the API.
    | Returns user data on success.
    |
    */
    async login(data: { email: string; password: string; }) {
        const res = await httpClient.post(
            '/api/v1/auth/login',
            {
                ...data,
                role: 'admin',
            },
            { Authorization: '' }
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | forgotPassword
    |--------------------------------------------------------------------------
    |
    | Initiates password recovery process.
    | Sends email and code to receive OTP.
    |
    */
    async forgotPassword(data: { email: string; code: string; }) {
        const res = await httpClient.post(
            '/api/v1/auth/forgot-password',
            {
                ...data,
                role: 'admin',
            },
            { Authorization: '' }
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | resetPassword
    |--------------------------------------------------------------------------
    |
    | Completes password reset process.
    | Requires email, OTP token, code, and new password.
    |
    */
    async resetPassword(data: { email: string; otp: string; code: string; password: string; password_confirmation: string; }) {
        const res = await httpClient.post(
            '/api/v1/auth/reset-password',
            {
                ...data,
                role: 'tenant',
            },
            { Authorization: '' }
        );

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | info
    |--------------------------------------------------------------------------
    |
    | Retrieves the currently authenticated user's profile information
    | and returns the user details.
    |
    */
    async info() {
        const res = await httpClient.get('/api/v1/auth/info');

        return res.data;
    },

    /*
    |--------------------------------------------------------------------------
    | logout
    |--------------------------------------------------------------------------
    |
    | Handles logout process.
    | Usually clears tokens or session locally.
    |
    */
    async logout() {
        return true;
    },
};