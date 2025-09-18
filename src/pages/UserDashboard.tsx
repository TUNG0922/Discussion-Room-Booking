import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import BookTime from '../components/BookTime';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface BookingSlot {
  startTime: string;
  endTime: string;
}

interface Room {
  id: number;
  name: string;
  bookings?: BookingSlot[];
}

const UserDashboard: React.FC = () => {
  const username = localStorage.getItem('username') || 'Guest';
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, '0')}:00`
  );

  // Fetch all rooms
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

  useEffect(() => {
    fetchRooms();
  }, []);

  // Handle booking
  const handleBook = async (roomId: number, startTime: string, endTime: string) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}/book`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, startTime, endTime }),
      });

      if (response.ok) {
        const updatedRoom = await response.json();
        setRooms((prev) =>
          prev.map((room) => (room.id === roomId ? updatedRoom : room))
        );
        setSelectedRoom(null);
      } else {
        const errorMsg = await response.text();
        alert(errorMsg); // show backend error
        // Refresh the room to get updated bookings
        const freshResp = await fetch(`/api/rooms/${roomId}`);
        const freshRoom = await freshResp.json();
        setRooms((prev) =>
          prev.map((room) => (room.id === roomId ? freshRoom : room))
        );
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
      flex: 2,
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Room>) => {
        const room = params.row;
        const bookedSlots = room.bookings || [];

        return bookedSlots.length >= hours.length ? (
          <Chip
            label="Not Available"
            sx={{
              fontWeight: 'bold',
              fontSize: '0.9rem',
              px: 2,
              py: 1,
              borderRadius: '8px',
              color: '#c62828',
              backgroundColor: '#ffcdd2',
            }}
          />
        ) : (
          <Chip
            label="Available"
            sx={{
              fontWeight: 'bold',
              fontSize: '0.9rem',
              px: 2,
              py: 1,
              borderRadius: '8px',
              color: '#2e7d32',
              backgroundColor: '#c8e6c9',
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
      renderCell: (params: GridRenderCellParams<Room>) => (
        <Button
          variant="contained"
          onClick={() => setSelectedRoom(params.row)}
          sx={{
            fontWeight: 'bold',
            borderRadius: '8px',
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Book
        </Button>
      ),
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
                Welcome Back, {username}!
              </Typography>
              <Typography variant="h6">
                View available rooms and book instantly.
              </Typography>
            </CardContent>
          </Card>

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
                getRowId={(row) => row.id} // Ensure unique row id
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

      {selectedRoom && (
        <BookTime
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onBook={handleBook}
        />
      )}
    </Box>
  );
};

export default UserDashboard;
