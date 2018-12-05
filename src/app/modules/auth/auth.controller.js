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
                user,
                token: tokenInfo.token
            });
        } catch(e) {
            next(e);
        }
    }
}
