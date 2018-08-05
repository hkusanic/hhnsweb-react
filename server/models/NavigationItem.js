const keystone = require('keystone');

let NavigationItem = new keystone.List('NavigationItem', {
	autokey: { path: 'slug', from: 'name', unique: true },
});

NavigationItem.add({
	name: { type: String, initial: true, required: true, unique: true, index: true, default: '' },
	slug: { type: String, index: true },
});

NavigationItem.schema.pre('save', function (next) {
	next();
});

NavigationItem.schema.post('validate', function (err, next) {
	next();
});

NavigationItem.register();
