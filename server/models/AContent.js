const keystone = require("keystone");
const Types = keystone.Field.Types;

let Content = new keystone.List("Content", {
	autokey: { path: "slug", from: "uuid _id", unique: true },
	map: { name: "uuid" },
	defaultSort: "-created_date_time"
});

Content.add({
	uuid: { type: String, unique: true, index: true },
	content_uuid: { type: String },
	content_type: { type: String },
	created_date_time: { type: Types.Date, default: Date.now },
	content_title_en: {type: String},
	content_title_ru: {type: String},
});

Content.register();
