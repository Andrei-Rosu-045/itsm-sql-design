// configs/environmentConfigs.ts

import { SignalWifi1BarLockRounded } from "@mui/icons-material";

export interface EnvironmentConfig {
  id: string; 
  name: string;
  type: string;
  connection: string;
  schema: string;
  port: string;
  host: string;
  database: string;
  username: string;
  password: string;
  comment: string;
}

export const defaultConfig: EnvironmentConfig = {
  id: '', 
  name: 'Default Connection',
  type: '',
  connection: '',
  schema: '',
  port: '',
  host: '',
  database: '',
  username: '',
  password: '',
  comment: '',
};


export const environmentFields: { [key: string]: Array<keyof EnvironmentConfig> } = {
  oracle: ['connection', 'schema', 'username', 'password'],
  postgres: ['host', 'port', 'database', 'schema', 'username', 'password', 'comment'],
  // Add more database types and their respective fields here
};

export const defaultValuesByType: { [key: string]: Partial<EnvironmentConfig> } = {
  oracle: {
    connection: 'localhost:1521/XEPDB1',
    schema: 'HR',
    username: 'system',
    password: '',
  },
  postgres: {
    host: 'localhost',
    port: '5432',
    database: 'postgres',
    schema: 'public',
    username: 'postgres',
    password: '',
    comment: '',
  },
  // Add more database types and their default values here
};
