"use client"

import IEchoContextValue from "@/interfaces/IEchoContextValue";
import {createContext, useContext} from "react";

const EchoContext = createContext<IEchoContextValue | undefined>(undefined);

export function useEcho() {
    const ctx = useContext(EchoContext);
    if (!ctx) throw new Error("useEcho must be used inside <EchoProvider />");
    return ctx;
}

export default EchoContext;