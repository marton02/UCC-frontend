import IEvent from "@/interfaces/IEvent";

export interface IUser {
    id: string;
    email: string;
    events_count: number;
    events: Omit<IEvent[],"user">;
}