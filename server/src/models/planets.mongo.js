const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
	keplerName: {
		type: String,
		required: true,
	},
});

const Planets = mongoose.model('Planet', planetSchema);

module.exports = { Planets };
