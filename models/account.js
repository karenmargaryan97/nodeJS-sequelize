export default (sequelize, DataTypes) => {
    let Account = sequelize.define('accounts', {
        fund_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'funds',
                key: 'id'
            }
        },
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
        indexes: [{ fields: ['fund_id'], unique: false }],
        paranoid: true
    });

    Account.associate = (models) => {
        Account.belongsTo(models.Fund);
        Account.hasMany(models.User, {
            as: 'users',
            onDelete: 'cascade'
        });
    };

    return Account;
};
