process.stdout.write(`\u001B[2J\u001B[0;0f`);

import http from 'http';
import params from './app/configs/params';
import App from './app/app';
import db from '../models';

const server = http.createServer(App());

db.sequelize.sync({}).then(() => {
    server.listen(params.apiPort, () => {
        console.log(`Listening ${server.address().port} port.`);
    });
});

