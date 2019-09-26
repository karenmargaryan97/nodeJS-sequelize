export default (sequelize, DataTypes) => {
    let Firm = sequelize.define('firms', {
        firmName: {
            type: DataTypes.STRING,
            unique: true
        },
        entityNumber: {
            type: DataTypes.STRING,
            unique: true
        },
        logo: {
            type: DataTypes.STRING,
            unique: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Firm.associate = (models) => {
        Firm.hasMany(models.Fund, {
            foreignKey: 'firm_id',
            as: 'firm'
        })
    };

    return Firm;
};
