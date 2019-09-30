import models from '../../db';
import { BaseService } from "./base.service";

class FundService extends BaseService {
    constructor(model, name) {
        super(model, name);
        this.model = model;
        this.name = name;
    }

    async getAll(options) {
        return this.model.findAll(options);
    }
}

export default new FundService(models.Fund, 'Fund');
