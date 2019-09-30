export default (sequelize, DataTypes) => {
    let Firm = sequelize.define('firms', {
        firmName: {
            type: DataTypes.STRING,
            unique: true,
        },
        entityNumber: {
            type: DataTypes.STRING,
            unique: true
        },
        logo: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        paranoid: true
    });

    Firm.associate = (models) => {
        Firm.hasMany(models.Fund, {
            onDelete: 'CASCADE',
            hooks: false
        });
    };

    return Firm;
};
