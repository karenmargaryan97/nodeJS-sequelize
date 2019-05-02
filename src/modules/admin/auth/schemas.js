import { INVALID, REQUIRED } from '../../../configs/constants';

export default {
    signup: {
        validation: {
            fullName: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Full Name')
                }
            },
            email: {
                in: 'body',
                isEmail: {
                    errorMessage: INVALID('Email')
                },
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                }
            },
            password: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Password')
                }
            }
        }
    },
    login: {
        validation: {
            email: {
                in: 'body',
                isEmail: {
                    errorMessage: INVALID('Email')
                },
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                }
            },
            password: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Password')
                }
            }
        }
    },
    logout: {
        authentication: true
    }
};
