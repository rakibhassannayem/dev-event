import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const EventsPage = async () => {
  let events = [];

  try {
    const response = await fetch(`${BASE_URL}/api/events`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      events = data.events || [];
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <section className="">
      <h1>Discover All Events</h1>
      <p className="mt-5 text-light-100 text-lg max-sm:text-sm">
        Browse through all the upcoming hackathons, meetups, and conferences in
        our community.
      </p>

      <div className="mt-20 space-y-7">
        <h3>All Events</h3>

        <ul className="events">
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={event.slug || event.title}>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p className="text-light-200">No events found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default EventsPage;
