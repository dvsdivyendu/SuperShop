import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from '../../pages/AdminLayout.module.css';

const AdminLayout = () => {
    const [activeSection, setActiveSection] = useState('users');

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <ul>
                    <li>
                        <Link to="users" onClick={() => setActiveSection('users')}>Users</Link>
                    </li>
                    <li>
                        <Link to="reservations" onClick={() => setActiveSection('reservations')}>TrendingProducts</Link>
                    </li>
                    <li>
                        <Link to="feedback" onClick={() => setActiveSection('feedback')}>Feedbacks</Link>
                    </li>
                    <li>
                        <Link to="menu" onClick={() => setActiveSection('menu')}>Products</Link>
                    </li>
                </ul>
            </aside>
            <main className={styles.mainContent}>
                <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section</h1>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
