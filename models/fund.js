export default (sequelize, DataTypes) => {
    let Fund = sequelize.define('funds', {
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
        indexes: [{ fields: ['firmId'], unique: false }],
        paranoid: true
    });

    Fund.associate = (models) => {
        Fund.belongsTo(models.Firm, {
            as: 'firm',
            foreignKey: 'firmId'
        });
        Fund.hasMany(models.Account, {
            as: 'accounts'
        });
    };

    return Fund;
};
