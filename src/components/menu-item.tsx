"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IMenuItem } from "@/interfaces/IMenuItem";
import { cn } from "@/lib/utils";

interface IMenuItemProps {
    item: IMenuItem;
    onNavigate?: () => void;
}

export function MenuItem({ item, onNavigate }: IMenuItemProps) {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    const base =
        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition " +
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 " +
        "focus-visible:ring-offset-transparent";

    const active = "bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-zinc-50";
    const idle =
        "text-zinc-700 hover:bg-black/5 hover:text-zinc-900 " +
        "dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-white";

    if (item.external) {
        return (
            <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={onNavigate}
                className={cn(base, isActive ? active : idle)}
            >
                {item.icon}
                <span>{item.label}</span>
                <span className="text-xs opacity-70">↗</span>
            </a>
        );
    }

    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(base, isActive ? active : idle)}
        >
            {item.icon}
            <span>{item.label}</span>
        </Link>
    );
}
