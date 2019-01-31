const keystone = require('keystone');
const Types = keystone.Field.Types;

let Blog = new keystone.List('Blog', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
	defaultSort: '-date',
});

Blog.add({
	title: { type: String },
	date: { type: Types.Date, default: Date.now },
	author: { type: String },
	body: { type: Types.Text },
	slug: { type: String, index: true },
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