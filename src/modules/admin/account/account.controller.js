import AccountService from '../../../services/account.service';
import { SUCCESS_CODE } from '../../../configs/status-codes';

export class AccountController {
    static async create(req, res, next) {
        const payload = req.body;
        try {
            const account = await AccountService.create(payload);

            return res.status(SUCCESS_CODE).json(account);
        } catch(err) {
            next(err);
        }
    }

    static async edit(req, res, next) {
        const { id } = req.params;
        const { legalName, entityNumber } = req.body;
        try {
            const account = await AccountService.getById(id);

            let updatedAccount = await AccountService.update(account.id, { legalName, entityNumber });

            return res.status(SUCCESS_CODE).json(updatedAccount);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            const account = await AccountService.getById(id);

            await AccountService.delete(account.id);

            return res.status(SUCCESS_CODE).json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    static async getOne(req, res, next) {
        const { id } = req.params;
        try {
            const account = await AccountService.getById(id, [], ['fund']);

            return res.status(SUCCESS_CODE).json(account);
        } catch(err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
        const query = req.query;
        try {
            const accounts = await AccountService.getAll(query);

            return res.status(SUCCESS_CODE).json(accounts);
        } catch (e) {
            next(e);
        }
    }
}
