import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default (sequelize, DataTypes) => {
    let User = sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    });

    User.prototype.generatePassword = function (pw) {
        return hashSync(pw, genSaltSync(8));
    };

    User.prototype.setPassword = function (pw) {
        this.password = hashSync(pw, genSaltSync(8));
    };

    User.prototype.comparePassword = function (pw) {
        return this.password && compareSync(pw, this.password);
    };

    return User;
}
