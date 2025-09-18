import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const UserDashboard: React.FC = () => {
  const username = localStorage.getItem('username'); // Get signed-in username

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #4b0082 0%, #8a2be2 100%)', // purple gradient background
      }}
    >
      <Navbar />

      <Box sx={{ flex: 1 }}> {/* This will take all remaining space */}
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: 6,
              background: 'linear-gradient(135deg, #6D5BBA, #8D58BF)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Welcome Back, {username || 'User'}!
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                This is your personal dashboard. Here you can view your bookings and manage your account.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Footer /> {/* Footer sticks to bottom */}
    </Box>
  );
};

export default UserDashboard;
