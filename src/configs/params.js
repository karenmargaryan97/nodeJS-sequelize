import {
    apiUrl,
    apiPort,
    tokenSecret,
    adminTokenSecret,
    dbUsername,
    dbPassword,
    database
} from '../helpers/config';

const params = {
    development: {
        apiUrl,
        apiPort,
        tokenSecret,
        adminTokenSecret,
        dbUsername,
        dbPassword,
        database
    },
    production: {
        apiUrl,
        apiPort,
        tokenSecret,
        adminTokenSecret,
        dbUsername,
        dbPassword,
        database
    }
};

export default params[process.env.NODE_ENV || 'development'];
