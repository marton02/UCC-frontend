import type Pusher from "pusher-js";
import type Echo from "laravel-echo";

declare global {
    interface Window {
        Pusher?: typeof Pusher;
        Echo?: Echo<"reverb">;
    }
}

export {};
