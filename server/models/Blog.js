const keystone = require('keystone');
const Types = keystone.Field.Types;

let Blog = new keystone.List('Blog', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
	defaultSort: '-date',
});

Blog.add({
	title_en: { type: String },
	title_ru: { type: String },
	date: { type: String },
	author: { type: String },
	body_en: { type: Types.Html, wysiwyg: true, height: 600 },
	body_ru: { type: Types.Html, wysiwyg: true, height: 600 },
	slug: { type: String, index: true },
	language: { type: String },
	uuid: { type: String }
});

Blog.schema.pre('save', function (next) {
	next();
});

Blog.schema.post('save', function (next) {
	// next();
});

Blog.schema.post('validate', function (err, next) {
	next();
});

Blog.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Blog.schema.pre('remove', function (next) {
	next();
	// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

	// comment.remove({ _id: { $in: this.comments }})
	// 	.then(() => next()); // remove array of commenets
});

Blog.schema.post('remove', function (next) {
	next();
});

Blog.register();
