const keystone = require('keystone');
const Types = keystone.Field.Types;

let Lecture = new keystone.List('Lecture', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-created_date',
});

Lecture.add({
	uuid: { type: String, unique: true, index: true },
	created_date: { type: String },
	published_date: { type: String },
	duration: { type: String },
	author: { type: String },
	audio_link: { type: Types.Url },
	soundcloud_link: { type: Types.Url },
	service: { type: String },
	dub: { type: String },
	publish_in_book: { type: String },
	transcribe: { type: String },
	translation_required: { type: Boolean, default: true },
	youtube: { type: Types.TextArray },
	part: { type: String },
	chapter: { type: String },
	verse: { type: String },
	en: {
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		transcription: {
			text: { type: Types.Text },
			attachment_name: { type: String },
			attachment_link: { type: Types.TextArray },
		},
		location: { type: String },
		summary: {
			text: { type: Types.Text },
			attachment_name: { type: String },
			attachment_link: { type: Types.TextArray },
		},
		translation: { type: String },
	},
	ru: {
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		transcription: {
			text: { type: Types.Text },
			attachment_name: { type: String },
			attachment_link: { type: Types.TextArray },
		},
		location: { type: String },
		summary: {
			text: { type: Types.Text },
			attachment_name: { type: String },
			attachment_link: { type: Types.TextArray },
		},
		translation: { type: String },
	},
	counters: {
		audio_page_view: { type: Types.Number, default: 0 },
		audio_play_count: { type: Types.Number, default: 0 },
		downloads: { type: Types.Number, default: 0 },
		video_page_view: { type: Types.Number, default: 0 },
		en_transcription_view: { type: Types.Number, default: 0 },
		en_summary_view: { type: Types.Number, default: 0 },
		ru_transcription_view: { type: Types.Number, default: 0 },
		ru_summary_view: { type: Types.Number, default: 0 },
	},
	audit: {type: Types.TextArray }


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

Lecture.register();
