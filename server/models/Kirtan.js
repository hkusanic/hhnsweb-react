const keystone = require("keystone");
const Types = keystone.Field.Types;
var Content = keystone.list("Content");

let Kirtan = new keystone.List("Kirtan", {
	autokey: { path: "slug", from: "uuid", unique: true },
	map: { name: "uuid" },
	defaultSort: "-published_date"
});

Kirtan.add({
	uuid: { type: String, unique: true, index: true },
	created_date: { type: String },
	published_date: { type: String },
	duration: { type: String },
	language: { type: String },
	downloads: { type: Types.Number },
	audio_link: { type: Types.Url },
	soundcloud_link: { type: Types.Url },
	service: { type: String },
	dub: { type: String },
	comments: { type: Types.Relationship, ref: "Comment", many: true },
	tags: { type: Types.Relationship, ref: "Tag", many: true },
	translation_required: { type: Boolean, default: true },
	youtube: { type: Types.TextArray },
	type: {
		type: Types.Select,
		options: ["Kirtan", "Bhajan"],
		default: "Kirtan"
	},
	artist: { type: String },
	en: {
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		location: { type: String },
		body: { type: String }
	},
	ru: {
		title: { type: String },
		event: { type: String },
		topic: { type: String },
		location: { type: String },
		body: { type: String }
	},
	audit: { type: Types.TextArray },
	created_date_time: { type: Types.Date, default: Date.now }

});

// Kirtan.schema.add({ data: mongoose.Schema.Types.Mixed }); // you can add mongoose types like this.. but they should be defined outside .add()

// Kirtan.schema.pre('save', function (next) {
// 	next();
// });

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function todayDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	var today = yyyy + "-" + mm + "-" + dd;
	return today;
}

Kirtan.schema.post("save", function(data, next) {
	var item = new Content.model();
	let body = {};
	body.content_uuid = data.uuid;
	body.uuid = uuidv4();
	body.content_type = "Kirtan";
	item.getUpdateHandler().process(body, function(err) {
		if (err) {
			logger.error(
				{
					error: err
				},
				"API create content"
			);
		}
	});

	next();
});

// Kirtan.schema.post('validate', function (err, next) {
// 	next();
// });

// Kirtan.schema.virtual('commentCount').get(function () {
// 	return this.comments.length;
// });

// Kirtan.schema.pre('remove', function (next) {
// 	next();
// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

// comment.remove({ _id: { $in: this.comments }})
// 	.then(() => next()); // remove array of commenets
// });

// Kirtan.schema.post('remove', function (next) {
// 	next();
// });

Kirtan.register();
