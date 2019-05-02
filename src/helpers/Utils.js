import * as jwt from 'jsonwebtoken';
import params from '../configs/params';
import {BadRequest} from "../errors";

export default class Utils {
    static signJWTToken(data, admin = false) {
        const payload = { email: data.email, createdAt: data.createdAt };
        const secret = admin ? params.adminTokenSecret: params.tokenSecret;

        const token = jwt.sign(payload, secret);

        return { token };
    }

    static verifyJWTToken(token, admin = false) {
        const secret = admin ? params.adminTokenSecret: params.tokenSecret;
        try {
            return jwt.verify(token, secret);

        } catch (e) {
            throw new BadRequest('Invalid token');
        }
    }
}
