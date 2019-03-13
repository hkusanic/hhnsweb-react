const keystone = require('keystone');
const Types = keystone.Field.Types;

let Lecture = new keystone.List('Lecture', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-date',
});

Lecture.add({
	uuid: { type: String, unique: true, index:true},
	created_date: { type: Types.Date, default: Date.now },
	published_date: { type: String },
	duration: { type: String },
	downloads: { type: Types.Number },
	audio_link: { type: Types.Url },
	soundcloud_link: {type: Types.Url},
	service :{type:String},
    dub :{type:String},
	comments: {	type: Types.Relationship,	ref: 'Comment', many: true },
	tags: {	type: Types.Relationship, ref: 'Tag', many: true },
	publish_in_book :{type:String},
	transcribe :{type:String},
	translation_required: { type:Boolean, default:true},
	youtube: { type: Types.TextArray },
	part: { type: String },
	chapter: {type: String},
	verse: {type: String},
	en:{
	title:{type:String},
	event: { type: String},
	topic:{type: String},
	transcription: {
		text: {type: Types.Text},
		attachment: {type: Types.Url}
	},
	location: {type: String},
	summary: {
		text: {type: Types.Text},
		attachment: {type: Types.Url}
	}
	},
	ru:{
		title:{type:String},
		event: { type: String},
		topic:{type: String},
		transcription: {
			text: {type: Types.Text},
			attachment: {type: Types.Url}
		},
		location: {type: String},
		summary: {
			text: {type: Types.Text},
			attachment: {type: Types.Url}
		}
   }
	
	
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
