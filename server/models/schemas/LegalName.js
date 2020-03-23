const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	middle_name: { type: String },
});
