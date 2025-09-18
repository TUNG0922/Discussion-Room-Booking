import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('/api/auth/signin', {
        username: email,
        password,
        role,
      });

      const data = response.data;

      if (!data.success) {
        alert(data.message);
        return;
      }

      // Save username/email in localStorage to display in dashboard
      localStorage.setItem('username', email);
      localStorage.setItem('userRole', data.role);

      // Navigate based on role
      if (data.role === 'user') {
        navigate('/user-dashboard');
      } else if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        alert('Invalid role');
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Sign In failed. Please check your credentials.');
    }
  };

  const goToSignUp = () => navigate('/signup');

  return (
    <Container maxWidth="sm">
      <Box
        mt={10}
        p={5}
        boxShadow={4}
        borderRadius={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Sign In
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
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
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>

        <Typography variant="body2">
          Don't have an account?{' '}
          <Link component="button" variant="body2" onClick={goToSignUp}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
