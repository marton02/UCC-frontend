import IHelpdeskMessage from "@/interfaces/IHelpdeskMessage";
import MessageBubble from "@/components/helpdesk/message-bubble";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function MessageList({ messages }: { messages: IHelpdeskMessage[] }) {
    return (
        <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-2 p-4">
                {messages.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                ))}
            </div>
        </ScrollArea>
    );
}
