import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logopics.png'; // Replace with your logo path

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    navigate('/signin');
  };

  const handleViewBookings = () => {
    navigate('/my-bookings'); // Adjust this route according to your app
  };

  return (
    <AppBar
      position="static"
      sx={{ background: 'linear-gradient(135deg, #6D5BBA, #8D58BF)' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewBookings}
            sx={{ fontWeight: 'bold', mr: 2 }}
          >
            View Your Bookings
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

export default Navbar;
