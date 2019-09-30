import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default (sequelize, DataTypes) => {
    let User = sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        indexes: [{ fields: ['accountId'], unique: false }]
    });

    User.associate = (models) => {
        User.belongsTo(models.Account, {
            as: 'account',
            foreignKey: 'accountId'
        });
    };

    User.prototype.generatePassword = function (pw) {
        return hashSync(pw, genSaltSync(8));
    };

    User.prototype.comparePassword = function (pw) {
        return this.password && compareSync(pw, this.password);
    };

    return User;
}
