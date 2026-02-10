"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import IEvent from "@/interfaces/IEvent";
import {deleteEvent} from "@/app/(protected)/eventActions";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function EventCard({event}: {event: IEvent}){

    const occurrence = new Date(event.occurrence)

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className={"flex flex-row items-center gap-2"}>
                    {occurrence.getFullYear()}. {(occurrence.getMonth() + 1).toString().padStart(2,"0")}. {occurrence.getDate().toString().padStart(2,"0")}. {occurrence.getHours().toString().padStart(2,"0")}:{occurrence.getMinutes().toString().padStart(2,"0")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {
                    event.description ? (
                        <p>
                            {event.description}
                        </p>
                    ) : (
                        <p className={"italic text-neutral-500"}>
                            Ez az esemény annyira jó, hogy nem kell neki leírás!
                        </p>
                    )
                }
            </CardContent>
            <CardFooter className="flex-col gap-2 border-t">
                <Link
                    href={event.id}
                    className={"w-full"}
                >
                    <Button variant="secondary" size="sm" className={"w-full cursor-pointer"} onClick={async () => {}} disabled={isPending}>
                        Szerkesztés
                    </Button>
                </Link>

                <Button
                    variant="destructive"
                    size="sm"
                    className={"w-full cursor-pointer"}
                    disabled={isPending}
                    onClick={() =>
                        startTransition(async () => {
                            await deleteEvent(event.id);
                            router.refresh();
                        })
                    }
                >
                    Törlés
                </Button>
            </CardFooter>
        </Card>
    )
}