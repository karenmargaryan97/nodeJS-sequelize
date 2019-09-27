import { ServiceUnavailable } from '../errors';
import { BAD_REQUEST_CODE } from '../configs/status-codes';

export default async (err, req, res, next) => {
    if (!err.status) {
        next(new ServiceUnavailable(err.message));
    }

    let status = err.status || BAD_REQUEST_CODE;

    return res.status(status).json({
        status: status,
        message: err.message || '',
        errors: err.errors || null,
        body: req.body
    });
};
