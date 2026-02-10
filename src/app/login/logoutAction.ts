"use server"

import {backend} from "@/lib/backend";
import {cookies} from "next/headers";

export async function logout() {
    await backend("logout","GET");

    (await cookies()).delete("auth");
    (await cookies()).delete("refresh");
    (await cookies()).delete("remember");

    return {
        redirect: "login"
    }
}