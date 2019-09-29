export default (sequelize, DataTypes) => {
    let Account = sequelize.define('accounts', {
        legalName: {
            type: DataTypes.STRING,
            unique: true
        },
        entityNumber: {
            type: DataTypes.STRING,
            unique: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        indexes: [{ fields: ['fundId'], unique: false }],
        paranoid: true
    });

    Account.associate = (models) => {
        Account.belongsTo(models.Fund, {
            as: 'fund',
            foreignKey: 'fundId',
            onDelete: 'cascade'
        });
        Account.hasMany(models.User, {
            as: 'users',
            onDelete: 'cascade'
        });
    };

    return Account;
};
