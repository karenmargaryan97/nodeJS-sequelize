import models from '../../models';
import { NotFound } from '../errors';
import { NOT_EXISTS } from '../configs/constants';

export class FirmService {
    constructor() { }

    static async getById(id) {
        let firm = await models.Firm.findOne({
            where: { id }
        });

        if (!firm) {
            throw new NotFound(NOT_EXISTS('Firm'));
        }

        return firm;
    }

    static async getAll(options) {
        return await models.Firm.findAll({});
    }

    static async create(data) {
        return await models.Firm.create(data);
    }

    static async update(id, data) {
        return await models.Firm.update(data, {
            where: { id }
        });
    }

    static async delete(id, force = false) {
        return await models.Firm.destroy({ force });
    }
}
