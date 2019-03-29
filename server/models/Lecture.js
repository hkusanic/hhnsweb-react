const keystone = require('keystone');
const Types = keystone.Field.Types;

let Lecture = new keystone.List('Lecture', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-published_date',
});

Lecture.add({
	uuid: { type: String, unique: true, index:true},
	created_date: { type: String },
	published_date: { type: String },
	duration: { type: String },
	author: {type: String},
	audio_link: { type: Types.Url },
	soundcloud_link: {type: Types.Url},
	service :{type:String},
    dub :{type:String},
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
		attachment_name: {type: String},
		attachment_link: {type: Types.Url}
	},
	location: {type: String},
	summary: {
		text: {type: Types.Text},
		attachment_name: {type: String},
		attachment_link: {type: Types.Url}
	}
	},
	ru:{
		title:{type:String},
		event: { type: String},
		topic:{type: String},
		transcription: {
			text: {type: Types.Text},
			attachment_name: {type: String},
			attachment_link: {type: Types.Url}
		},
		location: {type: String},
		summary: {
			text: {type: Types.Text},
			attachment_name: {type: String},
			attachment_link: {type: Types.Url}
		}
   },
   counters:{
	audio_page_view: { type: Types.Number, default:0 },
	audio_play_count: { type: Types.Number,  default:0 },
	downloads: { type: Types.Number,default:0 },
	video_page_view: { type: Types.Number,  default:0 },
	transcription_view: { type: Types.Number,  default:0 },
	summary_view: { type: Types.Number,  default:0 },
	transcription_view: { type: Types.Number,  default:0 },
	summary_view: { type: Types.Number,  default:0 },
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
