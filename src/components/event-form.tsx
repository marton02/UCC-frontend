"use client"

import * as React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {toast} from "sonner"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Field, FieldError, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea,} from "@/components/ui/input-group"
import {useRouter} from "next/navigation";
import {createEvent, editEvent} from "@/app/(protected)/eventActions";
import {useTransition} from "react";

export const formSchema = z.object({
    title: z
        .string()
        .min(5, "A címnek minimum 5 karakternek kell lennie!"),
    occurrence: z
        .iso.datetime({local: true, error:"Érvénytelen dátum." }),
    description: z
        .string()
})

export function EventForm({mode, defaults}:{mode:"EDIT"|"CREATE", defaults?:{id: string, title: string, occurrence: string, description?: string}}) {

    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: mode === "EDIT" ? defaults?.title : "",
            occurrence: mode === "EDIT" ? defaults?.occurrence : "",
            description: mode === "EDIT" ? (defaults?.description ?? "") : "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const req = mode === "CREATE" ? await createEvent(data) : await editEvent(data,defaults?.id ?? "")

            if((mode === "CREATE" && req.statusCode === 201) || (mode === "EDIT" && req.statusCode === 200)){
                toast("Esemény sikeresen mentve!")
                setTimeout(()=>{router.push("/")},500)
            }else{
                toast("Váratlan hiba történt!")
                console.log(req.data)
            }
        })
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>
                    {mode === "CREATE" ? "Új esemény létrehozása" : "Esemény szerkesztése"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form id="event-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="event-form-title">
                                        Esemény címe
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="event-form-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Majális 2026"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="occurrence"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="event-form-occurrence">
                                        Esemény időpontja
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="event-form-occurrence"
                                        aria-invalid={fieldState.invalid}
                                        type={"datetime-local"}
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="event-form-description">
                                        Esemény leírása <span className={"text-sm text-neutral-500 italic"}>(opcionális)</span>
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="event-form-description"
                                            placeholder="Ez egy klassz esemény"
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length} characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button disabled={isPending} type="button" variant="outline" className={"cursor-pointer"} onClick={() => {router.push("/")}}>
                        Mégsem
                    </Button>
                    <Button disabled={isPending} type="submit" form="event-form" className={"cursor-pointer"}>
                        Mentés
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
