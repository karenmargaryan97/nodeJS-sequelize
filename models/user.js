import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default (sequelize, DataTypes) => {
    return sequelize.define('user', {
        fullName: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        instanceMethods: {
            generatePassword: function setUserPassword(pw) {
                return hashSync(pw, genSaltSync(8));
            },

            setPassword: function setUserPassword(pw) {
                this.password = hashSync(pw, genSaltSync(8));
            },

            comparePassword: function checkUserPassword(pw) {
                return this.password && compareSync(pw, this.password);
            },
        }
    });
}
