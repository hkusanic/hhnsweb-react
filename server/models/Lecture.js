const keystone = require('keystone');
const Types = keystone.Field.Types;

let Lecture = new keystone.List('Lecture', {
	autokey: { path: 'slug', from: 'title.en _id' },
	map: { name: 'title' },
	defaultSort: '-date',
});

Lecture.add({
	title: {
		en: { label: 'Lecture Title (EN)', type: String, initial: true, required: true, index: true, default: '' },
		ru: { label: 'Lecture Title (RU)', type: String, initial: true, required: true, index: true, default: '' },
	},
	type: { type: String },
	date: { type: Types.Date, default: Date.now },
	publishDate: { type: String },
	event: { type: String },
	topic_en: { type: String },
	topic_ru: {type: String},
	translation_en: { type: String },
	translation_ru: { type: String },
	part: { type: String },
    verse: {type: String},
	location: { type: Types.Relationship, ref: 'Location', index: true },
	youtube: { type: Types.TextArray },
	audio_link: { type: Types.Url },
	duration: { type: String },
	downloads: { type: Types.Number },
	field1: {type: String},
    link: {type: String},
	comments: {	type: Types.Relationship,	ref: 'Comment', many: true },
	tags: {	type: Types.Relationship, ref: 'Tag', many: true },
	slug: { type: String, index: true },
});

// Lecture.schema.add({ data: mongoose.Schema.Types.Mixed }); // you can add mongoose types like this.. but they should be defined outside .add()

Lecture.schema.pre('save', function (next) {
	next();
});

Lecture.schema.post('save', function (next) {
	// next();
});

Lecture.schema.post('validate', function (err, next) {
	next();
});

Lecture.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Lecture.schema.pre('remove', function (next) {
	next();
	// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

	// comment.remove({ _id: { $in: this.comments }})
	// 	.then(() => next()); // remove array of commenets
});

Lecture.schema.post('remove', function (next) {
	next();
});

Lecture.register();
