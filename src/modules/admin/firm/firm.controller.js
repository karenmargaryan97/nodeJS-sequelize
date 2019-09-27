import FirmService from '../../../services/firm.service';
import { SUCCESS_CODE } from '../../../configs/status-codes';
import { BadRequest } from "../../../errors";
import { REQUIRED } from "../../../configs/constants";
const fileType = require('file-type');
const fs = require('fs');
const util = require('util');

export class FirmController {
    static async create(req, res, next) {
        const payload = req.body;
        const files = req.files;
        try {
            if (!files.length) {
                throw new BadRequest(REQUIRED('Logo'));
            }

            const logoName = `${payload.firmName}_${payload.entityNumber}`;
            const firmData = {
                firmName: payload.firmName,
                entityNumber: Number(payload.entityNumber),
                logo: logoName
            };

            const readFile = util.promisify(fs.readFile);
            const writeFile = util.promisify(fs.writeFile);
            const file = await readFile(files[0].path);

            const type = fileType(file);
            await writeFile(`uploads/${logoName}.${type.ext}`, file);

            const firm = await FirmService.create(firmData);

            return res.status(SUCCESS_CODE).json(firm);
        } catch(err) {
            next(err);
        }
    }

    static async edit(req, res, next) {
        const { id } = req.params;
        const payload = req.body;
        const files = req.files;
        try {
            const firm = await FirmService.getById(id);

            const data = {
                firmName: payload.firmName,
                entityNumber: payload.entityNumber
            };

            if (files.length) {
                const readFile = util.promisify(fs.readFile);
                const writeFile = util.promisify(fs.writeFile);
                let buffer = await readFile(files[0].path);

                let logoName = `${firm.firmName}_${firm.entityNumber}.png`;
                data.logo = logoName;
                await writeFile(`$uploads/${logoName}`, buffer);
            }

            let updatedFirm = await FirmService.update(firm.id, data);

            return res.status(SUCCESS_CODE).json(updatedFirm);
        } catch (e) {
            next(e);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            const firm = await FirmService.getById(id);

            await FirmService.delete(firm.id);

            return res.status(SUCCESS_CODE).json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    static async getOne(req, res, next) {
        const { id } = req.params;
        try {
            const firm = await FirmService.getById(id, ['funds']);

            return res.status(SUCCESS_CODE).json(firm);
        } catch(err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
        const query = req.query;
        try {
            const firms = await FirmService.getAll(query);

            return res.status(SUCCESS_CODE).json(firms);
        } catch (e) {
            next(e);
        }
    }
}
