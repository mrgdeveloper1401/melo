export const configEnvironment = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "melodb",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": "5434",
    "logging": true
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "melodb_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": "5434"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}