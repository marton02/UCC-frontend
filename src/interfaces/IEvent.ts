import {IUser} from "@/interfaces/IUser";

export default interface IEvent {
    id: string;
    title: string;
    occurrence: Date;
    description: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    user: Omit<IUser,"events">
}