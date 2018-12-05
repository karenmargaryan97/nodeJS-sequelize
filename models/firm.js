export default (sequelize, DataTypes) => {
    return sequelize.define('firm', {
        firmName: {
            type: DataTypes.STRING,
            unique: true
        },
        entityNumber: {
            type: DataTypes.STRING,
            unique: true
        }
    });
};
