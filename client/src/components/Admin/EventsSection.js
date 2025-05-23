// components/Admin/EventsSection.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../../slices/eventsSlice';

const EventsSection = () => {
  const events = useSelector((state) => state.events.list);
  const dispatch = useDispatch();
  const [updatedEvent, setUpdatedEvent] = useState('');
  const [eventId, setEventId] = useState(null); // Track which event is being updated

  const handleUpdate = () => {
    if (eventId !== null) {
      dispatch(updateEvent({ id: eventId, eventDetails: updatedEvent }));
      setUpdatedEvent('');
      setEventId(null); // Reset after update
    }
  };

  return (
    <div>
      <h2>Manage Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.date}
            <button onClick={() => {
              setEventId(event.id);
              setUpdatedEvent(event.details || ''); // Load current details for editing
            }}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {eventId && (
        <div>
          <h3>Update Event</h3>
          <input 
            type="text" 
            value={updatedEvent} 
            onChange={(e) => setUpdatedEvent(e.target.value)} 
            placeholder="Update event details"
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => {
            setUpdatedEvent('');
            setEventId(null); // Cancel editing
          }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EventsSection;
