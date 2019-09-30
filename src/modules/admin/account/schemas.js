import { ADMIN_AUTH, REQUIRED } from '../../../configs/constants';

export default {
    saveAccount: {
        authentication: true,
        authenticationType: ADMIN_AUTH,
        validation: {
            legalName: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('legalName')
                }
            },
            fundId: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('fundId')
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
    account: {
        authentication: true,
        authenticationType: ADMIN_AUTH
    }
}
