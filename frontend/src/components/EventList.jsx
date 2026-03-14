import EventItem from './EventItem';

const EventList = ({ events, refresh }) => {
  return (
    <div className="event-grid">
      {events.length === 0 ? (
        <p className="no-events">No events planned yet. Start by adding one above!</p>
      ) : (
        events.map(event => (
          <EventItem
            key={event.id}
            event={event}
            refresh={refresh}
          />
        ))
      )}
    </div>
  );
};

export default EventList;