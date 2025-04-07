import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservation';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Header from './components/header';
import Footer from './components/footer';
import Signup from './pages/signup';
import Gallery from './pages/gallery';
import Events from './pages/Events';
import Feedback from './pages/Feedback';
import Cart from './pages/cart';
import PrivateRoute from './pages/PrivateRoute';
import Payment from './pages/Payment';
import AdminPage from './pages/AdminPage';
import { setUserFromCookie, logout } from './slices/authSlice';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired, log out the user
          Cookies.remove('authToken');
          dispatch(logout());
        } else {
          // Token is valid, set user from cookie
          dispatch(setUserFromCookie(decoded));
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/event" element={<Events />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/reservations" element={<PrivateRoute element={<Reservations />} roles={['user', 'admin']} />} />
            <Route path="/admin/*" element={<PrivateRoute element={<AdminPage />} roles={['admin']} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} roles={['user']} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
