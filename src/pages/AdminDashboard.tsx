import { Box, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FooterAdmin from '../components/FooterAdmin';
import NavbarAdmin from '../components/NavbarAdmin';

interface Room {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard: React.FC = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('userRole');

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        const data = await response.json();
        if (Array.isArray(data)) {
          setRooms(data);
        } else if (Array.isArray(data.rooms)) {
          setRooms(data.rooms);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
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
            maxWidth: 1200, // make the card broader
            backgroundColor: '#ffffff',
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            p: 4,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            },
          }}
        >
          <CardContent>
            {/* Welcome Header */}
            <Box
              sx={{
                mb: 4,
                py: 2,
                px: 3,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #42a5f5, #1e88e5, #1976d2)',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {role === 'admin'
                  ? `Welcome Admin, ${username || ''}`
                  : `Welcome, ${username || 'User'}`}
              </Typography>
            </Box>

            {/* Rooms Section */}
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Rooms
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {loading ? (
              <Typography textAlign="center">Loading rooms...</Typography>
            ) : rooms.length > 0 ? (
              rooms.map((room) => (
                <Box
                  key={room.id}
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    transition: 'background 0.3s',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {room.name}
                    </Typography>
                    <Chip label={room.status} color={statusColor(room.status)} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(room.createdAt).toLocaleString()} | Updated:{' '}
                    {new Date(room.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography textAlign="center">No rooms available</Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <FooterAdmin />
    </Box>
  );
};

export default AdminDashboard;
