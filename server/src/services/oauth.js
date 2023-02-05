// const passport = require('passport');
// const { Strategy } = require('passport-google-oauth20');

// const config = {
// 	CLIENT_ID: process.env.OAUTH_CLIENT_ID,
// 	CLIENT_SECRET: process.env.OAUTH_SECRET_ID,
// 	COOKIE_KEY_1: process.env.COOKIE_SECRET_1,
// 	COOKIE_KEY_2: process.env.COOKIE_SECRET_2,
// };

// const AUTH_OPTIONS = {
// 	callbackURL: '/api/v1/auth/google/callback',
// 	clientID: config.CLIENT_ID,
// 	clientSecret: config.CLIENT_SECRET,
// };

// function verifyCallback(accessToken, refreshToken, profile, done) {
// 	done(null, profile);
// }

// passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	done(null, id);
// });

// module.exports = { oauth: passport };
