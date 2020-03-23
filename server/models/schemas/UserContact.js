const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	type: { type: String, required: true },
	dob: { type: Date },
	gender: { type: String },
	email: { type: String },
	name: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
	},
	phone: {
		type: mongoose.Schema.Types.Mixed,
	},
	address: {
		type: mongoose.Schema.Types.Mixed,
	},
});
