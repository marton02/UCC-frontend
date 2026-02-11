"use client";

import React, { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import EchoContext from "@/context/EchoContext";
import IEchoContextValue from "@/interfaces/IEchoContextValue";

type ReverbEcho = Echo<"reverb">;

function createEchoInstance(token: string): Echo<"reverb"> | null {
    if (typeof window === "undefined") return null;

    if (window.Echo) return window.Echo;

    window.Pusher = Pusher;

    const instance: Echo<"reverb"> = new Echo({
        broadcaster: "reverb",
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? "80", 10),
        wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT ?? "443", 10),
        forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "http") === "https",
        enabledTransports: ["ws", "wss"],

        authEndpoint: process.env.NEXT_PUBLIC_REVERB_AUTH_ENDPOINT,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        },
    });

    window.Echo = instance;
    return instance;
}

export function EchoProvider({ bearerToken, children }: { bearerToken: string, children: React.ReactNode }) {
    const [echo] = useState<ReverbEcho | null>(() => createEchoInstance(bearerToken));

    useEffect(() => {
        return () => {
            try {
                echo?.disconnect();
            } catch {}
        };
    }, [echo]);

    const value: IEchoContextValue = useMemo(
        () => ({ echo, isReady: !!echo }),
        [echo]
    );

    return <EchoContext.Provider value={value}>{children}</EchoContext.Provider>;
}
