import { SUCCESS_CODE } from '../../configs/status-codes';
import { UserService } from '../../services/user.service';

export class UserController {

    static async getUser(req, res, next) {
        try {
            const user = await UserService.getByEmail(req.user.email);

            return res.status(SUCCESS_CODE).json(user);
        } catch(e) {
            next(e);
        }
    }
}
