const keystone = require('keystone');
const Types = keystone.Field.Types;
var Content = keystone.list('Content');
let logger = require('../logger/logger');

let Kirtan = new keystone.List('Kirtan', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-published_date',
});

Kirtan.add({
	uuid: { type: String, unique: true, index: true },
	kirtan_creation_date: { type: String },
	published_date: { type: String },
	duration: { type: String },
	tnid: { type: String },
	translate: { type: String },
	language: { type: String },
	downloads: { type: Types.Number },
	audio_link: { type: Types.Url },
	soundcloud_link: { type: Types.Url },
	service: { type: String },
	dub: { type: String },
	comments: { type: Types.Relationship, ref: 'Comment', many: true },
	tags: { type: Types.Relationship, ref: 'Tag', many: true },
	translation_required: { type: Boolean, default: true },
	youtube: { type: Types.TextArray },
	type: {
		type: Types.Select,
		options: ['Kirtan', 'Bhajan'],
		default: 'Kirtan',
	},
	artist: { type: String },
	en: {
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		location: { type: String },
		body: { type: String },
		nid: { type: String },
	},
	ru: {
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		location: { type: String },
		body: { type: String },
		nid: { type: String },
	},
	audit: { type: Types.TextArray },
	created_date_time: { type: Types.Date, default: Date.now },
	counters: {
		downloads: { type: Types.Number, default: 0 },
	},
});

function uuidv4 () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0;
		var v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

Kirtan.schema.post('save', function (data, next) {
	var item = new Content.model();
	let body = {};
	body.content_uuid = data.uuid;
	body.uuid = uuidv4();
	body.content_type = 'Kirtan';
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
Kirtan.register();
