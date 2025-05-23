import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, image, quantity } = action.payload;

      // Add or update the item in the cart
      state[id] = { 
        ...(state[id] || {}), 
        name,
        price,
        image,
        quantity: (state[id]?.quantity || 0) + quantity 
      };
    },
    removeItem: (state, action) => {
      // Remove the item from the cart
      delete state[action.payload];
    },
    clearCart: () => {
      // Reset the cart to an empty object
      return {};
    },
    setCartItems: (state, action) => {
      // Set cart items directly from API response
      return action.payload.reduce((acc, item) => {
        acc[item._id] = {
          id: item._id,
          name: item.itemId.name,
          price: item.itemId.price,
          image: item.itemId.image,
          quantity: item.quantity,
        };
        return acc;
      }, {});
    },
  },
});

// Export actions for use in components
export const { addItem, removeItem, clearCart, setCartItems } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
