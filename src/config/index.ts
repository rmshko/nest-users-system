const {
  PORT = '3000',
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_USER = 'admin',
  DB_PASSWORD = 'superuser',
  DB_NAME = 'users',
  SECRET_KEY = 'default-secret',
} = process.env;

export default () => ({
  port: parseInt(PORT, 10),
  mongodb: {
    uri: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
  jwt: {
    secret: SECRET_KEY,
  },
});
