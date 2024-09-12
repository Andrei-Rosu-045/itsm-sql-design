import React from 'react';
import SqlForm from "./component/SqlForm";
import { Container } from '@mui/material';

const App: React.FC = () => {
  return (
      <Container maxWidth="sm">
        <SqlForm />
      </Container>
  );
};

export default App;
