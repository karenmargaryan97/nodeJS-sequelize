export default (sequelize, DataTypes) => {
    let Fund = sequelize.define('funds', {
        firm_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        indexes: [{ fields: ['firm_id'], unique: false }],
        paranoid: true
    });

    Fund.associate = (models) => {
        Fund.belongsTo(models.Firm, {
            foreignKey: 'firm_id',
            targetKey: 'id',
            as: 'firm'
        });
        Fund.hasMany(models.Account, {
            foreignKey: 'account_id',
            targetKey: 'id',
            as: 'accounts'
        });
    };

    return Fund;
};
