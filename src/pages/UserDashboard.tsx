import { Box, Button, Card, CardContent, Chip, Container, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface Room {
  id: number;
  name: string;
  status: string; // "available" | "booked"
}

const UserDashboard: React.FC = () => {
  const username = localStorage.getItem('username');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        const data = await response.json();
        setRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleBook = async (roomId: number) => {
    const username = localStorage.getItem('username') || 'Guest';

    try {
      const response = await fetch(`/api/rooms/${roomId}/book`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }), // 👈 send username
      });

      if (response.ok) {
        const updatedRoom = await response.json();
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId ? updatedRoom : room
          )
        );
      } else {
        console.error('Failed to book room:', await response.text());
      }
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  const columns: GridColDef<Room>[] = [
    { field: 'id', headerName: 'ID', width: 100, sortable: true },
    { field: 'name', headerName: 'Room Name', flex: 1, minWidth: 200, sortable: true },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 180,
      sortable: true,
      renderCell: (params: GridRenderCellParams<Room, string>) => {
        const status = (params.value || '').toString().toLowerCase();
        return (
          <Chip
            label={status === 'available' ? 'Available' : 'Booked'}
            sx={{
              fontWeight: 'bold',
              fontSize: '0.9rem',
              px: 2,
              py: 1,
              borderRadius: '8px',
              color: status === 'available' ? '#2e7d32' : '#c62828',
              backgroundColor: status === 'available' ? '#c8e6c9' : '#ffcdd2',
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Room>) => {
        const status = (params.row.status || '').toString().toLowerCase();
        return (
          <Button
            variant="contained"
            onClick={() => handleBook(params.row.id)}
            disabled={status !== 'available'}
            sx={{
              fontWeight: 'bold',
              borderRadius: '8px',
              textTransform: 'none',
              backgroundColor: status === 'available' ? '#1976d2' : '#9e9e9e',
              '&:hover': {
                backgroundColor: status === 'available' ? '#1565c0' : '#9e9e9e',
              },
            }}
          >
            {status === 'available' ? 'Book' : 'Booked'}
          </Button>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #4b0082 0%, #8a2be2 100%)',
      }}
    >
      <Navbar />

      <Box sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
          {/* Welcome Card */}
          <Card
            sx={{
              p: 5,
              borderRadius: 3,
              boxShadow: 8,
              background: 'linear-gradient(135deg, #6D5BBA, #8D58BF)',
              color: 'white',
              textAlign: 'center',
              mb: 6,
            }}
          >
            <CardContent>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Welcome Back, {username || 'User'}!
              </Typography>
              <Typography variant="h6">
                Here you can view all available rooms and book them instantly.
              </Typography>
            </CardContent>
          </Card>

          {/* Rooms Table */}
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: 10,
              backgroundColor: 'white',
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                All Rooms
              </Typography>

              <DataGrid
                rows={rooms}
                columns={columns}
                loading={loading}
                disableRowSelectionOnClick
                sortingOrder={['asc', 'desc']}
                filterMode="client"
                hideFooter
                autoHeight
                sx={{
                  border: 'none',
                  fontSize: '1rem',
                  rowHeight: 70,
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f3f4f6',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#fafafa',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default UserDashboard;
