import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('currentUser')) || null, // Load user from local storage if available
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); // Store user in local storage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('currentUser'); // Remove user from local storage
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
