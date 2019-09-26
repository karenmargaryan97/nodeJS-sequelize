import models from '../../models';
import { BadRequest, NotFound } from '../errors';
import { INVALID_EMAIL_OR_PASSWORD, NOT_EXISTS } from '../configs/constants';

export class AdminService {
    constructor() { }

    static async getByEmail(email) {
        return await models.Admin.findOne({
            where: { email }
        });
    }

    static async check(email, password) {
        let admin = await this.getByEmail(email);

        if (!admin && !models.Admin.build().comparePassword(password)) {
            throw new BadRequest(INVALID_EMAIL_OR_PASSWORD);
        }

        return admin;
    }

    static async create(attributes) {

        const data = {
            fullName: attributes.fullName,
            email: attributes.email,
            role: attributes.role,
            password: attributes.password
        };

        data.password = models.Admin.build().generatePassword(data.password);

        return await models.Admin.create(data);
    }
}
