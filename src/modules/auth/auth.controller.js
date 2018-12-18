import { SUCCESS_CODE } from '../../configs/status-codes';
import { UserService } from '../../services/user.service';
import {BadRequest} from "../../errors";
import Utils from "../../helpers/Utils";

export class AuthController {

    static async signup(req, res, next) {
        const payload = req.body;
        try {
            let user = await UserService.getByEmail(payload.email);

            if (user) {
                throw new BadRequest('Email already used');
            } else {
                user = await UserService.create(payload);
            }

            const tokenInfo = await Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE).json({
                token: tokenInfo.token,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            });
        } catch(err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            let user = await UserService.check(email, password);

            const tokenInfo = await Utils.signJWTToken(user);

            return res.status(SUCCESS_CODE).json({
                access_token: tokenInfo.token,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            })
        } catch(err) {
            next(err);
        }
    }

    static async logout(req, res, next) {
        try {
            console.log(req.user);
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
