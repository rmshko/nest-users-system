const {
  PORT = '3000',
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_USER = 'admin',
  DB_PASSWORD = 'superuser',
  SECRET_KEY = 'default-secret',
} = process.env;

const mongoDbUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

export default () => ({
  port: parseInt(PORT, 10),
  mongodb: {
    users: {
      uri: `${mongoDbUri}/users`,
    },
  },
  jwt: {
    secret: SECRET_KEY,
  },
});
