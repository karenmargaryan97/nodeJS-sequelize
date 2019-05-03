import { FirmService } from '../../../services';
import { SUCCESS_CODE } from '../../../configs/status-codes';
import FileUtil from '../../../helpers/fileUtil';
import { NotFound } from '../../../errors';
import { NOT_EXISTS } from '../../../configs/constants';
const fileType = require('file-type');
const fs = require('fs');
const util = require('util');

export class FirmController {
    static async create(req, res, next) {
        const payload = req.body;
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

    static async getOne(req, res, next) {
        const { id } = req.params;
        try {
            const firm = await FirmService.getById(id);

            if (!firm) {
                throw new NotFound(NOT_EXISTS('Firm'));
            }

            return res.status(SUCCESS_CODE).json(firm);
        } catch(err) {
            next(err);
        }
    }
}