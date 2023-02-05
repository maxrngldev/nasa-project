const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const cookieSesion = require('cookie-session');

// Routers
const { viewsRouter } = require('./routes/views/views.routes');
const { api } = require('./routes/api');

// const { oauth } = require('./services/oauth');

const app = express();

app.use(helmet());

app.use(
	cookieSesion({
		name: 'session',
		maxAge: 24 * 60 * 60 * 1000,
		keys: [process.env.COOKIE_SECRET_1, process.env.COOKIE_SECRET_2],
	})
);

// app.use(oauth.initialize());
// app.use(oauth.session());

// Loggin with morgan
app.use(morgan('dev'));

// CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Enable JSON parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Endpoints
app.use('/api/v1', api);
app.use('/failure', (req, res) => {
	return res.status(400).json({
		status: 'error',
		message: 'Invalid google session',
	});
});
app.use('/*', viewsRouter);

module.exports = { app };
