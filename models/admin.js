import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default (sequelize, DataTypes) => {
    let Admin = sequelize.define('admins', {
        fullName: {
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

    Admin.prototype.generatePassword = function (pw) {
        return hashSync(pw, genSaltSync(8));
    };

    Admin.prototype.setPassword = function (pw) {
        this.password = hashSync(pw, genSaltSync(8));
    };

    Admin.prototype.comparePassword = function (pw) {
        return this.password && compareSync(pw, this.password);
    };

    return Admin;
}
