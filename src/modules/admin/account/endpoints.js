import { AccountController } from './account.controller';
import middlewares from '../../../middlewares';
import schemas from './schemas';

export default (router) => {
    router.post('/accounts', ...middlewares(schemas, 'saveAccount'), AccountController.create);
    router.put('/accounts/:id', ...middlewares(schemas, 'saveAccount'), AccountController.edit);
    router.get('/accounts/:id', ...middlewares(schemas, 'account'), AccountController.getOne);
    router.get('/accounts', ...middlewares(schemas, 'account'), AccountController.getAll);
    router.delete('/accounts/:id', ...middlewares(schemas, 'account'), AccountController.delete);
};
