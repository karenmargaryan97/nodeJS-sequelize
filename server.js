process.stdout.write(`\u001B[2J\u001B[0;0f`);

import http from 'http';
import params from './src/configs/params';
import App from './src/app';
import db from './db';

const PID = process.pid;
const force = process.env.NODE_ENV === 'development' && process.argv[2] && process.argv[2] === 'force';
const server = http.createServer(App());

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

process.on('SIGINT', () => {
    db.sequelize.close().then(() => process.exit(0));
});

db.sequelize.authenticate()
    .then(() => {
        console.info('Connection has been established successfully.');
        return db.sequelize.sync({ force }).then(() => {
            server.listen(params.apiPort, () => {
                console.info(`Listening ${server.address().port} port. Process: ${PID}`);
            });
        });
    })
    .catch(err => {
        console.error('Database connection: error - ' + err);
});
