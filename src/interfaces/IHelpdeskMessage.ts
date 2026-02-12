import {IUser} from "@/interfaces/IUser";

export default interface IHelpdeskMessage {
    id: string;
    sender: IUser;
    content: string;
    createdAtIso: string;
}