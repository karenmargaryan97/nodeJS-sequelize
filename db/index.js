import { Sequelize } from 'sequelize';
import params from '../src/configs/params';
import User from './models/user';
import Admin from './models/admin';
import Firm from './models/firm';
import Fund from './models/fund';
import Account from './models/account';
import { createNamespace } from 'continuation-local-storage';

const namespace = createNamespace('cls_space');
Sequelize.useCLS(namespace);

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
    Fund: db.import('./fund', Fund),
    Account: db.import('./account', Account)
};

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = db;
models.Sequelize = Sequelize;

export default models;
