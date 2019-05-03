import { FirmController } from './firm.controller';
import middlewares from '../../../middlewares';
import schemas from './schemas';

export default (router) => {
    router.post('/firms', ...middlewares(schemas, 'saveFirm'), FirmController.create);
    // router.put('/firms/:id', ...middlewares(schemas, 'saveFirm'), FirmController.edit);
    router.get('/firms/:id', ...middlewares(schemas, 'firm'), FirmController.getOne);
    // router.get('/firms', ...middlewares(schemas, 'firm'), FirmController.getAll);
    // router.delete('/firms/:id', ...middlewares(schemas, 'firm'), FirmController.delete);
};
