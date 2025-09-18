import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logopics.png'; // Replace with your logo path

const NavbarAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    navigate('/signin');
  };

  const handleViewBookings = () => {
    navigate('/all-bookings'); // 👈 match the route to AllBookings.tsx
  };

  return (
    <AppBar
      position="static"
      sx={{ background: 'linear-gradient(135deg, #42a5f5, #1e88e5, #1976d2)' }} // blue gradient
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Side (Logo + Title) */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant="h6" component="div" fontWeight="bold">
            Discussion Room Booking App
          </Typography>
        </Box>

        {/* Right Side (Buttons) */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleViewBookings}
            sx={{
              fontWeight: 'bold',
              backgroundColor: 'white',
              color: '#1976d2',
              '&:hover': { backgroundColor: '#e3f2fd' },
            }}
          >
            View All Bookings
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ fontWeight: 'bold' }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
