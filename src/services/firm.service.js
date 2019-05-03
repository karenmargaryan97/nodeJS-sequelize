import models from '../../models';

export class FirmService {
    constructor() { }

    static async getById(id) {
        return await models.Firm.findOne({
            where: { id }
        });
    }

    static async create(data) {
        return await models.Firm.create(data);
    }
}