import models from '../../../models';

export class UserService {
    static async create(attributes) {
        const data = {
            
        };
        return await models.User.create(data);
    }

    static async getByEmail(email) {
        return await models.User.findOne({
            where: { email }
        });
    }
}
