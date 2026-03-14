import React, { useState, useEffect } from 'react';
import { getAllEvents } from './service/api';
import EventForm from './components/EventForm';
import EventItem from './components/EventItem';
import './App.css';



function App() {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const res = await getAllEvents();
    setEvents(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h1>EventFlow</h1>
      <EventForm onEventAdded={load} />
      <div className="grid">
        {events.map(e => <EventItem key={e.id} event={e} refresh={load} />)}
      </div>
    </div>
  );
}

export default App;