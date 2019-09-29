import { ADMIN_AUTH, REQUIRED } from '../../../configs/constants';

export default {
    saveFund: {
        authentication: true,
        authenticationType: ADMIN_AUTH,
        validation: {
            legalName: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('legalName')
                }
            },
            firmId: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('firmId')
                }
            },
            entityNumber: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('entityNumber')
                }
            }
        }
    },
    fund: {
        authentication: true,
        authenticationType: ADMIN_AUTH
    }
}
