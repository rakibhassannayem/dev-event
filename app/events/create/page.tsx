import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  return (
    <section className="container mx-auto px-5 sm:px-10 py-10 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Create a New Event</h1>
        <p className="text-light-200 mt-2 text-lg">
          Publish your developer event to the community hub.
        </p>
      </div>
      
      <div className="bg-dark-100 border border-dark-200 card-shadow p-6 sm:p-10 rounded-xl">
        <EventForm />
      </div>
    </section>
  );
}
