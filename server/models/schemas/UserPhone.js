const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
	type: { type: String, required: true },
	phone_number: { type: String, required: true },
	country_code: { type: String },
});
