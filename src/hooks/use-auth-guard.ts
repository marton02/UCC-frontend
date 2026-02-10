"use client"

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {backend} from "@/lib/backend";

export function useAuthGuard(){
    const router = useRouter();

    useEffect(()=>{
        async function checkAuth() : Promise<void>{
            const result = await backend("/user","GET")

            if (result.statusCode === 401){
                document.cookie = "auth=;Max-Age=0;Path=/";
                document.cookie = "remember=;Max-Age=0;Path=/";

                router.replace("/login");
            }
        }

        checkAuth()
    },[router])
}