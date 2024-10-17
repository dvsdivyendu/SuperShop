import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Import the store
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
import AdminPage from './pages/AdminPage'; // Import your AdminPage

const App = () => {
  const notify = (message) => {
    
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/signup" element={<Signup setToast={notify} />} />
              <Route path="/login" element={<Login setToast={notify} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/event" element={<Events />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              
               {/* Conditional routes using PrivateRoute */}
        <Route path="/reservations" element={
          <PrivateRoute element={<Reservations />} roles={['user', 'admin']} />
        } />
        <Route path="/admin" element={
          <PrivateRoute element={<AdminPage />} roles={['admin']} />
        } />
        <Route path="/profile" element={
          <PrivateRoute element={<Profile />} roles={['user', 'admin']} />
        } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
