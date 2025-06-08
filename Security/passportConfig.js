const passport = require('passport');
const jwtStrategy = require('./jwtStrategy');

module.exports = () => {
  passport.use(jwtStrategy);
};
