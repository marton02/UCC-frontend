"use server"

import {cookies} from "next/headers";
import IServerResponse from "@/interfaces/IServerResponse";

export async function backend(
    path: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?:object,
) : Promise<IServerResponse>{
    const token = (await cookies()).get("auth")?.value ?? ""

    const req = await fetch(`${process.env.API_URL}/${path}`,{
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    })

    if (!req.ok) {
        return {
            statusCode: req.status,
            data:{
                error: req.statusText,
            }
        }
    }

    try{
        const resp = req.status !== 204 ? (await req.json()) as Omit<IServerResponse, "statusCode"> : {data:{}};

        return {
            statusCode: req.status,
            data: resp.data
        }

    }
    catch(error){
        console.log(error)

        return {
            statusCode: req.status,
            data:{
                error: error,
            }
        }

    }
}