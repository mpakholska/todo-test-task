import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

type Config = {
  common: {
    port: number;
  };
  db: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
};

export const config: Config = {
  common: {
    port: Number(process.env.PORT) || 3000,
  },
  db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '12456',
    name: process.env.DB_NAME || 'db',
  },
};
