"use client";

import { useEffect, useMemo, useState } from "react";
import {MenuContainer} from "@/components/menu-container";
import {IMenuProps} from "@/interfaces/IMenuProps";
import {MenuItem} from "@/components/menu-item";
import {MobileMenuButton} from "@/components/mobile-menu-button";
import {cn} from "@/lib/utils";
import {MobileMenuPanel} from "@/components/mobile-menu-panel";
import {logout} from "@/app/login/logoutAction";
import {useRouter} from "next/navigation";

export default function Menu({
                                 items,
                                 className,
                                 ariaLabel = "Fő navigáció",
                             }: IMenuProps) {
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const desktopItems = useMemo(() => items, [items]);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <MenuContainer className={className}>
            <nav aria-label={ariaLabel} className="relative">
                <div className="flex items-center md:gap-1">
                    <div className="flex items-center  md:px-1 px-0">
                        <span className="hidden sm:inline text-sm font-semibold text-zinc-900/90 dark:text-white/90 px-2">
                          UCC Events
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        {desktopItems.map((it) => (
                            <MenuItem key={it.href} item={it} />
                        ))}
                    </div>

                    <div className="flex-1" />

                    <div className="md:hidden">
                        <MobileMenuButton open={open} onToggle={() => setOpen((v) => !v)} />
                    </div>

                    <div className="hidden md:flex items-center pr-1">
                        <button
                            onClick={async() => {const lout = await logout(); router.push(lout.redirect)}}
                            type="button"
                            className={cn(
                                "rounded-full px-3 py-2 text-sm font-medium transition cursor-pointer",
                                "text-zinc-700 hover:bg-black/5 hover:text-zinc-900",
                                "dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-white",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                            )}
                        >
                            Kijelentkezés
                        </button>
                    </div>
                </div>

                <MobileMenuPanel
                    open={open}
                    items={items}
                    onNavigate={() => setOpen(false)}
                />
            </nav>
        </MenuContainer>
    );
}
