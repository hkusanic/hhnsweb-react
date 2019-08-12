const keystone = require('keystone');
const Types = keystone.Field.Types;
var Content = keystone.list('Content');
let logger = require('../logger/logger');

let Lecture = new keystone.List('Lecture', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-created_date',
});

Lecture.add({
	uuid: { type: String, unique: true, index: true },
	tnid: { type: String },
	lecture_date: { type: String },
	published_date: { type: String },
	duration: { type: String },
	author: { type: String },
	audio_link: { type: Types.Url },
	soundcloud_link: { type: Types.Url },
	service: { type: String },
	dub: { type: String }, // Rusian Dub
	publish_in_book: { type: String },
	transcribe_filter: { type: Boolean, default: false },
	translation_required: { type: Boolean, default: true },
	youtube: { type: Types.TextArray },
	part: { type: String },
	chapter: { type: String },
	verse: { type: String },
	transcribe_required: { type: Boolean, default: false },
	languages: { type: String },
	en: {
		nid: { type: String },
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		transcription: {
			nid: { type: String },
			title: { type: String },
			text: { type: Types.Text },
			attachment_name: { type: String },
			attachment_link: { type: Types.TextArray },
		},
		location: { type: String },
		summary: {
			nid: { type: String },
			text: { type: Types.Text },
			attachment_name: { type: String },
			attachment_link: { type: Types.TextArray },
		},
		translation: { type: String },
	},
	ru: {
		nid: { type: String },
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		transcription: {
			nid: { type: String },
			title: { type: String },
			text: { type: Types.Text },
			attachment_name: { type: String },
			attachment_link: { type: Types.TextArray },
		},
		location: { type: String },
		summary: {
			nid: { type: String },
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
	audit: { type: Types.TextArray },
	created_date_time: { type: Types.Date, default: Date.now },
});

// Lecture.schema.add({ data: mongoose.Schema.Types.Mixed }); // you can add mongoose types like this.. but they should be defined outside .add()

Lecture.schema.pre('save', function (next) {
	next();
});

function uuidv4 () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0;
		var v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function todayDate () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var today = yyyy + '-' + mm + '-' + dd;
	return today;
}

Lecture.schema.post('save', function (data, next) {
	var item = new Content.model();
	let body = {};
	body.content_uuid = data.uuid;
	body.uuid = uuidv4();
	body.content_type = 'Lecture';
	body.content_title_en = data.en.title ? data.en.title : data.ru.title ? data.ru.title : '';
	body.content_title_ru = data.ru.title ? data.ru.title : data.en.title ? data.en.title : '';

	item.getUpdateHandler().process(body, function (err) {
		if (err) {
			console.log(err);
			logger.error(
				{
					error: err,
				},
				'API create content'
			);
		}
	});

	next();
});

Lecture.schema.post('validate', function (err, next) {
	next();
});

Lecture.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Lecture.register();
