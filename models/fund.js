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
    });

    Fund.associate = (models) => {
        Fund.belongsTo(models.Firm, {
            foreignKey: 'id',
        });
    };

    return Fund;
};
