import React from 'react';
import SQLQueryForm from './components/SqlQueryForm';
import { Container, Box, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Database Manager
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Connect to your database and execute SQL commands effortlessly.
        </Typography>
        <SQLQueryForm />
      </Box>
    </Container>
  );
};

export default App;
