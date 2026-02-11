"use client";

import { useEffect } from "react";
import { useEcho } from "@/context/EchoContext";
import { useUser } from "@/context/UserContext";

export function NotificationsListener() {
    const { echo, isReady } = useEcho();
    const user = useUser();

    useEffect(() => {
        if (!isReady || !echo || !user?.id) return;

        const channelName = `App.Models.User.${user.id}`;
        const channel = echo.private(channelName);

        channel.listen(".SomeEvent", (payload: unknown) => {
            console.log("✅ SomeEvent payload:", payload);
        });

        channel.subscribed(() => console.log("✅ Subscribed:", channelName));
        channel.error((err: unknown) => console.log("❌ Channel error:", err));

        return () => {
            echo.leave(`private-${channelName}`);
        };
    }, [isReady, echo, user?.id]);

    return null;
}
