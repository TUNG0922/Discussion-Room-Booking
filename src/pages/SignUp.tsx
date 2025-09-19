import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await axios.post('/api/auth/signup', { name, username: email, password, role });
      alert('Registration successful!');
      navigate('/signin');
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const goToSignIn = () => navigate('/signin');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E3A8A', // solid blue background
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: '#1E3A8A' }} // blue title
          >
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
            Fill in your details to get started
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              backgroundColor: '#1E3A8A', // solid blue button
              color: 'white',
              '&:hover': { backgroundColor: '#16326D' },
              borderRadius: 2,
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }} textAlign="center">
            Already have an account?{' '}
            <Link component="button" variant="body2" onClick={goToSignIn} sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
