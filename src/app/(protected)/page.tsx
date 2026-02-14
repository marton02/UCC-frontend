import EventCard from "@/components/event-card";
import {backend} from "@/lib/backend";
import IServerResponse from "@/interfaces/IServerResponse";
import IEvent from "@/interfaces/IEvent";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import {Plus} from "lucide-react";

export default async function Home() {

  const eventsRequest = (await backend("events", "GET")) as IServerResponse;

  if (eventsRequest.statusCode !== 200) {
    return <p>{eventsRequest.statusCode}</p>;
  }

  const events = eventsRequest.data as IEvent[];

  return (
      <div className={`grid grid-cols-1 md:grid-cols-${events.length === 0 ? "1" : "2"} lg:grid-cols-${events.length === 0 ? "1" : "4"} gap-3`}>
        {
          events.length > 0 && events.map((event, index) => (
            <EventCard key={index} event={event}/>
          ))
        }
        <Link
          href={"/new-event"}
        >

          <Card className="mx-auto w-full max-w-sm h-full min-w-60 min-h-60">
            <CardContent className={"h-full flex flex-col items-center justify-center font-bold"}>
              <div className={"bg-neutral-800 rounded-full p-2"}>
                <Plus className={""} />
              </div>
              Új esemény
            </CardContent>
          </Card>
        </Link>
      </div>
  );
}
