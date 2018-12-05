import validator from './validator';

export default (schemas, actionName) => {
    let middlewares = [];

    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].validation) {
        middlewares.push(validator(schemas[actionName].validation));
    }

    return middlewares;
};
