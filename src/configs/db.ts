export default {
    "development": {
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": process.env.DATABASE_URL,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": process.env.DATABASE_URL,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": process.env.DATABASE_URL,
        "dialect": "mysql"
    }
};