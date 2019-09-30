import FundService from '../../../services/fund.service';
import { CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE } from '../../../configs/status-codes';

export class FundController {
    static async create(req, res, next) {
        const payload = req.body;
        try {
            const fund = await FundService.create(payload);

            return res.status(CREATED_CODE).json(fund);
        } catch(err) {
            next(err);
        }
    }

    static async edit(req, res, next) {
        const { id } = req.params;
        const { legalName, entityNumber } = req.body;
        try {
            const fund = await FundService.getById(id);

            let updatedFund = await FundService.update(fund.id, { legalName, entityNumber });

            return res.status(SUCCESS_CODE).json(updatedFund);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            const fund = await FundService.getById(id);

            await FundService.delete(fund.id);

            return res.status(NO_CONTENT_CODE).json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    static async getOne(req, res, next) {
        const { id } = req.params;
        try {
            const fund = await FundService.getById(id, [], ['firm']);

            return res.status(SUCCESS_CODE).json(fund);
        } catch(err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
        const query = req.query;
        try {
            const funds = await FundService.getAll(query);

            return res.status(SUCCESS_CODE).json(funds);
        } catch (e) {
            next(e);
        }
    }
}
