import Echo from "laravel-echo";
import Pusher from "pusher-js";

/*
|--------------------------------------------------------------------------
| Reverb Configuration
|--------------------------------------------------------------------------
|
| Creates the Laravel Echo instance used to establish a WebSocket
| connection with Laravel Reverb.
|
*/

declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

if (typeof window !== "undefined") {
    window.Pusher = Pusher;
}

/*
|--------------------------------------------------------------------------
| Echo Instance
|--------------------------------------------------------------------------
|
| Creates the Echo instance only on the client side because WebSocket
| connections must not be initialized during Next.js server rendering.
|
*/

export const echo =
    typeof window !== "undefined"
        ? new Echo({
            broadcaster: "reverb",

            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,

            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,

            wsPort: Number(
                process.env.NEXT_PUBLIC_REVERB_PORT
            ),

            wssPort: Number(
                process.env.NEXT_PUBLIC_REVERB_PORT
            ),

            forceTLS:
                process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",

            enabledTransports: ["ws", "wss"],
        })
        : null;