import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FooterAdmin from '../components/FooterAdmin';
import NavbarAdmin from '../components/NavbarAdmin';

interface RoomBooking {
  id: number;
  name: string;
  bookedBy: string | null;
  startTime: string | null;
  endTime: string | null;
  status: string; // "booked" or "available"
}

const AllBookings: React.FC = () => {
  const [bookings, setBookings] = useState<RoomBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/rooms');
        const data: RoomBooking[] = await response.json();

        // Only show rooms that are booked
        const bookedRooms = data.filter(
          (room) => room.status.toLowerCase() === 'booked'
        );

        setBookings(bookedRooms);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (roomId: number) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}/cancel`, {
        method: 'PUT', // assuming backend uses PUT to cancel booking
      });

      if (response.ok) {
        // Remove room from state immediately
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
        background: 'linear-gradient(to right, #42a5f5, #1e88e5, #1976d2)',
        color: 'black',
      }}
    >
      <NavbarAdmin />

      <Box
        sx={{
          flex: 1,
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 1200,
            backgroundColor: '#ffffff',
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            p: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{ mb: 3 }}
            >
              All Booked Rooms
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {loading ? (
              <Typography textAlign="center">Loading bookings...</Typography>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <Box
                  key={booking.id}
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    transition: 'background 0.3s',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Room: {booking.name}
                  </Typography>
                  <Typography variant="body2">
                    Booked By: {booking.bookedBy}
                  </Typography>
                  <Typography variant="body2">
                    Time: {booking.startTime} – {booking.endTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {booking.status}
                  </Typography>

                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                </Box>
              ))
            ) : (
              <Typography textAlign="center">No booked rooms available</Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <FooterAdmin />
    </Box>
  );
};

export default AllBookings;
