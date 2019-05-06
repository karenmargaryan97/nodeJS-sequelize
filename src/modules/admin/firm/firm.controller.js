import { FirmService } from '../../../services';
import { SUCCESS_CODE } from '../../../configs/status-codes';
import FileUtil from '../../../helpers/fileUtil';
const fileType = require('file-type');
const fs = require('fs');
const util = require('util');

export class FirmController {
    static async create(req, res, next) {
        try {
            let firmName, entityNumber, logo;
            const parsedForm = await FileUtil.parseUploadForm(req);
            const { files, fields } = parsedForm;

            firmName = fields.firmName[0];
            entityNumber = fields.entityNumber[0];
            logo = files.files[0];
            
            const logoName = `${firmName}_${entityNumber}`;
            const firmData = {
                firmName,
                entityNumber: Number(entityNumber),
                logo: logoName
            };

            const readFile = util.promisify(fs.readFile);
            const writeFile = util.promisify(fs.writeFile);
            const file = await readFile(logo.path);

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
        try {
            const firm = await FirmService.getById(id);
            let firmName, entityNumber, logo, data = {};
            const parsedForm = await FileUtil.parseUploadForm(req);

            const { files, fields } = parsedForm;

            firmName = fields.firmName[0];
            entityNumber = fields.entityNumber[0];
            if (files.logo && files.logo.length) {
                logo = files.logo[0];
            }

            data.firmName = firmName;
            data.entityNumber = entityNumber;

            if (logo) {
                const readFile = util.promisify(fs.readFile);
                const writeFile = util.promisify(fs.writeFile);
                let buffer = await readFile(logo.path);

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
            const firm = await FirmService.getById(id);

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
