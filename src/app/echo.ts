"use client";

import Pusher from "pusher-js";
import Echo from "laravel-echo";

export function initEcho() {
    if (typeof window === "undefined") return;
    
    if (window.Echo) return;

    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? "80", 10),
        wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? "443", 10),
        forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "http") === "https",
        enabledTransports: ["ws", "wss"],
    });
}
