import models from '../../models';
import { NOT_EXISTS } from '../configs/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthError } from '../errors';

export default (secret, passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await models.User.findOne({
            where: { id }
        });
        user ? done(null, user) : done(new AuthError(NOT_EXISTS), null);
    });

    let jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };

    let strategy = new Strategy (jwtOptions, async (payload, next) => {
        let user = await models.User.findOne({
            where: { id: payload.id }
        });

        if (user) {
            next(null, user);
        } else {
            next(new AuthError(NOT_EXISTS), false);
        }
    });
    passport.use('jwt', strategy);
};
