const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	street: String,
	landmark: String,
	city: String,
	country: String,
	postalcode: String,
});
