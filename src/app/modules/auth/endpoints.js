import { AuthController } from './auth.controller';
import middlewares from '../../middlewares/index';
import schemas from './schemas';

export default (router) => {
    router.post('/signup', ...middlewares(schemas, 'signup'), AuthController.signup);
};
