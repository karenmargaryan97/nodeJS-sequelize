import { FundController } from './fund.controller';
import middlewares from '../../../middlewares';
import schemas from './schemas';

export default (router) => {
    router.post('/funds', ...middlewares(schemas, 'saveFund'), FundController.create);
    router.put('/funds/:id', ...middlewares(schemas, 'saveFund'), FundController.edit);
    router.get('/funds/:id', ...middlewares(schemas, 'fund'), FundController.getOne);
    router.get('/funds', ...middlewares(schemas, 'fund'), FundController.getAll);
    router.delete('/funds/:id', ...middlewares(schemas, 'fund'), FundController.delete);
};
