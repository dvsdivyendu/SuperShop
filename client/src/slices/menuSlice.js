import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions

// Fetch all menu items
export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a new menu item
export const addMenuItem = createAsyncThunk(
  'menu/addMenuItem',
  async (newItem, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('details', newItem.details);
      formData.append('price', newItem.price);
      formData.append('type', newItem.type);
      if (newItem.image) formData.append('image', newItem.image);

      const response = await axios.post('http://localhost:5000/api/menu', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a menu item
export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async (updatedItem, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', updatedItem.name);
      formData.append('details', updatedItem.details);
      formData.append('price', updatedItem.price);
      formData.append('type', updatedItem.type);
      if (updatedItem.image) formData.append('image', updatedItem.image);

      const response = await axios.put(`http://localhost:5000/api/menu/${updatedItem.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a menu item
export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,  // For overall loading state
    fetchLoading: false,  // For fetch specific loading
    addLoading: false,    // For add specific loading
    updateLoading: false, // For update specific loading
    deleteLoading: false, // For delete specific loading
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all menu items
      .addCase(fetchMenuItems.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.fetchLoading = false;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      // Add new menu item
      .addCase(addMenuItem.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addLoading = false;
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.payload;
      })

      // Update a menu item
      .addCase(updateMenuItem.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.updateLoading = false;
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Delete a menu item
      .addCase(deleteMenuItem.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        state.deleteLoading = false;
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
