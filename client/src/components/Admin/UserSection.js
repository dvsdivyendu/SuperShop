import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserSection.module.css'; // Import the CSS module

const UserSection = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user => (user._id === userId ? response.data : user)));
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Change Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className={user.role === 'admin' ? styles.admin : styles.user}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <select onChange={(e) => handleRoleChange(user._id, e.target.value)} value={user.role}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                                <button className={styles.deleteButton} onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserSection;
