"use client"

import {createContext, useContext} from "react";
import {IUser} from "@/interfaces/IUser";

const UserContext = createContext<IUser | null >(null);

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined){
        throw new Error("useUser must be used within UserContext");
    }

    return context;
}

export default UserContext;