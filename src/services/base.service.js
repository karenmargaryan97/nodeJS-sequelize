import { NotFound } from '../errors';
import { NOT_EXISTS } from '../configs/constants';

export class BaseService {
    constructor(model, name) {
        this.model = model;
        this.name = name;
    }

    async getOneByParams(params = null) {
        if (params) {
            return this.model.findOne({
                where: params
            });
        }

        return this.model.findOne();
    }

    async getById(id, include = []) {
        const result = await this.model.findOne({ where: { id }, include });

        if (!result) {
            throw new NotFound(NOT_EXISTS(this.name));
        }

        return result;
    }

    async getByParams(params = null) {
        if (params) {
            return this.model.findAll({ where: params });
        }

        return this.model.findAll({});
    }

    async create(data) {
        return this.model.create(data);
    }

    async delete(id, force = false) {
        return this.model.destroy({ where: { id }, force });
    }

    async update(id, attributes) {
        return this.model.update(attributes, {
            where: { id }
        });
    }
}
