"use client"

import { cn } from "@/lib/utils";
import IHelpdeskMessage from "@/interfaces/IHelpdeskMessage";
import {useUser} from "@/context/UserContext";

export default function MessageBubble({ message }: { message: IHelpdeskMessage }) {
    const user = useUser();

    const isUser = message.sender?.id === user?.id;

    return (
        <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-[85%] rounded-2xl border px-3 py-2 text-sm leading-relaxed",
                    isUser
                        ? "border-white/15 bg-white/10 text-white/90"
                        : "border-white/10 bg-white/4 text-white/80"
                )}
            >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="mt-1 text-[10px] text-white/45">
                    {new Date(message.created_at).toLocaleString("hu-HU")}
                </div>
            </div>
        </div>
    );
}
