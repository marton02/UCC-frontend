export type HelpdeskSender = "user" | "agent";

export default interface IHelpdeskMessage {
    id: string;
    ticketId: string;
    sender: HelpdeskSender;
    content: string;
    createdAtIso: string;
}