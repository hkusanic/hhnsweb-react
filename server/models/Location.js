const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Location = new keystone.List('Location', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
});

Location.add({
	title: { type: String, initial: true, required: true, unique: true, index: true, default: '' },

});

Location.relationship({ path: 'lecture', ref: 'Lecture', refPath: 'location' });
// Lecture.schema.add({ data: mongoose.Schema.Types.Mixed }); // you can add mongoose types like this.. but they should be defined outside .add()

Location.schema.pre('save', function (next) {
	next();
});

Location.schema.post('save', function (next) {
	// next();
});

Location.schema.post('validate', function (err, next) {
	next();
});

Location.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Location.schema.pre('remove', function (next) {
	next();
	// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

	// comment.remove({ _id: { $in: this.comments }})
	// 	.then(() => next()); // remove array of commenets
});

Location.schema.post('remove', function (next) {
	next();
});

Location.register();
