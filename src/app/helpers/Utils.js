import * as jwt from 'jsonwebtoken';
import params from '../configs/params';
import {BadRequest} from "../errors";

export default class Utils {
    static signJWTToken(data) {
        const payload = { email: data.email, fullName: data.fullName };

        const token = jwt.sign(payload, params.tokenSecret);

        return { token };
    }

    static verifyJWTToken(token) {
        try {
            return jwt.verify(token, params.tokenSecret);

        } catch (e) {
            throw new BadRequest('Invalid token');
        }
    }
}
