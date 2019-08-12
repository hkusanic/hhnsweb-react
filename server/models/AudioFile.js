const keystone = require('keystone');
const Types = keystone.Field.Types;
const randToken = require('rand-token');

let audioStorage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-s3'),
	label: 'Audio File',
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true,
	},
	s3: {
		key: process.env.AWS_KEY, // 's3-key', // required; defaults to process.env.S3_KEY
		secret: process.env.AWS_SECRET, // 'secret', // required; defaults to process.env.S3_SECRET
		bucket: process.env.AWS_BUCKET, // 'mybucket', // required; defaults to process.env.S3_BUCKET
		region: process.env.AWS_REGION, // 'ap-southeast-2', // optional; defaults to process.env.S3_REGION, or if that's not specified, us-east-1
		path: process.env.AWS_AUDIO_PATH, // '/profilepics', // optional; defaults to "/"
		// publicUrl: 'https://xxxxxx.cloudfront.net', // optional; sets a custom domain for public urls - see below for details
		uploadParams: { // optional; add S3 upload params; see below for details
			ACL: 'public-read-write',
		},
		generateFilename: keystone.Storage.originalFilename,
	},
	schema: {
		bucket: true, // optional; store the bucket the file was uploaded to in your db
		etag: true, // optional; store the etag for the resource
		path: true, // optional; store the path of the file in your db
		url: true, // optional; generate & store a public URL
	},
});

let AudioFile = new keystone.List('AudioFile', {
	autokey: {
		path: 'slug',
		from: 'name _id',
		unique: true,
	},
	map: {
		name: 'name',
	},
	// defaultSort: '-date',
});

AudioFile.add({
	name: {
		type: String,
		initial: true,
		required: true,
		unique: true,
		index: true,
		noedit: true,
		label: 'Audio File Name',
	},
	title_en: {
		type: String,
		label: 'Title English',
	},
	title_ru: {
		type: String,
		label: 'Title Russian',
	},
	date: {
		type: Types.Date,
		default: Date.now,
		label: 'Upload Date',
	},
	author: {
		type: String,
		label: 'Author',
	},
	description_en: {
		type: Types.Html,
		wysiwyg: true,
		height: 600,
		label: 'Description English',
	},
	description_ru: {
		type: Types.Html,
		wysiwyg: true,
		height: 600,
		label: 'Description Russian',
	},
	slug: {
		type: String,
		index: true,
		hidden: true,
	},
	language: {
		type: Types.Relationship,
		ref: 'Language',
		many: false,
		label: 'Language',
	},
	file: {
		type: Types.File,
		storage: audioStorage,
		note: 'Upload Audio File To Amazon Web Services',
		initial: true,
		createInline: true,
		allowedTypes: ['mp3', 'wav'],
		label: 'Audio File',
	},
	version: { type: Types.Number, default: 1, hidden: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true },

});

AudioFile.relationship({ path: 'blogs', ref: 'Blog', refPath: 'audio_files' });

AudioFile.defaultColumns = 'name, language|15%, state|10%'; // 'name, date|15%';

AudioFile.schema.pre('save', function (next) {
	try {
		let self = this;
		// Use the original filename as the title.
		if (this.file.filename) {
			self.name = this.file.filename;
		} else {
			self.title = randToken.generate(16);
		}
		AudioFile.model.findOne({
			name: self.title,
		})
			.where('state', 'published')
			.sort('-updatedAt')
			.exec(function (err, existing) {
				if (err) {
					console.log('ERROR: File - There was an error finding the benchmark file during pre save.');
				}
				if (existing) {
					// Increase the version
					let version = parseInt(existing.version + 1);
					self.title = self.title + '_v' + version;
					self.version = version;
				}
				next();
			});
	} catch (ex) {
		console.log(`AudioFile.schema.pre('save') -> ${ex}`);
	}
});

AudioFile.schema.post('save', function (err, doc, next) {
	try {
		if (err) {
			console.log(err);
			next();
		}
		console.log('---AUDIO FILE SAVE---');
		console.dir(doc);
		next();
	} catch (ex) {
		console.log(`AudioFile.schema.post('save' -> ${ex}`);
	}
});

AudioFile.schema.post('validate', function (err, doc, next) {
	try {
		if (err) {
			console.log(err);
			next();
		}
		console.log('---AUDIO FILE SAVE---');
		console.dir(doc);
		next();
	} catch (ex) {
		console.log(`AudioFile.schema.post('save' -> ${ex}`);
	}
});

AudioFile.register();
