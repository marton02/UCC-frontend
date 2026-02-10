"use server"

import {backend} from "@/lib/backend";
import {revalidatePath} from "next/cache";
import {formSchema} from "@/components/event-form";
import * as z from "zod"

export async function deleteEvent(eventId: string){
    await backend(`events/${eventId}`,"DELETE")
    revalidatePath("/");
}

export async function createEvent(data: z.infer<typeof formSchema>){
    return await backend('events',"POST",{
        title:data.title,
        occurrence: data.occurrence,
        description:data.description,
    })
}

export async function editEvent(data: z.infer<typeof formSchema>, id: string){
    return await backend(`events/${id}`,"PUT",{
        title:data.title,
        occurrence: data.occurrence,
        description:data.description,
    })
}