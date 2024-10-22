import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/slice'; // Your existing cart reducer
import authReducer from './slices/authSlice'; // Import the auth reducer
import reservationReducer from './slices/reservationSlice'; // Import the reservation reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // Include the cart reducer
    auth: authReducer, // Include the auth reducer
    reservations: reservationReducer,
     // Include the reservation reducer
  },
});

export default store;
