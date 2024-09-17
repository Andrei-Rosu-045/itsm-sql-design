import React, { useState } from 'react';
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DatabaseCredentialsForm from './DatabaseCredentialsForm';
import { EnvironmentConfig, defaultConfig } from './environmentConfigs';

const SQLQueryForm: React.FC = () => {
  const [sqlResult, setSqlResult] = useState('');
  const [credentials, setCredentials] = useState<EnvironmentConfig>({ ...defaultConfig });

  const handleExecute = () => {
    // Implement the logic to execute the SQL query using the provided credentials
    console.log('Executing SQL with credentials:', credentials);
    setSqlResult(`Executed SQL on ${credentials.type} database.`);
  };

  const handleReset = () => {
    setSqlResult('');
  };

  return (
    <Grid container spacing={4}>
      {/* Database Credentials Form */}
      <Grid item xs={12} md={credentials.type ? 8 : 12}>
        <DatabaseCredentialsForm credentials={credentials} onCredentialsChange={setCredentials} />
      </Grid>

      {/* Conditionally Render SQL Form */}
      {credentials.type && (
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              {/* SQL Header */}
              <Typography variant="h6" gutterBottom>
                SQL Editor
              </Typography>

              {/* SQL Text Field */}
              <TextField
                label="SQL Command"
                multiline
                rows={8}
                defaultValue={`SELECT * FROM products;`}
                fullWidth
                sx={{ marginBottom: 2 }}
                variant="outlined"
                InputProps={{
                  style: {
                    borderRadius: 12, // Apply rounded corners to the input field
                  },
                }}
              />

              {/* Buttons: Execute, Reset */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleExecute}
                  sx={{
                    flex: 1,
                    backgroundColor: '#81D4FA',
                    '&:hover': {
                      backgroundColor: '#4FC3F7',
                    },
                  }}
                  startIcon={<PlayArrowIcon />}
                >
                  Execute
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{
                    flex: 1,
                    borderColor: '#81D4FA',
                    color: '#81D4FA',
                    '&:hover': {
                      backgroundColor: '#E1F5FE',
                      borderColor: '#81D4FA',
                    },
                  }}
                  startIcon={<RestartAltIcon />}
                >
                  Reset
                </Button>
              </Box>
            </CardContent>

            {/* SQL Result Section */}
            {sqlResult && (
              <CardContent>
                <Typography variant="subtitle1">SQL Result</Typography>
                <Box
                  sx={{
                    padding: 2,
                    marginTop: 2,
                    maxHeight: 200,
                    overflow: 'auto',
                    backgroundColor: '#F5F5F5',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{sqlResult}</Typography>
                </Box>
              </CardContent>
            )}

            {/* Status Buttons */}
            <CardActions sx={{ justifyContent: 'flex-end', paddingRight: 2 }}>
              <Button
                variant="contained"
                color="success"
                sx={{
                  borderRadius: 12,
                  '&:hover': {
                    backgroundColor: '#43A047',
                  },
                }}
              >
                Success
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  borderColor: '#F44336',
                  color: '#F44336',
                  borderRadius: 12,
                  '&:hover': {
                    backgroundColor: '#FFEBEE',
                    borderColor: '#F44336',
                  },
                }}
              >
                Failure
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default SQLQueryForm;
