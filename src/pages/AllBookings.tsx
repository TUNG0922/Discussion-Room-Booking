import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FooterAdmin from '../components/FooterAdmin';
import NavbarAdmin from '../components/NavbarAdmin';

interface Booking {
  id: number;
  roomName: string;
  bookedBy: string;
  startTime: string;
  endTime: string;
  status: string;
}

const AllBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings'); // Adjust API endpoint if needed
        const data = await response.json();
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

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
              All Bookings
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
                    Room: {booking.roomName}
                  </Typography>
                  <Typography variant="body2">
                    Booked By: {booking.bookedBy}
                  </Typography>
                  <Typography variant="body2">
                    Time: {new Date(booking.startTime).toLocaleString()} –{' '}
                    {new Date(booking.endTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {booking.status}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography textAlign="center">No bookings available</Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <FooterAdmin />
    </Box>
  );
};

export default AllBookings;
