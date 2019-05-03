import passport from 'passport';

export default (rule) => passport.authenticate(rule, { session: false });
