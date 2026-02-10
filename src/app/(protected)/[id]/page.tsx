import {EventForm} from "@/components/event-form";
import {backend} from "@/lib/backend";
import {toast} from "sonner";
import IEvent from "@/interfaces/IEvent";

export default async function EditEvent({params}:{params: Promise<{id: string}>}) {
    const {id} = await params;

    const event = await backend(`events/${id}`,"GET");
    const defaults = {id:id,title:"",occurrence:"",description:""};

    if(event.statusCode !== 200){
        toast("A megadott esemény nem található.")
    }
    else{
        const data = event.data as IEvent

        defaults.title = data.title
        defaults.occurrence = (new Date(data.occurrence)).toISOString().substring(0,19)
        defaults.description = data.description ?? ""

    }

    return (
        <div className={"min-w-full mx-2 sm:mx-0 sm:min-w-1/2 md:min-w-1/3 lg:min-w-1/4"}>
            <EventForm mode={"EDIT"} defaults={defaults} />
        </div>
    );
}
