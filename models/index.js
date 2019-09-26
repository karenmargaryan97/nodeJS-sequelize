import Sequelize from 'sequelize';
import params from '../src/configs/params';

const sequelize = new Sequelize(
    params.database,
    params.dbUsername,
    params.dbPassword,
    {
        dialect: 'postgres',
        host: 'postgres'
    }
);

const models = {
    Admin: sequelize.import('./admin'),
    User: sequelize.import('./user'),
    Firm: sequelize.import('./firm'),
    Fund: sequelize.import('./fund')
};

Object.keys(models).forEach((modelName) => {
    console.log(models);
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
