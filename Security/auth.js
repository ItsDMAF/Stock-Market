// Importing the library for authentication
const passport = require('passport');

const authenticateJwt = passport.authenticate('jwt', { session: false });

// Making this feature available in other files
module.exports = authenticateJwt;
