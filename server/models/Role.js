var keystone = require('keystone');
var Types = keystone.Field.Types;

// create a role collection
let Role = new keystone.List('Role', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
});

// Then we gonna add the fields
Role.add({
	title: { type: String, required: true, index: true },
	description: { type: String, initial: true, required: false, index: true },
});

Role.register();
