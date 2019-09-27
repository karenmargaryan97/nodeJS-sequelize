import models from '../../models';
import { BadRequest } from '../errors';
import { INVALID_EMAIL_OR_PASSWORD } from '../configs/constants';
import { BaseService } from "./base.service";

class AdminService extends BaseService {
    constructor(model, name) {
        super(model, name);
        this.model = model;
        this.name = name;
    }

    async check(email, password) {
        let admin = await this.getOneByParams({ email });

        if (!admin && !this.model.build().comparePassword(password)) {
            throw new BadRequest(INVALID_EMAIL_OR_PASSWORD);
        }

        return admin;
    }

    async create(attributes) {

        const data = {
            fullName: attributes.fullName,
            email: attributes.email,
            role: attributes.role,
            password: attributes.password
        };

        data.password = this.model.build().generatePassword(data.password);

        return this.model.create(data);
    }
}

export default new AdminService(models.Admin, 'Admin');
