export default (sequelize, DataTypes) => {
    let Account = sequelize.define('accounts', {
        legalName: {
            type: DataTypes.STRING,
            unique: true
        },
        entityNumber: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        indexes: [{ fields: ['fundId'], unique: false }],
        paranoid: true
    });

    Account.associate = (models) => {
        Account.belongsTo(models.Fund, {
            as: 'fund',
            foreignKey: 'fundId',
            onDelete: 'CASCADE'
        });
        Account.hasMany(models.User, {
            as: 'users'
        });
    };

    return Account;
};
