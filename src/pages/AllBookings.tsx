import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FooterAdmin from '../components/FooterAdmin';
import NavbarAdmin from '../components/NavbarAdmin';

interface BookedRoom {
  id: number;
  name: string;
  bookedBy: string | null;
  startTime: string | null;
  endTime: string | null;
  status: string; // "booked" or "canceled"
}

const AllBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookedRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/booked-rooms');
        const data: BookedRoom[] = await response.json();

        const activeBookings = data.filter(
          (room) => room.status.toLowerCase() === 'booked'
        );
        setBookings(activeBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookedRoomId: number) => {
    try {
      const response = await fetch(`/api/booked-rooms/${bookedRoomId}/cancel`, {
        method: 'PUT',
      });

      if (response.ok) {
        setBookings((prev) => prev.filter((room) => room.id !== bookedRoomId));
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
        background: '#e3f2fd', // soft blue background
        color: 'black',
      }}
    >
      <NavbarAdmin />

      <Box sx={{ flex: 1, py: 5, px: 3 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
          All Booked Rooms
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {loading ? (
          <Typography textAlign="center">Loading bookings...</Typography>
        ) : bookings.length === 0 ? (
          <Typography textAlign="center">No booked rooms available</Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 3,
            }}
          >
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {booking.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Booked By:</strong> {booking.bookedBy}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Time:</strong> {booking.startTime} – {booking.endTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {booking.status}
                  </Typography>

                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      <FooterAdmin />
    </Box>
  );
};

export default AllBookings;
