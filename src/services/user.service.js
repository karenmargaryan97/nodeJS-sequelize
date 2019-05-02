import models from '../../models';
import { BadRequest } from '../errors';
import { INVALID_EMAIL_OR_PASSWORD } from '../configs/constants';

export class UserService {
    static async create(attributes) {

        const data = {
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            email: attributes.email,
            password: attributes.password
        };

        data.password = models.User.build().generatePassword(data.password);

        return await models.User.create(data);
    }

    static async getByEmail(email) {
        return await models.User.findOne({
            where: { email }
        });
    }

    static async check(email, password) {
        let user = await this.getByEmail(email);

        if (!user && !models.User.build().comparePassword(password)) {
            throw new BadRequest(INVALID_EMAIL_OR_PASSWORD);
        }

        return user;
    }
}
