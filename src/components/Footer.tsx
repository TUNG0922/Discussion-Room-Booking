import { Box, Link, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        background: 'linear-gradient(135deg, #7e57c2, #9c6ede)', // lighter purple gradient
        color: '#f0f0f0', // soft text color for contrast
        textAlign: 'center',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()}. All rights reserved.{' '}
        <Link href="#" sx={{ color: '#e0e0e0', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
