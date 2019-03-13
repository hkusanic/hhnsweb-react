const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Event = new keystone.List('Event', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
});

Event.add({
	title: { type: String, initial: true, required: true, unique: true, index: true, default: '' },

});

 //Event.relationship({ path: 'en.Event', ref: 'Lecture', refPath: 'en.Event' });
 //Event.relationship({ path: 'ru.Event', ref: 'Lecture', refPath: 'ru.Event' });
// Lecture.schema.add({ data: mongoose.Schema.Types.Mixed }); // you can add mongoose types like this.. but they should be defined outside .add()

Event.schema.pre('save', function (next) {
	next();
});

Event.schema.post('save', function (next) {
	// next();
});

Event.schema.post('validate', function (err, next) {
	next();
});

Event.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Event.schema.pre('remove', function (next) {
	next();
	// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

	// comment.remove({ _id: { $in: this.comments }})
	// 	.then(() => next()); // remove array of commenets
});

Event.schema.post('remove', function (next) {
	next();
});

Event.register();