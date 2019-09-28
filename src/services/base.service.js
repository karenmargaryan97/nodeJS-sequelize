import { NotFound } from '../errors';
import { NOT_EXISTS } from '../configs/constants';

export class BaseService {
    constructor(model, name) {
        this.model = model;
        this.name = name;
    }

    async getOneByParams(params = null, attributes = []) {
        if (params) {
            return this.model.findOne({
                where: params,
                attributes
            });
        }

        return this.model.findOne();
    }

    async getById(id, attributes = [], include = []) {
        const options = {};
        if (attributes.length) {
            options.attributes = attributes;
        }

        if (include.length) {
            options.include = include;
        }

        const result = await this.model.findByPk(id, options);

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
