export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "React Summit US 2026",
    slug: "react-summit-us-2026",
    location: "San Francisco, CA, USA",
    date: "2026-11-07",
    time: "09:00 AM",
  },
  {
    image: "/images/event2.png",
    title: "Web Summit Europe",
    slug: "web-summit-europe",
    location: "Lisbon, Portugal",
    date: "2026-01-10",
    time: "07:00 AM",
  },
  {
    image: "/images/event3.png",
    title: "Node.js Global Conference",
    slug: "nodejs-global-conf",
    location: "Berlin, Germany",
    date: "2026-07-11",
    time: "08:30 PM",
  },
  {
    image: "/images/event4.png",
    title: "Tech Crunch Disrupt",
    slug: "techcrunch-disrupt",
    location: "San Francisco, California",
    date: "2026-05-06",
    time: "10:00 pM",
  },
  {
    image: "/images/event5.png",
    title: "JavaScript Summit",
    slug: "javascript-summit",
    location: "Amsterdam, Netherlands",
    date: "2026-02-04",
    time: "06:15 AM",
  },
  {
    image: "/images/event6.png",
    title: "Hack & Dev Hackathon",
    slug: "hack-dev-hackathon",
    location: "Austin, Texas",
    date: "2026-09-10",
    time: "09:30 PM",
  },
];
