import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";

function statusLabel(status: IHelpdeskTicket["status"]) {
    if (status === "open") return "Nyitott";
    if (status === "pending") return "Folyamatban";
    return "Lezárt";
}

function statusVariant(status: IHelpdeskTicket["status"]) {
    if (status === "open") return "default";
    if (status === "pending") return "secondary";
    return "outline";
}

export default function TicketListItem({
                                           ticket,
                                           active,
                                           onClick,
                                       }: {
    ticket: IHelpdeskTicket;
    active: boolean;
    onClick: () => void;
}) {
    const last = ticket.messages !== undefined ? ticket.messages[ticket.messages.length - 1]?.content ?? "" : "";

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "w-full rounded-xl border px-3 py-3 text-left transition",
                "border-white/10 bg-white/3 hover:bg-white/6",
                active && "border-white/20 bg-white/[0.07]"
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white/90">
                        {ticket.subject}
                    </div>
                    <div className="mt-1 line-clamp-2 text-xs text-white/55">
                        {last}
                    </div>
                </div>

                <Badge variant={statusVariant(ticket.status)} className="shrink-0">
                    {statusLabel(ticket.status)}
                </Badge>
            </div>

            <div className="mt-2 text-[11px] text-white/40">
                Frissítve: {new Date(ticket.updated_at).toLocaleString("hu-HU")}
            </div>
        </button>
    );
}
