import IServerResponse from "@/interfaces/IServerResponse";

export default interface ILoginResponse extends Omit<IServerResponse,"data"> {
    data:{
        "token_type": string;
        expires_in: number;
        access_token: string;
        refresh_token: string;
    }
}