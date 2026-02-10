"use server"

import IServerResponse from "@/interfaces/IServerResponse";
import ILoginResponse from "@/interfaces/ILoginResponse";
import {auth} from "@/lib/auth";
import {cookies} from "next/headers";

export async function loginAction(formData: FormData): Promise<IServerResponse|null>{
    try{
        const uname = formData.get("username")?.toString();
        const passwd = formData.get("password")?.toString();
        const remember = formData.get("remember")?.toString();

        const resp : ILoginResponse = (await auth({grant_type:"password",username:uname,password:passwd})) as ILoginResponse;

        if(resp.statusCode === 200){

            (await cookies()).set("auth",resp.data.access_token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "lax",
                maxAge: resp.data.expires_in
            });

            (await cookies()).set("refresh",resp.data.refresh_token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "lax",
                maxAge: remember === "true" ? 60*60*2191.45 : 60*60*8
            });

            if(remember === "true"){
                (await cookies()).set("remember","AcbduXHw8MbwAPWnOiQf9Rys468A1WDZ",{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    sameSite: "lax",
                    maxAge: 60*60*2191.45
                })
            }
        }

        return resp
    }catch (error){
        console.log(error);
        return {
            statusCode: 500,
            data: {
                error: error instanceof Error ? error.message : "Server Error",
            }
        }
    }
}