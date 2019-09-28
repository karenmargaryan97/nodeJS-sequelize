import FundService from '../../../services/fund.service';
import { SUCCESS_CODE } from '../../../configs/status-codes';

export class FundController {
    static async create(req, res, next) {
        const payload = req.body;
        try {
            const fund = await FundService.create(payload);

            return res.status(SUCCESS_CODE).json(fund);
        } catch(err) {
            next(err);
        }
    }

    static async edit(req, res, next) {
        const { id } = req.params;
        const { legalName, entityNumber } = req.body;
        try {
            const fund = await FundService.getById(id);

            let updatedFirm = await FundService.update(fund.id, { legalName, entityNumber });

            return res.status(SUCCESS_CODE).json(updatedFirm);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            const firm = await FundService.getById(id);

            await FundService.delete(firm.id);

            return res.status(SUCCESS_CODE).json({ success: true });
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
