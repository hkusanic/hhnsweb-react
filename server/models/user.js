const keystone = require('keystone');
const Types = keystone.Field.Types;

// First we gonna create our User list
let User = new keystone.List('User');

// Then we gonna add the fields
User.add({
	firstName: { type: String, initial: true },
	lastName: { type: String, initial: true },
	email: { type: String, initial: true, required: true, index: true },
	mobileNumber: { type: String, initial: true },
	password: { type: Types.Password, initial: true },
	canAccessKeystone: { type: Boolean, initial: true },
	accessKeyId: { type: String, initial: true },
});

User.register();
