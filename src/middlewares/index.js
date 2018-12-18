import validator from './validator';
import passport from './passport';

export default (schemas, actionName) => {
    let middlewares = [];

    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].authentication) {
        middlewares.push(passport);
    }

    if (schemas[actionName].validation) {
        middlewares.push(validator(schemas[actionName].validation));
    }

    return middlewares;
};
