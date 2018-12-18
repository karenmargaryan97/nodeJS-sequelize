import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    signup: {
        validation: {
            firstName: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('First Name')
                }
            },
            lastName: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Last Name')
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
}
