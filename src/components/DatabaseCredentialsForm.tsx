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
  const handleSave = () => {
    // Implement the logic to save the configuration
    console.log('Saving configuration:', credentials);
    setIsDirty(false);
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
          disabled={!isDirty}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default DatabaseCredentialsForm;
