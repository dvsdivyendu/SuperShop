// src/slices/reservationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: [], // Initial state as an empty array
  reducers: {
    // Sets the reservations to the fetched data
    setReservations: (state, action) => {
      return action.payload; // Replace the current state with fetched reservations
    },
    // Adds a new reservation to the state
    addReservation: (state, action) => {
      state.push(action.payload); // Add the new reservation to the state array
    },
    // Optionally, you might want to include a remove reservation action
    removeReservation: (state, action) => {
      return state.filter(reservation => reservation._id !== action.payload); // Remove reservation by ID
    },
  },
});

// Export actions for use in components
export const { setReservations, addReservation, removeReservation } = reservationSlice.actions;

// Export the reducer to be included in the store
export default reservationSlice.reducer;
