import {cookies} from "next/headers";
import {backend} from "@/lib/backend";
import IServerResponse from "@/interfaces/IServerResponse";
import {IUser} from "@/interfaces/IUser";

export async function getCurrentUser(){
    const token = (await cookies()).get("auth")?.value

    if(!token) return null;

    const req = await backend("user","GET") as IServerResponse

    if(req.statusCode !== 200){
        return null;
    }

    return req.data as IUser;
}