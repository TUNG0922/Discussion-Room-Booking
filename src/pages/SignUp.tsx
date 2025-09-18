import { Button, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');       // New name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');   // default role
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Send POST request to backend with name
      await axios.post('/api/auth/signup', { name, username: email, password, role });

      alert('Registration successful!');
      navigate('/signin');
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  const goToSignIn = () => {
    navigate('/signin');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Please fill in your details to sign up.
        </Typography>

        {/* Name Field */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link component="button" variant="body2" onClick={goToSignIn}>
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUp;
