export default (sequelize, DataTypes) => {
    return sequelize.define('firm', {
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
};
