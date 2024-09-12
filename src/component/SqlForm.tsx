import React, {useState} from 'react';
import {
    Box, Button, Select, MenuItem, TextField, Typography, Paper, IconButton, Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const SQLQueryForm: React.FC = () => {
    const [sqlResult, setSqlResult] = useState('{}');
    const [productId, setProductId] = useState('');
    const [environment, setEnvironment] = useState('');
    const [type, setType] = useState('');
    const [connection, setConnection] = useState('');
    const [schema, setSchema] = useState('');
    const [port, setPort] = useState('');
    const [host, setHost] = useState('');
    const [database, setDatabase] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [comment, setComment] = useState('');

    const handleExecute = () => {
        if (productId) {
            setSqlResult(`{ "product_id": ${productId} }`);
        } else {
            setSqlResult('{}');
        }
    };

    const handleReset = () => {
        setProductId('');
        setSqlResult('{}');
        setType('');
        setConnection('');
        setSchema('');
        setPort('');
        setHost('');
        setDatabase('');
        setUsername('');
        setPassword('');
        setComment('');
    };

    const handleEnvironmentChange = (env: string) => {
        setEnvironment(env);
        if (env === 'oracle') {
            setType('Oracle');
            setConnection('localhost');
            setSchema('default_schema');
            setPort(' ');
            setHost(' ');
            setDatabase(' ');
            setUsername(' ');
            setPassword('123456789');
        } else if (env === 'postgres') {
            setType('postgres');
            setPort('5432');
            setHost('localhost');
            setDatabase('postgres');
            setSchema('public');
            setUsername('postgres');
            setConnection(' ');
            setPassword('123456789');
            setComment(' ');
        } else {
            setType(' ');
            setConnection(' ');
            setSchema(' ');
            setPort(' ');
            setHost(' ');
            setDatabase(' ');
            setUsername(' ');
            setPassword('123456789');
        }
    };

    return (
        <Box sx={{display: 'flex', gap: 4, padding: 4}}>
            <Box sx={{flex: 1}}>
                {/* SQL Header */}
                <Typography variant="h4" gutterBottom>SQL</Typography>

                {/* Dropdown for Environment */}
                <Typography variant="body1">Environment</Typography>
                <Select
                    value={environment}
                    onChange={(e) => handleEnvironmentChange(e.target.value as string)}
                    displayEmpty
                    sx={{marginBottom: 2, minWidth: 200}}
                >
                    <MenuItem value="">
                        <em>Select Environment</em>
                    </MenuItem>
                    <MenuItem value="oracle">Oracle</MenuItem>
                    <MenuItem value="postgres">Postgres</MenuItem>
                </Select>

                {/* SQL Text Field */}
                <TextField
                    label="SQL to execute"
                    multiline
                    rows={3}
                    value={`select * from products where product_id = "${productId}"`}
                    fullWidth
                    sx={{marginBottom: 2}}
                    disabled
                />

                {/* Buttons: Execute, Test Connection, Reset */}
                <Box sx={{display: 'flex', gap: 2, marginBottom: 2}}>
                    <Button
                        variant="contained"
                        onClick={handleExecute}
                        sx={{flex: 1}}
                    >
                        EXECUTE
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{flex: 1}}
                    >
                        TEST CONNECTION
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleReset}
                        sx={{flex: 1}}
                    >
                        RESET
                    </Button>
                </Box>

                {/* SQL Result Section */}
                <Typography variant="body1">SQL Result</Typography>
                <Paper variant="outlined" sx={{padding: 2, marginBottom: 2, height: 100, overflow: 'auto'}}>
                    <Typography>{sqlResult}</Typography>
                </Paper>

                {/* Bottom Status Buttons */}
                <Box sx={{display: 'flex', gap: 2}}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        THIS SQL SUCCEEDED IN THE CURRENT TASK
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                    >
                        FAILURE
                    </Button>
                </Box>
            </Box>

            {/* Conditional Form for Oracle/Postgres */}
            {(environment === 'oracle' || environment === 'postgres') && (
                <Paper
                    variant="outlined"
                    sx={{
                        minWidth: 400,
                        padding: 3,
                        marginLeft: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        position: 'relative',
                        display: 'inline-block',  // Dynamically adjust height based on content
                    }}
                >
                    {/* Info Button with Bigger Text */}
                    <Tooltip
                        title={<Typography variant="body1">The values below are default values, please change them
                            accordingly to your data</Typography>}
                        arrow
                    >
                        <IconButton
                            size="small"
                            sx={{position: 'absolute', top: 8, right: 8}}
                        >
                            <InfoIcon/>
                        </IconButton>
                    </Tooltip>

                    <Typography variant="h6" gutterBottom>Database Credentials</Typography>

                    <TextField
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                        sx={{
                            marginBottom: 2,
                            '& .MuiInputLabel-root': {
                                color: '#1565c0',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <TextField
                        label="Connection"
                        value={connection}
                        onChange={(e) => setConnection(e.target.value)}
                        fullWidth
                        sx={{
                            marginBottom: 2,
                            '& .MuiInputLabel-root': {
                                color: '#1565c0',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <TextField
                        label="Schema"
                        value={schema}
                        onChange={(e) => setSchema(e.target.value)}
                        fullWidth
                        sx={{
                            marginBottom: 2,
                            '& .MuiInputLabel-root': {
                                color: '#1565c0',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    {environment === 'postgres' && (
                        <>
                            <TextField
                                label="Port"
                                value={port}
                                onChange={(e) => setPort(e.target.value)}
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                    '& .MuiInputLabel-root': {
                                        color: '#1565c0',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                            <TextField
                                label="Host"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                    '& .MuiInputLabel-root': {
                                        color: '#1565c0',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                            <TextField
                                label="Database"
                                value={database}
                                onChange={(e) => setDatabase(e.target.value)}
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                    '& .MuiInputLabel-root': {
                                        color: '#1565c0',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                            <TextField
                                label="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                sx={{
                                    marginBottom: 2,
                                    '& .MuiInputLabel-root': {
                                        color: '#1565c0',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </>
                    )}
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        sx={{
                            marginBottom: 2,
                            '& .MuiInputLabel-root': {
                                color: '#1565c0',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        sx={{
                            marginBottom: 2,
                            '& .MuiInputLabel-root': {
                                color: '#1565c0',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Paper>
            )}

        </Box>
    );
};

export default SQLQueryForm;
