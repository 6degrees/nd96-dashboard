import { httpClient } from '@/services/http'

/*
|--------------------------------------------------------------------------
| Command Service
|--------------------------------------------------------------------------
|
| Handles all screen command-related API calls.
| - send command
|
*/

export const commandService = {
    /*
    |--------------------------------------------------------------------------
    | send
    |--------------------------------------------------------------------------
    |
    | Sends a command to a specific remote screen.
    |
    */
    async send(data: { screen: string; command: string; }) {
        const res = await httpClient.post(
            '/api/v1/commands',
            data
        );

        return res.data;
    },
};