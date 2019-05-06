import models from '../../models';
import { NOT_EXISTS } from '../configs/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthError } from '../errors';

export const AdminPassport = (secret, passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await models.Admin.findOne({
            where: { id }
        });
        console.log(user);
        user ? done(null, user) : done(new AuthError(NOT_EXISTS), null);
    });

    let jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };

    let strategy = new Strategy (jwtOptions, async (payload, next) => {
        let user = await models.Admin.findOne({
            where: { id: payload.id }
        });

        if (user) {
            next(null, user);
        } else {
            next(new AuthError(NOT_EXISTS), false);
        }
    });
    passport.use('admin-rule', strategy);
};
