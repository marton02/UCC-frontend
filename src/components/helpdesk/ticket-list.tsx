import { ScrollArea } from "@/components/ui/scroll-area";
import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";
import TicketListItem from "@/components/helpdesk/ticket-list-item";

export default function TicketList({
                                       tickets,
                                       selectedTicketId,
                                       onSelectTicket,
                                   }: {
    tickets: IHelpdeskTicket[];
    selectedTicketId: string;
    onSelectTicket: (id: string) => void;
}) {
    return (
        <div className="flex w-full flex-col overflow-hidden">
            <ScrollArea className="h-full w-full">
                <div className="flex flex-col gap-2 p-3">
                    {tickets.map((t) => (
                        <TicketListItem
                            key={t.id}
                            ticket={t}
                            active={t.id === selectedTicketId}
                            onClick={() => onSelectTicket(t.id)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
