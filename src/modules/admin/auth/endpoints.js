import { AuthController } from './auth.controller';
import middlewares from '../../../middlewares';
import schemas from './schemas';

export default (router) => {
    router.post('/signup', ...middlewares(schemas, 'signup'), AuthController.signup);
    router.post('/login', ...middlewares(schemas, 'login'), AuthController.login);
    router.get('/logout', ...middlewares(schemas, 'logout'), AuthController.logout);
};
