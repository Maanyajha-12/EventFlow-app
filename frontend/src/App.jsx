import React, { useState, useEffect } from 'react';
import { getAllEvents } from './service/api';
import EventForm from './components/EventForm';
import EventItem from './components/EventItem';
import './App.css';



function App() {
  const [events, setEvents] = useState([]);

  /*const loadEvents = async () => {
    const res = await getAllEvents();
    setEvents(res.data);
  };*/

  //load event function
  const loadEvents = async () => {
    try {
      const res = await getAllEvents();
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to load events:", error);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  return (
    <div className="container">
      <h1>Event  Flow</h1>
      <EventForm onEventAdded={loadEvents} />
      <div className="event-grid">
        {events.map(event => (
          <EventItem key={event.id} event={event} refresh={loadEvents} />
        ))}
      </div>
    </div>
  );
}

export default App;