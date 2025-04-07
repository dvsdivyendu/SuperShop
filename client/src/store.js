import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/slice'; // Your existing cart reducer
import authReducer from './slices/authSlice'; // Import the auth reducer
import reservationReducer from './slices/reservationSlice'; // Import the reservation reducer
import menuReducer from './slices/menuSlice'; // Import the menu reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,        // Cart reducer
    auth: authReducer,        // Auth reducer
    reservations: reservationReducer, // Reservation reducer
    menu: menuReducer,        // Menu reducer
  },
});

export default store;
