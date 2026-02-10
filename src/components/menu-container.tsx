import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface IMenuContainerProps extends PropsWithChildren {
    className?: string;
}

export function MenuContainer({ children, className }: IMenuContainerProps) {
    return (
        <div
            className={cn(
                "fixed left-1/2 top-4 z-50 -translate-x-1/2",
                "pointer-events-none",
                className
            )}
        >
            <div className="relative pointer-events-auto">
                <div
                    aria-hidden="true"
                    className={cn(
                        "absolute -inset-1 rounded-full blur-xl opacity-70",
                        "bg-linear-to-r from-pink-500 via-yellow-400 via-green-400 to-cyan-400",
                        "animate-[pulse_2.5s_ease-in-out_infinite]"
                    )}
                />
                <div
                    aria-hidden="true"
                    className={cn(
                        "absolute -inset-px rounded-full opacity-70",
                        "bg-linear-to-r from-fuchsia-500 via-amber-400 to-sky-400"
                    )}
                />

                <div
                    className={cn(
                        "relative rounded-full",
                        "bg-white/70 dark:bg-zinc-950/60",
                        "backdrop-blur-xl",
                        "border border-white/30 dark:border-white/10",
                        "shadow-lg shadow-black/10 dark:shadow-black/30",
                        "px-2 py-2"
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
