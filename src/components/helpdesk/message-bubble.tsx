import { cn } from "@/lib/utils";
import IHelpdeskMessage from "@/interfaces/IHelpdeskMessage";

export default function MessageBubble({ message }: { message: IHelpdeskMessage }) {
    const isUser = message.sender === "user";

    return (
        <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
            <div
                className={cn(
                    "max-w-[85%] rounded-2xl border px-3 py-2 text-sm leading-relaxed",
                    isUser
                        ? "border-white/15 bg-white/[0.10] text-white/90"
                        : "border-white/10 bg-white/[0.04] text-white/80"
                )}
            >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="mt-1 text-[10px] text-white/45">
                    {new Date(message.createdAtIso).toLocaleString("hu-HU")}
                </div>
            </div>
        </div>
    );
}
