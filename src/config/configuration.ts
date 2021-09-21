export const Config = () => ({
  nodeConfiguration: {
    environment: process.env.NODE_ENV || 'development',
    port: Number(process.env.NODE_PORT) || 5000,
  },
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    schema: process.env.DB_SCHEMA || 'users_schema',
    synchronize:
      ((process.env.DB_SYNCHRONIZATION == 'true') as boolean) || true,
    retryAttempts: 10,
    retryDelay: 3000,
    keepConnectionAlive: false,
    logging: true,
  },
  keys: {
    jwtServerSecret: process.env.JWT_SERVER_SECRET || 'sUp4hS3cr37kE9c0D3',
  },
});

export { Config as default };
