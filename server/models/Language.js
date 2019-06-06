const keystone = require('keystone');

let Language = new keystone.List('Language', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
});

Language.add({
	title: { type: String, label: 'Language Title', initial: true, required: true, unique: true, index: true, default: '' },	created_date_time: { type: Types.Date, default: Date.now }

});

Language.relationship({ path: 'audiofiles', ref: 'AudioFile', refPath: 'language' });

Language.schema.pre('save', function (next) {
	next();
});

Language.schema.post('save', function (next) {
	// next();
});

Language.schema.post('validate', function (err, next) {
	next();
});

Language.schema.pre('remove', function (next) {
	next();
});

Language.schema.post('remove', function (next) {
	next();
});

Language.register();
