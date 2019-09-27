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
        },
        role: {
            type: DataTypes.ENUM([ 'SA', 'FA' ]),
            allowNull: false,
            validate: {
                notNull: { message: "Role is required" },
            },
        }
    });

    Admin.prototype.generatePassword = function (pw) {
        return hashSync(pw, genSaltSync(8));
    };

    Admin.prototype.comparePassword = function (pw) {
        return this.password && compareSync(pw, this.password);
    };

    return Admin;
}
