const keystone = require('keystone');
const Types = keystone.Field.Types;
var Content = keystone.list('Content');

let Video = new keystone.List('Video', {
	autokey: { path: 'slug', from: 'uuid _id', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-date',
});

Video.add({
	uuid: { type: String, index: true, unique: true },
	video_date: { type: String },
	published_date: { type: String },
	language: { type: String },
	type: { type: String },
	author: { type: String },
	translation_required: { type: Boolean, default: true },
	en: {
		nid: { type: String },
		title: { type: String },
		event: { type: String },
		location: { type: String },
	},
	ru: {
		nid: { type: String },
		title: { type: String },
		event: { type: String },
		location: { type: String },
	},
	oldData: {
		referenceId: { type: String },
	},
	video_page_view: { type: Types.Number, default: 0 },
	reference: { type: String },
	urls: { type: Types.TextArray },
	audit: { type: Types.TextArray },
	created_date_time: { type: Types.Date, default: Date.now },

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

Video.schema.post('save', function (data, next) {
	var item = new Content.model();
	let body = {};
	body.content_uuid = data.uuid;
	body.uuid = uuidv4();
	body.content_type = 'Video';
	body.content_title_en = data.en.title ? data.en.title : data.ru.title ? data.ru.title : '';
	body.content_title_ru = data.ru.title ? data.ru.title : data.en.title ? data.en.title : '';

	item.getUpdateHandler().process(body, function (err) {
		if (err) {
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

Video.register();
