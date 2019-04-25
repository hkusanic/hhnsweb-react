const keystone = require('keystone');
const Types = keystone.Field.Types;

let Blog = new keystone.List('Blog', {
	autokey: {
		path: 'slug',
		from: 'title_en _id',
		unique: true,
	},
	map: {
		name: 'title_en',
	},
	defaultSort: '-date',
});

Blog.add({
	title_en: {
		type: String,
		label: 'Title English',
	},
	title_ru: {
		type: String,
		label: 'Title Russian',
	},
	date: {
		type: String,
		label: 'Date',
	},
	publish_date: {
		type: String,
		label: 'Publish Date',
	},
	author: {
		type: String,
		label: 'Author',
	},
	body_en: {
		type: Types.Html,
		wysiwyg: true,
		height: 600,
		label: 'Content English',
	},
	body_ru: {
		type: Types.Html,
		wysiwyg: true,
		height: 600,
		label: 'Content Russian',
	},
	audio_files: {
		type: Types.Relationship,
		ref: 'AudioFile',
		many: true,
		label: 'Audio File/s',
	},
	needs_translation: {
		type: Types.Boolean,
		default: true,
		label: 'Needs To Be Translated',
	},
	slug: {
		type: String,
		index: true,
		hidden: true,
	},
	uuid: {
		type: String,
		hidden: true,
	},
	files: {
		type: Types.TextArray,
	},
	tags_en: {
		type: String,
		label: 'Tags_en',
	},
	tags_ru: {
		type: String,
		label: 'Tags_ru',
	},
	language: {
		type: String,
		label: 'Language',
	},
	audit: {
		authors: { type: Types.TextArray },
		dates: { type: Types.TextArray },
	 },
	 audit: {type: Types.TextArray }
});

Blog.defaultColumns = 'title_en, date|15%, needs_translation|10%';

Blog.register();
