import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import FooterAdmin from '../components/FooterAdmin';
import NavbarAdmin from '../components/NavbarAdmin';

interface Room {
  id: number;
  name: string;
  status: string;
  bookedBy?: string | null;
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

  const statusChip = (status: string) => {
    const lower = status.toLowerCase();
    let color: 'success' | 'error' | 'warning' | 'default' = 'default';
    if (lower === 'available') color = 'success';
    else if (lower === 'booked') color = 'error';
    else if (lower === 'maintenance') color = 'warning';

    return <Chip label={status} color={color} size="small" />;
  };

  // Define table columns (no createdAt / updatedAt)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80, sortable: true },
    { field: 'name', headerName: 'Room Name', flex: 1, minWidth: 150, sortable: true },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      sortable: true,
      renderCell: (params: any) => statusChip(params.value),
    },
    {
      field: 'bookedBy',
      headerName: 'Booked By',
      flex: 1,
      minWidth: 200,
      sortable: true,
      renderCell: (params: any) => params.value ?? '—',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #42a5f5, #1e88e5, #1976d2)',
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

            {/* Rooms Data Table */}
            {loading ? (
              <Typography textAlign="center">Loading rooms...</Typography>
            ) : rooms.length > 0 ? (
              <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                  rows={rooms}
                  columns={columns}
                  disableColumnMenu
                  disableRowSelectionOnClick
                  autoHeight
                  hideFooter
                  sx={{
                    border: 'none',
                    boxShadow: 3,
                    '& .MuiDataGrid-cell': {
                      borderBottom: '1px solid #e0e0e0',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#f5f5f5',
                      fontWeight: 'bold',
                    },
                  }}
                />
              </div>
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
