import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AllBookings from './pages/AllBookings';
import MyBookings from './pages/MyBookings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/all-bookings" element={<AllBookings />} /> {/* 👈 here */}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
