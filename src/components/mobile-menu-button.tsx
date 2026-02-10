"use client";

import { cn } from "@/lib/utils";

interface IMobileMenuButtonProps {
    open: boolean;
    onToggle: () => void;
}

export function MobileMenuButton({ open, onToggle }: IMobileMenuButtonProps) {
    return (
        <button
            type="button"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={open}
            onClick={onToggle}
            className={cn(
                "inline-flex items-center justify-center rounded-full",
                "h-10 w-10",
                "text-zinc-800 dark:text-zinc-100",
                "hover:bg-black/5 dark:hover:bg-white/5",
                "transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            )}
        >
            <span className="relative block h-4 w-5">
                <span
                    className={cn(
                        "absolute left-0 top-0 block h-0.5 w-5 rounded bg-current transition",
                        open ? "translate-y-1.75 rotate-45" : ""
                    )}
                />
                <span
                    className={cn(
                        "absolute left-0 top-1.75 block h-0.5 w-5 rounded bg-current transition",
                        open ? "opacity-0" : "opacity-100"
                    )}
                />
                <span
                    className={cn(
                        "absolute left-0 top-3.5 block h-0.5 w-5 rounded bg-current transition",
                        open ? "-translate-y-1.75 -rotate-45" : ""
                    )}
                />
            </span>
        </button>
    );
}
