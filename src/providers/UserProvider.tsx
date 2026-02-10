"use client"

import {ReactNode} from "react";
import UserContext from "@/context/UserContext";
import {IUser} from "@/interfaces/IUser";

export function UserProvider ({
                                     user,
                                     children
}:{
    user: IUser | null
    children: ReactNode
}) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}