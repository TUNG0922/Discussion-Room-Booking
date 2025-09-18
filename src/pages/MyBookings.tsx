import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MyBookings: React.FC = () => {
  const bookings = [
    { id: 1, room: 'Room A', date: '2025-09-20', time: '10:00 AM - 12:00 PM' },
    { id: 2, room: 'Room B', date: '2025-09-22', time: '2:00 PM - 4:00 PM' },
    { id: 3, room: 'Room C', date: '2025-09-25', time: '9:00 AM - 11:00 AM' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6D5BBA, #8D58BF, #A079C7)',
        color: 'white',
      }}
    >
      <Navbar />

      <Container maxWidth="md" sx={{ flex: 1, mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          My Bookings
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              sx={{
                width: 250,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: 3,
                boxShadow: 6,
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {booking.room}
                </Typography>
                <Typography>Date: {booking.date}</Typography>
                <Typography>Time: {booking.time}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2, fontWeight: 'bold' }}
                >
                  Cancel Booking
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default MyBookings;
