const keystone = require('keystone');
const Types = keystone.Field.Types;

let Transcript = new keystone.List('Transcript', {
	autokey: { path: 'slug', from: 'title _id', unique: true },
	map: { name: 'title' },
	defaultSort: '-date',
});

Transcript.add({
	title: { label: 'Lecture Title (EN)', type: String, initial: true, required: true, unique: true, index: true, default: '' },
	lecture_id: { type: String },
	date: { type: Types.Date, default: Date.now },
	author: { type: String },
	tags: {	type: Types.Relationship, ref: 'Tag', many: true },
	body: { type: Types.Textarea },
	slug: { type: String, index: true },
});

Transcript.schema.pre('save', function (next) {
	next();
});

Transcript.schema.post('save', function (next) {
	// next();
});

Transcript.schema.post('validate', function (err, next) {
	next();
});

Transcript.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Transcript.schema.pre('remove', function (next) {
	next();
	// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

	// comment.remove({ _id: { $in: this.comments }})
	// 	.then(() => next()); // remove array of commenets
});

Transcript.schema.post('remove', function (next) {
	next();
});

Transcript.register();
