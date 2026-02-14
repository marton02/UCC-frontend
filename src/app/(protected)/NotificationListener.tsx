"use client";

import { useEffect } from "react";
import { useEcho } from "@/context/EchoContext";
import { useUser } from "@/context/UserContext";
import {toast} from "sonner";

export function NotificationsListener() {
    const { echo, isReady } = useEcho();
    const user = useUser();

    useEffect(() => {
        if (!isReady || !echo || !user?.id) return;

        const channelName = `Helpdesk.User.${user.id}`;
        const channel = echo.private(channelName);

        channel.listen(".helpdesk.message", () => {
            toast("Új üzenete érkezett az egyik segítségkérésére!")
        });

        return () => {
            echo.leave(`private-${channelName}`);
        };
    }, [isReady, echo, user?.id]);

    return null;
}
