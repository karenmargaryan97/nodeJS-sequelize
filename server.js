process.stdout.write(`\u001B[2J\u001B[0;0f`);

import http from 'http';
import params from './src/configs/params';
import App from './src/app';
import db from './models';
const PID = process.pid;

const server = http.createServer(App());

process.on('SIGINT', () => {
    db.sequelize.close().then(() => process.exit(0));
});

db.sequelize.sync({}).then(() => {
    server.listen(params.apiPort, () => {
        console.log(`Listening ${server.address().port} port. Process: ${PID}`);
    });
});

