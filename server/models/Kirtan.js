const keystone = require('keystone');
const Types = keystone.Field.Types;

let Kirtan = new keystone.List('Kirtan', {
	autokey: { path: 'slug', from: 'uuid', unique: true },
	map: { name: 'uuid' },
	defaultSort: '-published_date',
});

Kirtan.add({
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
	translation_required: { type:Boolean, default:true},
	youtube: { type: Types.TextArray },
    type: {
		type: Types.Select,
		options: ['Kirtan', 'Bhajan'],
		default: 'Kirtan',
    },
    artist:{type:String},
	en:{
	title:{type:String},
	event: { type: String},
	topic:{type: String},
	location: {type: String},
	},
	ru:{
		title:{type:String},
		event: { type: String},
		topic:{type: String},
		location: {type: String},
   }
	
	
});

// Kirtan.schema.add({ data: mongoose.Schema.Types.Mixed }); // you can add mongoose types like this.. but they should be defined outside .add()

Kirtan.schema.pre('save', function (next) {
	next();
});

Kirtan.schema.post('save', function (next) {
	// next();
});

Kirtan.schema.post('validate', function (err, next) {
	next();
});

Kirtan.schema.virtual('commentCount').get(function () {
	return this.comments.length;
});

Kirtan.schema.pre('remove', function (next) {
	next();
	// const comment = mongoose.model('comment'); // this is how you load other models to avoid circular reference with import

	// comment.remove({ _id: { $in: this.comments }})
	// 	.then(() => next()); // remove array of commenets
});

Kirtan.schema.post('remove', function (next) {
	next();
});

Kirtan.register();
