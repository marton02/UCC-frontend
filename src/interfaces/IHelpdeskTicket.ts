import IHelpdeskMessage from "@/interfaces/IHelpdeskMessage";

export type HelpdeskStatus = "open" | "pending" | "closed";

export default interface IHelpdeskTicket {
    id: string;
    subject: string;
    status: HelpdeskStatus;
    updated_at: string;
    messages: IHelpdeskMessage[];
}