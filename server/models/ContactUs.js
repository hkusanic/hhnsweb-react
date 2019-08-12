const keystone = require('keystone');
const Types = keystone.Field.Types;

let ContactUs = new keystone.List('ContactUs');

ContactUs.add({
    dateCreated: {
		type: Types.Datetime,
        default: Date.now,
	},
	email_ref: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	phone: {
		type: String,
	},
	message: {
		type: String,
	},
	created_date_time: { type: Types.Date, default: Date.now }


});

ContactUs.register();
