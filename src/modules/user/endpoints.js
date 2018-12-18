import { UserController } from './user.controller';
import middlewares from '../../middlewares';
import schemas from './schemas';

export default (router) => {
    router.get('/', ...middlewares(schemas, 'getUser'), UserController.getUser);
};
