import FileUtil from '../helpers/fileUtil';

export default async (req, res, next) => {
    try {
        const { fields, files } = await FileUtil.parseUploadForm(req);
        if (Object.keys(fields).length) {
            for (const i in fields) {
                if (fields.hasOwnProperty(i) && fields[i].length) {
                    req.body[i] = fields[i][0];
                }
            }
        }

        if (files.files.length) {
            req.files = [];
            for (const file of files.files) {
                req.files.push(file);
            }
        }

        next();
    } catch (e) {
        next(e);
    }
};

