import { Sequelize } from 'sequelize';
import params from '../src/configs/params';
import User from './user';
import Admin from './admin';
import Firm from './firm';
import Fund from './fund';

const db = new Sequelize(
    params.database,
    params.dbUsername,
    params.dbPassword,
    {
        dialect: 'postgres',
        host: 'localhost'
    }
);

const models = {
    Admin: db.import('./admin', Admin),
    User: db.import('./user', User),
    Firm: db.import('./firm', Firm),
    Fund: db.import('./fund', Fund)
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = db;
models.Sequelize = Sequelize;

export default models;
