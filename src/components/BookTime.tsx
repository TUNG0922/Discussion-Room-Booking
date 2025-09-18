import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface BookingSlot {
  startTime: string;
  endTime: string;
}

interface Room {
  id: number;
  name: string;
}

interface BookTimeProps {
  room: Room;
  onClose: () => void;
  onBook: (roomId: number, startTime: string, endTime: string) => void;
}

const BookTime: React.FC<BookTimeProps> = ({ room, onClose, onBook }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState<BookingSlot[]>([]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, '0')}:00`
  );

  // Fetch current bookings for this room
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/rooms/${room.id}`);
        const data = await response.json();

        const slots: BookingSlot[] = [];
        if (data.startTime && data.endTime) {
          slots.push({ startTime: data.startTime, endTime: data.endTime });
        }

        setBookedSlots(slots);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setBookedSlots([]);
      }
    };

    fetchBookings();
  }, [room.id]);

  // Check if a specific hour is already booked
  const isHourBooked = (hour: number) =>
    bookedSlots.some((slot) => {
      const start = parseInt(slot.startTime.split(':')[0], 10);
      const end = parseInt(slot.endTime.split(':')[0], 10);
      return hour >= start && hour < end;
    });

  // Start times that are free
  const availableStartTimes = hours.filter(
    (h) => !isHourBooked(parseInt(h.split(':')[0], 10))
  );

  // End times consecutive after startTime, max 2 hours, must be free
  const getAvailableEndTimes = () => {
    if (!startTime) return [];
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endTimes: string[] = [];
    for (let i = startHour + 1; i <= startHour + 2 && i < 24; i++) {
      if (isHourBooked(i)) break; // stop if next hour is booked
      endTimes.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return endTimes;
  };

  const handleSubmit = () => {
    if (!startTime || !endTime) {
      alert('Please select both start and end times.');
      return;
    }
    onBook(room.id, startTime, endTime);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Book Room: {room.name}
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Start Time</InputLabel>
          <Select
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setEndTime(''); // reset end time
            }}
          >
            {availableStartTimes.map((h) => (
              <MenuItem key={h} value={h}>
                {h}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }} disabled={!startTime}>
          <InputLabel>End Time</InputLabel>
          <Select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
            {getAvailableEndTimes().map((h) => (
              <MenuItem key={h} value={h}>
                {h}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!startTime || !endTime}
          >
            Book
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookTime;
