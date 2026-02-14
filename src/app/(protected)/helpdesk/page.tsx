import IHelpdeskTicket from "@/interfaces/IHelpdeskTicket";
import HelpdeskClient from "@/components/helpdesk/helpdesk-client";
import {backend} from "@/lib/backend";

export default async function HelpdeskPage() {
    const req = await backend("helpdesk","GET");

    const tickets: IHelpdeskTicket[] = []

    if (req.statusCode===200){
        (req.data as IHelpdeskTicket[]).map((t)=>tickets.push(t));
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pb-6">
            <div className="mt-4">
                <HelpdeskClient initialTickets={tickets} />
            </div>
        </div>
    );
}
