import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
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

      localStorage.setItem('username', email);
      localStorage.setItem('userRole', data.role);

      if (data.role === 'user') navigate('/user-dashboard');
      else if (data.role === 'admin') navigate('/admin-dashboard');
      else alert('Invalid role');
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Sign In failed. Please check your credentials.');
    }
  };

  const goToSignUp = () => navigate('/signup');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6D5BBA, #8D58BF, #A079C7)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          mt={-10}
          p={6}
          borderRadius={3}
          sx={{
            backgroundColor: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ background: 'linear-gradient(90deg, #6D5BBA, #8D58BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Sign in to continue
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
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6D5BBA, #8D58BF)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(to right, #8D58BF, #A079C7)',
              },
            }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>

          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={goToSignUp}
              sx={{
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
