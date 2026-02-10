import {Calendar} from "lucide-react";
import {env} from "process"
import Image from "next/image";

import LoginBackground from "@/../public/images/loginbg.jpg"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
            <div
                className={"grid min-h-svh lg:grid-cols-2"}
            >
                <div
                    className={"flex flex-col gap-4 p-6 md:p-10"}
                >
                    <div
                        className={"flex justify-center gap-2 md:justify-start"}
                    >
                        <a
                            href={"#"}
                            className={"flex items-center gap-2 font-medium"}
                        >
                            <div
                                className={"bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"}
                            >
                                <Calendar className={"size-4"} />
                            </div>
                            {env.APP_TITLE}
                        </a>
                    </div>
                    <div
                        className={"flex flex-1 items-center justify-center"}
                    >
                        <div className={"w-full max-w-xs"}>
                            {children}
                        </div>
                    </div>
                </div>
                <div
                    className={"bg-muted relative hidden lg:block"}
                >
                    <Image src={LoginBackground} alt={"Bejelentkezési kép"} className={"absolute inset-0 h-full w-full object-cover"} />
                </div>
            </div>
        );
}