const express = require('express');
// const { oauth } = require('../../services/oauth');

const router = express.Router();

// router.get('/google', oauth.authenticate('google', { scope: ['email'] }));

// router.get(
// 	'/google/callback',
// 	oauth.authenticate('google', {
// 		failureRedirect: '/failure',
// 		successRedirect: '/launch',
// 		session: true,
// 	}),
// 	(req, res) => {
// 		res.status(200).json({
// 			status: 'success',
// 		});
// 	}
// );

router.get('/logout', (req, res, next) => {
	req.logout();

	return res.redirect('/api/v1/auth/google');
});

module.exports = { authRouter: router };
