"use server"

import IServerResponse from "@/interfaces/IServerResponse";

export async function auth(
    body:{
        grant_type: "password" | "refresh_token",
        username?: string,
        password?: string,
        refresh_token?: string,
    },
) : Promise<IServerResponse>{

    const bdy = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        ...body
    }

    const req = await fetch(`${process.env.LOGIN_URL}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(bdy),
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
        const resp = (await req.json()) as Omit<IServerResponse, "statusCode">;

        return {
            statusCode: req.status,
            data: resp
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