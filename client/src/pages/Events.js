import React from 'react';
import './Event.css'; // Adjust the path as necessary


// Sample data for events
const upcomingEvents = [
  {
    id: 1,
    title: "Live Music Night",
    date: "October 6, 2024",
    time: "7:00 PM - 10:00 PM",
    description: "Join us for an evening of live music featuring local bands.",
  },
  {
    id: 2,
    title: "Trivia Tuesday",
    date: "October 10, 2024",
    time: "6:00 PM - 9:00 PM",
    description: "Test your knowledge and win prizes!",
  },
  {
    id: 3,
    title: "Oktoberfest Celebration",
    date: "October 14, 2024",
    time: "1:00 PM - 10:00 PM",
    description: "Celebrate Oktoberfest with traditional beers, food, and live entertainment!",
  },
];

const todayEvents = [
  {
    title: "Happy Hour Specials",
    time: "4:00 PM - 6:00 PM",
    description: "Enjoy discounted drinks and appetizers.",
  },
  {
    title: "Karaoke Night",
    time: "8:00 PM - 11:00 PM",
    description: "Show off your singing skills!",
  },
];

const previousEvents = [
  {
    title: "Pub Quiz Night",
    date: "September 25, 2024",
    highlights: "Great teams, fun prizes!",
  },
  {
    title: "Wine Tasting Event",
    date: "September 20, 2024",
    highlights: "A selection of fine wines paired with delicious bites.",
  },
  {
    title: "Game Night",
    date: "September 02, 2024",
    highlights: "From board games to video games, we had a blast!",
  },
];

const EventsPage = () => {
  return (
    <div className="events-page">
      <h1 className='h1'>Events Page</h1>

      <section className='sectionEvent'>
        <h2 className='h2'>Upcoming Events</h2>
        <ul className='eventlist'>
          {upcomingEvents.map(event => (
            <li className="list" key={event.id}>
              <h3>{event.title}</h3>
              <p className="pevents">{event.date} | {event.time}</p>
              <p className="pevents">{event.description}</p>
              <button className='eventbutton'>Reserve Your Spot</button>
            </li>
          ))}
        </ul>
      </section>

      <section className='sectionEvent'>
        <h2 className='h2'>Today's Events</h2>
        <ul className='eventlist'>
          {todayEvents.map((event, index) => (
            <li className="list" key={index}>
              <h3>{event.title}</h3>
              <p className="pevents">{event.time}</p>
              <p className="pevents">{event.description}</p>
            </li> 
          ))}
        </ul>
      </section>

      <section className='sectionEvent'>
        <h2 className='h2'>Previous Events</h2>
        <ul className='eventlist'>
          {previousEvents.map((event, index) => (
            <li className="list" key={index}>
              <h3>{event.title}</h3>
              <p className="pevents">{event.date}</p>
              <p className="pevents">{event.highlights}</p>
            </li>
          ))}
        </ul>
      </section>

     
    </div>
  );
};

export default EventsPage;
