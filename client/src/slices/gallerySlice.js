// src/redux/slices/gallerySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addGalleryImage: (state, action) => {
      state.images.push({
        id: new Date().toISOString(), // Generate a unique ID
        url: action.payload,
        alt: 'New image',
      });
    },
    deleteGalleryImage: (state, action) => {
      state.images = state.images.filter((image) => image.id !== action.payload);
    },
    updateGalleryImage: (state, action) => {
      const { id, url } = action.payload;
      const image = state.images.find((img) => img.id === id);
      if (image) {
        image.url = url;
      }
    },
  },
});

export const { addGalleryImage, deleteGalleryImage, updateGalleryImage } = gallerySlice.actions;
export default gallerySlice.reducer;
