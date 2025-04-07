// src/redux/slices/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: []
  },
  reducers: {
    updateEvent(state, action) {
      const { id, eventDetails } = action.payload;
      const event = state.list.find(event => event.id === id);
      if (event) {
        // Update the event details
        event.details = eventDetails; // Adjust as per your event structure
      }
    },
    // Other reducers can go here
  }
});

export const { updateEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
