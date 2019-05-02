import { SUCCESS_CODE } from '../../../configs/status-codes';
import { BadRequest } from '../../../errors';
import Utils from '../../../helpers/Utils';
import { AdminService } from '../../../services';

export class AuthController {

    static async signup(req, res, next) {
        const payload = req.body;
        try {
            let admin = await AdminService.getByEmail(payload.email);

            if (admin) {
                throw new BadRequest('Email already used');
            } else {
                admin = await AdminService.create(payload);
            }

            const tokenInfo = await Utils.signJWTToken(admin, true);

            return res.status(SUCCESS_CODE).json({
                token: tokenInfo.token,
                admin: {
                    id: admin.id,
                    fullName: admin.fullName,
                    email: admin.email
                }
            });
        } catch(err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            let admin = await AdminService.check(email, password);

            const tokenInfo = await Utils.signJWTToken(admin);

            return res.status(SUCCESS_CODE).json({
                access_token: tokenInfo.token,
                admin: {
                    id: admin.id,
                    fullName: admin.fullName,
                    email: admin.email
                }
            })
        } catch(err) {
            next(err);
        }
    }

    static async logout(req, res, next) {
        try {
            req.logout();

            return res.status(SUCCESS_CODE)
                .json({
                    success: true
                });
        } catch (err) {
            next(err);
        }
    }
}
