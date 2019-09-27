import express from 'express';
import logger from 'morgan';
import { json, urlencoded } from 'body-parser';
import expressValidator from 'express-validator';
import cors from 'cors';
import limiter from './configs/limiter';
import RateLimit from 'express-rate-limit';
import passport from 'passport';
import { UserPassport, AdminPassport } from './strategies';
import enableModules from './modules';
import params from './configs/params';
import errorHandler from './middlewares/errorHandler';

class Application {
    app;
    router;

    constructor() {
        this.app = express();
        this.initApp();
    }

    async initApp() {
        this.configApp();
        this.setParams();
        this.setRouter();
        this.setErrorHandler();
        this.enableModules();
        this.configPassport();
    }

    configApp() {
        if (this.app.get('env') !== 'production') {
            this.app.use(logger('dev'));
        }

        this.app.use(cors())
            .use(json())
            .use(urlencoded({ extended: true }))
            .use(expressValidator())
            .use(this.createLimiter())
    }

    configPassport() {
        UserPassport(params.tokenSecret, passport);
        AdminPassport(params.adminTokenSecret, passport);
        this.app.use(passport.initialize())
            .use(passport.session());
    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    setRouter() {
        this.router = express.Router();
        this.app.use(`/api`, this.router);
    }

    createLimiter() {
        return new RateLimit(limiter);
    }

    setErrorHandler() {
        this.app.use(errorHandler);
    }

    enableModules() {
        enableModules(this.router);
    }
}

export default () => new Application().app;
