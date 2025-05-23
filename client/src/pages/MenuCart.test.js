import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MenuCart from './Menu';
import { addItem } from '../slices/slice';

jest.mock('axios');
jest.mock('../slices/slice', () => ({
  addItem: jest.fn(),
}));

const mockStore = configureStore([]);

describe('MenuCart Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  test('renders the component and displays loading state', () => {
    render(
      <Provider store={store}>
        <MenuCart />
      </Provider>
    );

    expect(screen.getByText('Loading menu items...')).toBeInTheDocument();
  });

  test('fetches and displays menu items', async () => {
    const mockMenuItems = [
      { _id: '1', name: 'Laptop', type: 'electronics', price: 50000, image: 'laptop.jpg', details: 'High-performance laptop' },
      { _id: '2', name: 'Pizza', type: 'food', price: 500, image: 'pizza.jpg', details: 'Delicious pizza' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMenuItems });

    render(
      <Provider store={store}>
        <MenuCart />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
    });
  });

  test('filters menu items by type', async () => {
    const mockMenuItems = [
      { _id: '1', name: 'Laptop', type: 'electronics', price: 50000, image: 'laptop.jpg', details: 'High-performance laptop' },
      { _id: '2', name: 'Pizza', type: 'food', price: 500, image: 'pizza.jpg', details: 'Delicious pizza' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMenuItems });

    render(
      <Provider store={store}>
        <MenuCart />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
    });

    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: 'electronics' } });

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
  });

  test('searches menu items by name', async () => {
    const mockMenuItems = [
      { _id: '1', name: 'Laptop', type: 'electronics', price: 50000, image: 'laptop.jpg', details: 'High-performance laptop' },
      { _id: '2', name: 'Pizza', type: 'food', price: 500, image: 'pizza.jpg', details: 'Delicious pizza' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMenuItems });

    render(
      <Provider store={store}>
        <MenuCart />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Laptop' } });

    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
  });

  test('handles quantity changes', async () => {
    const mockMenuItems = [
      { _id: '1', name: 'Laptop', type: 'electronics', price: 50000, image: 'laptop.jpg', details: 'High-performance laptop' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMenuItems });

    render(
      <Provider store={store}>
        <MenuCart />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    const increaseButton = screen.getByText('+');
    const quantityInput = screen.getByDisplayValue('1');

    fireEvent.click(increaseButton);
    expect(quantityInput.value).toBe('2');

    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);
    expect(quantityInput.value).toBe('1');
  });

  test('adds item to cart', async () => {
    const mockMenuItems = [
      { _id: '1', name: 'Laptop', type: 'electronics', price: 50000, image: 'laptop.jpg', details: 'High-performance laptop' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockMenuItems });
    axios.post.mockResolvedValueOnce({});

    render(
      <Provider store={store}>
        <MenuCart />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(addItem).toHaveBeenCalledWith({
        id: '1',
        name: 'Laptop',
        price: 50000,
        image: 'laptop.jpg',
        quantity: 1,
      });
    });
  });
});