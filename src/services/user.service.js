import models from '../../db';
import { BadRequest } from '../errors';
import { INVALID_EMAIL_OR_PASSWORD } from '../configs/constants';
import { BaseService } from "./base.service";

class UserService extends BaseService {
    constructor(model, name) {
        super(model, name);
        this.model = model;
        this.name = name;
    }

    async create(attributes) {
        const data = {
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            email: attributes.email,
            password: attributes.password
        };

        data.password = this.model.build().generatePassword(data.password);

        return this.model.create(data);
    }

    async check(email, password) {
        let user = await this.getOneByParams({ email });

        if (!user && !this.model.build().comparePassword(password)) {
            throw new BadRequest(INVALID_EMAIL_OR_PASSWORD);
        }

        return user;
    }
}

export default new UserService(models.User, 'User');
