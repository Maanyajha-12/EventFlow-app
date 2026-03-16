import React, { useState } from 'react';
import { createEvent } from '../service/api';

const EventForm = ({ onEventAdded }) => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent({ name, initialBudget: Number(budget) });
    setName(''); setBudget(''); onEventAdded();
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input placeholder="Event Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Budget (INR)" type="number" value={budget} onChange={e => setBudget(e.target.value)} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;