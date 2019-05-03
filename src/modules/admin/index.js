import { Router } from 'express';
import authEndpoints from './auth/endpoints';
import firmEndpoints from './firm/endpoints';

export default class AdminModule {
    apiRouter;
    router;

    constructor(apiRouter) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    createEndpoints() {
        this.assignRouter();
        this.assignEndpoints();
    }

    assignRouter() {
        this.apiRouter.use('/admin', this.router);
    }

    assignEndpoints() {
        authEndpoints(this.router);
        firmEndpoints(this.router);
    }
}
