import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './AdminPage';
import UserSection from '../components/Admin/UserSection';
import ReservationSection from '../components/Admin/ReservationSection';
import FeedbackSection from '../components/Admin/FeedbackSection';
import MenuSection from '../components/Admin/MenuSection';

jest.mock('../components/Admin/UserSection', () => () => <div>User Section</div>);
jest.mock('../components/Admin/ReservationSection', () => () => <div>Reservation Section</div>);
jest.mock('../components/Admin/FeedbackSection', () => () => <div>Feedback Section</div>);
jest.mock('../components/Admin/MenuSection', () => () => <div>Menu Section</div>);

describe('AdminPage Component', () => {
  test('redirects to UserSection by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText('User Section')).toBeInTheDocument();
  });

  test('renders UserSection when navigating to /users', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText('User Section')).toBeInTheDocument();
  });

  test('renders ReservationSection when navigating to /reservations', () => {
    render(
      <MemoryRouter initialEntries={['/reservations']}>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Reservation Section')).toBeInTheDocument();
  });

  test('renders FeedbackSection when navigating to /feedback', () => {
    render(
      <MemoryRouter initialEntries={['/feedback']}>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Feedback Section')).toBeInTheDocument();
  });

  test('renders MenuSection when navigating to /menu', () => {
    render(
      <MemoryRouter initialEntries={['/menu']}>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Menu Section')).toBeInTheDocument();
  });
});