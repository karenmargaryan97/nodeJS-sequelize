import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default (sequelize, DataTypes) => {
    let User = sequelize.define('users', {
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'accounts',
                key: 'id'
            }
        },
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
    });

    User.associate = (models) => {
        User.belongsTo(models.Account);
    };

    User.prototype.generatePassword = function (pw) {
        return hashSync(pw, genSaltSync(8));
    };

    User.prototype.comparePassword = function (pw) {
        return this.password && compareSync(pw, this.password);
    };

    return User;
}
