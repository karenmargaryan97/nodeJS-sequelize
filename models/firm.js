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
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        // generates deletedAt field
        paranoid: true
    });

    Firm.associate = (models) => {
        Firm.hasMany(models.Fund, {
            onDelete: 'cascade',
            hooks: false
        });
    };

    return Firm;
};
