import Sequelize from 'sequelize';
import params from '../src/configs/params';

const sequelize = new Sequelize(
    params.database,
    params.dbUsername,
    params.dbPassword,
    {
        dialect: 'postgres',
        host: '127.0.0.1'
    }
);

const models = {
    User: sequelize.import('./user'),
    Firm: sequelize.import('./firm')
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
