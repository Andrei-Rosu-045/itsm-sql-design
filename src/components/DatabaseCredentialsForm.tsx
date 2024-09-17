import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Tooltip,
  IconButton,
  Paper,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  EnvironmentConfig,
  defaultConfig,
  environmentFields,
  defaultValuesByType,
} from './environmentConfigs';

interface Props {
  credentials: EnvironmentConfig;
  onCredentialsChange: (credentials: EnvironmentConfig) => void;
}

const DatabaseCredentialsForm: React.FC<Props> = ({ credentials, onCredentialsChange }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // New state to manage saving status

  // Handle input changes
  const handleInputChange =
    (field: keyof EnvironmentConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsDirty(true);
      onCredentialsChange({
        ...credentials,
        [field]: event.target.value,
      });
    };

  // Update the event type to SelectChangeEvent
  const handleTypeChange = (event: SelectChangeEvent) => {
    const type = event.target.value as string;
    setIsDirty(true);

    // Get default values for the selected type
    const defaultValues = defaultValuesByType[type] || {};

    onCredentialsChange({
      ...credentials,
      type,
      ...defaultValues, // Spread default values into the credentials
    });
  };

  // Clone the current configuration
  const handleClone = () => {
    const clonedConfig = { ...credentials };
    clonedConfig.name += ' (Clone)';
    setIsDirty(true);
    onCredentialsChange(clonedConfig);
  };

  // Reset to default configuration
  const handleReset = () => {
    setIsDirty(false);
    onCredentialsChange({ ...defaultConfig });
  };

  // Test the database connection
  const handleTestConnection = () => {
    // Implement the logic to test the database connection
    console.log('Testing connection with credentials:', credentials);
  };

  // Save the current configuration
  const handleSave = async () => {
    // Validate that the required fields are filled out
    if (!credentials.id || !credentials.type || !credentials.name) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSaving(true); // Indicate that saving is in progress

    // Construct the URL
    const organisation = 'me'; // Replace 'me' with your actual organisation name if different
    const connectionId = credentials.id;
    const url = `http://localhost:1234/url/itsm/${organisation}/databaseConnection/${connectionId}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        console.log('Database connection saved successfully.');
        alert('Database connection saved successfully.');
        setIsDirty(false);
      } else {
        const errorData = await response.text();
        console.error('Failed to save database connection:', errorData);
        alert(`Failed to save database connection: ${errorData}`);
      }
    } catch (error) {
      console.error('Error saving database connection:', error);
      alert(`Error saving database connection: ${error}`);
    } finally {
      setIsSaving(false); // Reset saving status
    }
  };

  // Determine which fields to display based on the selected type
  const fieldsToDisplay = environmentFields[credentials.type] || [];

  return (
    <Paper
      variant="outlined"
      sx={{
        minWidth: 400,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {/* Info Button */}
      <Tooltip
        title={
          <Typography variant="body1">Configure your database connection details here.</Typography>
        }
        arrow
      >
        <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
          <InfoIcon />
        </IconButton>
      </Tooltip>

      {/* Form Title */}
      <Typography variant="h6" gutterBottom>
        Database Connection
      </Typography>

      {/* ID Field */}
      <TextField
        label="Connection ID"
        value={credentials.id}
        onChange={handleInputChange('id')}
        fullWidth
        sx={{ marginBottom: 2 }}
        required
      />

      {/* Type Field */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="database-type-label">Select Database Type</InputLabel>
        <Select
          labelId="database-type-label"
          value={credentials.type}
          onChange={handleTypeChange}
          label="Select Database Type"
        >
          <MenuItem value="">
            <em>Select Database Type</em>
          </MenuItem>
          <MenuItem value="oracle">Oracle</MenuItem>
          <MenuItem value="postgres">Postgres</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>

      {/* Conditionally Rendered Fields */}
      {credentials.type &&
        fieldsToDisplay.map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={credentials[field] || ''}
            onChange={handleInputChange(field)}
            fullWidth
            sx={{ marginBottom: 2 }}
            type={field === 'password' ? 'password' : 'text'}
          />
        ))}

      {/* Connection Name Field */}
      <TextField
        label="Connection Name"
        value={credentials.name}
        onChange={handleInputChange('name')}
        fullWidth
        sx={{ marginBottom: 2 }}
        required
      />

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        <Button variant="contained" onClick={handleClone} sx={{ flex: 1 }}>
          Clone
        </Button>
        <Button variant="outlined" onClick={handleTestConnection} sx={{ flex: 1 }}>
          Test Connection
        </Button>
        <Button variant="outlined" onClick={handleReset} sx={{ flex: 1 }}>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ flex: 1 }}
          disabled={!isDirty || isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Paper>
  );
};

export default DatabaseCredentialsForm;
