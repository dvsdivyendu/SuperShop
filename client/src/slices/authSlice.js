import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      Cookies.set('authToken', action.payload.token); // Set token in cookies
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove('authToken'); // Remove token from cookies
    },
    setUserFromCookie: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUserFromCookie } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
