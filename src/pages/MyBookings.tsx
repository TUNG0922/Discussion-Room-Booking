import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface Room {
  id: number;
  name: string;
  status: string;
  bookedBy?: string | null;
  startTime?: string | null;
  endTime?: string | null;
}

const MyBookings: React.FC = () => {
  const username = localStorage.getItem('username'); // current logged-in user
  const [bookings, setBookings] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/rooms');
        const data: Room[] = await response.json();

        // Filter only rooms booked by this user
        const userBookings = data.filter(
          (room) =>
            room.status.toLowerCase() === 'booked' &&
            room.bookedBy?.toLowerCase() === username?.toLowerCase()
        );
        setBookings(userBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username]);

  const handleCancelBooking = async (roomId: number) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}/cancel`, {
        method: 'PUT',
      });

      if (response.ok) {
        setBookings((prev) => prev.filter((room) => room.id !== roomId));
      } else {
        console.error('Failed to cancel booking:', await response.text());
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

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

        {loading ? (
          <Typography textAlign="center" mt={4}>
            Loading...
          </Typography>
        ) : bookings.length === 0 ? (
          <Typography textAlign="center" mt={4}>
            You have no bookings yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 4,
              mt: 4,
            }}
          >
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                sx={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  borderRadius: 4,
                  boxShadow: 6,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 12,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {booking.name}
                  </Typography>
                  <Typography>Status: {booking.status}</Typography>
                  <Typography>Booked By: {booking.bookedBy}</Typography>

                  {booking.startTime && booking.endTime && (
                    <Box sx={{ mt: 2 }}>
                      <Typography fontWeight="bold">Time Slot:</Typography>
                      <Typography>
                        {booking.startTime} – {booking.endTime}
                      </Typography>
                    </Box>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      fontWeight: 'bold',
                      backgroundColor: '#FF6B6B',
                      '&:hover': { backgroundColor: '#E63946' },
                    }}
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default MyBookings;
