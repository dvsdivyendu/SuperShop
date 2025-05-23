import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate
import AdminLayout from '../components/Admin/AdminLayout';
import UserSection from '../components/Admin/UserSection';
import ReservationSection from '../components/Admin/ReservationSection';
import FeedbackSection from '../components/Admin/FeedbackSection';
import MenuSection from '../components/Admin/MenuSection';

const AdminPage = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Navigate to="users" replace />} /> {/* Redirect to users */}
                <Route path="users" element={<UserSection />} />
                <Route path="reservations" element={<ReservationSection />} />
                <Route path="feedback" element={<FeedbackSection />} />
                <Route path="menu" element={<MenuSection />} />
            </Route>
        </Routes>
    );
};

export default AdminPage;
