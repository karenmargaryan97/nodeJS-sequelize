if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

import env from 'env-var';

export const mongoUrl = env.get('MONGODB_URI').asString();

export const apiUrl = env.get('API_URL').asString();
export const apiPort = env.get('PORT').asString();

export const database = env.get('DATABASE').asString();
export const dbUsername = env.get('DB_USERNAME').asString();
export const dbPassword = env.get('DB_PASSWORD').asString();

export const tokenSecret = env.get('TOKEN_SECRET').asString();
