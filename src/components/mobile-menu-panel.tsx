"use client";

import type { IMenuItem } from "@/interfaces/IMenuItem";
import { MenuItem } from "@/components/menu-item";
import { cn } from "@/lib/utils";

interface IMobileMenuPanelProps {
    open: boolean;
    items: IMenuItem[];
    onNavigate: () => void;
}

export function MobileMenuPanel({ open, items, onNavigate }: IMobileMenuPanelProps) {
    return (
        <div
            className={cn(
                "md:hidden",
                "absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2",
                "w-[min(92vw,420px)]",
                "transition",
                open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            )}
        >
            <div
                className={cn(
                    "rounded-2xl",
                    "bg-white/80 dark:bg-zinc-950/70",
                    "backdrop-blur-xl",
                    "border border-white/30 dark:border-white/10",
                    "shadow-xl shadow-black/10 dark:shadow-black/40",
                    "p-2"
                )}
            >
                <div className="flex flex-col gap-1">
                    {items.map((it) => (
                        <div key={it.href} className="w-full">
                            <MenuItem item={it} onNavigate={onNavigate} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
