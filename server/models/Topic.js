const keystone = require('keystone');
const mongoose = require('mongoose');
const Types = keystone.Field.Types;

let Topic = new keystone.List('Topic', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
});

Topic.add({
	title: { type: String, initial: true, required: true, unique: true, index: true, default: '' },

});

 //Topic.relationship({ path: 'en.topic', ref: 'Lecture', refPath: 'en.topic' });
 //Topic.relationship({ path: 'ru.topic', ref: 'Lecture', refPath: 'ru.topic' });
// Lecture.schema.add({ data: mongoose.Schema.Types.Mixed }); // you can add mongoose types like this.. but they should be defined outside .add()

Topic.schema.pre('save', function (next) {
	next();
});

Topic.schema.post('save', function (next) {
	// next();
});

Topic.schema.post('validate', function (err, next) {
	next();
});

Topic.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Topic.schema.pre('remove', function (next) {
	next();
	// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

	// comment.remove({ _id: { $in: this.comments }})
	// 	.then(() => next()); // remove array of commenets
});

Topic.schema.post('remove', function (next) {
	next();
});

Topic.register();