import { playNotificationSound } from "@/lib/audio/sound";
import { toast } from "@/lib/toast/toast";

type TranslationFunction = (
    key: string,
    values?: Record<string, string | number>
) => string;

/*
|--------------------------------------------------------------------------
| Message Realtime Handlers
|--------------------------------------------------------------------------
|
| Handles realtime events received from the message channel.
|
*/

export const messageHandlers = {

    /*
    |--------------------------------------------------------------------------
    | Message Published
    |--------------------------------------------------------------------------
    */

    published: (event: any, t: TranslationFunction) => {
        console.log("Reverb: Message published.", event);

        /*
        | Play notification sound
        */
        playNotificationSound();

        /*
        | Show notification
        */
        toast.success({
            message: t("realtime.messagePublished"),
            description: event?.message?.name
                ? t("realtime.messagePublishedDescription", {
                    name: event.message.name,
                })
                : t("realtime.newMessageReceived"),
        });
    },

    /*
    |--------------------------------------------------------------------------
    | Message Updated
    |--------------------------------------------------------------------------
    */

    updated: (event: any, t: TranslationFunction) => {
        console.log("Reverb: Message updated.", event);

        /*
        | Message updates are handled silently.
        | The message state should be updated by the listener.
        */
    },

    /*
    |--------------------------------------------------------------------------
    | Message Hidden
    |--------------------------------------------------------------------------
    */

    hidden: (event: any, t: TranslationFunction) => {
        console.log("Reverb: Message hidden.", event);

        /*
        | Message should be removed from the current state.
        */
    },
};