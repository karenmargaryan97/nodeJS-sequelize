import validator from './validator';
import passport from './passport';
import { ADMIN_AUTH, USER_AUTH } from '../configs/constants';

export default (schemas, actionName) => {
    let middlewares = [];

    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].authentication) {
        let authenticationType = schemas[actionName].authenticationType || USER_AUTH;

        if (authenticationType === USER_AUTH) {
            middlewares.push(passport(USER_AUTH));
        } else if (authenticationType === ADMIN_AUTH) {
            middlewares.push(passport(ADMIN_AUTH));
        }
    }

    if (schemas[actionName].validation) {
        middlewares.push(validator(schemas[actionName].validation));
    }

    return middlewares;
};
