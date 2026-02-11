import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";
import HelpdeskClient from "@/components/helpdesk/helpdesk-client";

export default function HelpdeskPage() {
    const tickets: IHelpdeskTicket[] = []

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pb-6">
            <div className="mt-4">
                <HelpdeskClient initialTickets={tickets} />
            </div>
        </div>
    );
}
