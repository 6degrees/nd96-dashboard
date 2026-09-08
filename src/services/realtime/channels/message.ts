import { echo } from "../echo";
import { messageHandlers } from "../handlers/message";

type TranslationFunction = (
    key: string,
    options?: Record<string, unknown>
) => string;

type MessageRealtimeHandlers = {
    t: TranslationFunction;

    published?: (event: any) => void;
    updated?: (event: any) => void;
    hidden?: (event: any) => void;
};

/*
|--------------------------------------------------------------------------
| Message Realtime Channel
|--------------------------------------------------------------------------
|
| Subscribes to all realtime events related to messages.
| All message events are broadcast through the same public channel:
|
| messages
|
*/

export const subscribeToMessageChannel = (
    handlers: MessageRealtimeHandlers,
) => {
    if (!echo) {
        console.log("Reverb: Echo is not available.");
        return null;
    }

    const channelName = "messages";

    console.log(
        "Reverb: Subscribing to message channel:",
        channelName,
    );

    const channel = echo.channel(channelName);

    /*
    |--------------------------------------------------------------------------
    | Message Published
    |--------------------------------------------------------------------------
    */

    channel.listen(".message.published", (event: any) => {
        messageHandlers.published(event, handlers.t);

        handlers.published?.(event);
    });

    /*
    |--------------------------------------------------------------------------
    | Message Updated
    |--------------------------------------------------------------------------
    */

    channel.listen(".message.updated", (event: any) => {
        messageHandlers.updated(event, handlers.t);

        handlers.updated?.(event);
    });

    /*
    |--------------------------------------------------------------------------
    | Message Hidden
    |--------------------------------------------------------------------------
    */

    channel.listen(".message.hidden", (event: any) => {
        messageHandlers.hidden(event, handlers.t);

        handlers.hidden?.(event);
    });

    /*
    |--------------------------------------------------------------------------
    | Cleanup
    |--------------------------------------------------------------------------
    */

    return () => {
        console.log(
            "Reverb: Leaving message channel:",
            channelName,
        );

        echo?.leave(channelName);
    };
};