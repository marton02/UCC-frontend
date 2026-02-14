import {IUser} from "@/interfaces/IUser";

export default interface IHelpdeskMessage {
    id: string;
    sender: IUser | null;
    content: string;
    created_at: string;
}