import {EventForm} from "@/components/event-form";

export default async function NewEvent() {

  return (
      <div className={"min-w-full mx-2 sm:mx-0 sm:min-w-1/2 md:min-w-1/3 lg:min-w-1/4"}>
        <EventForm mode={"CREATE"} />
      </div>
  );
}
