let keystone = require('keystone');

if (process.env.NODE_ENV === undefined && process.env.NODE_ENV !== 'production') {
	console.log('---LOADING ENV VARIABLES---');
	require('dotenv').load();
	console.dir(process.env);
}

// Set up our keystone instance
keystone.init({
	// The name of the KeystoneJS application
	'name': 'H.H. Niranja Swami Web - Admin UI',
	// Paths to our application static files
	'static': [
		'./server/public',
		'./uploads',
	],
	// Keystone includes an updates framework,
	// which you can enable by setting the auto update option to true.
	// Updates provide an easy way to seed your database,
	// transition data when your models change,
	// or run transformation scripts against your database.
	'auto update': false,
	// The url for your MongoDB connection
	'mongo': 'mongodb://localhost/keystonereactcms',
	// Whether to enable built-in authentication for Keystone's Admin UI,
	'auth': true,
	// The key of the Keystone List for users, required if auth is set to true
	'user model': 'User',
	// The encryption key to use for your cookies.
	'cookie secret': '6D61822FBEAED8635A4A52241FEC3',
	'kfm public url': '/images/',
	'kfm virtual prop key': 'src',
	'kfm uploaded files storage': '/uploads/images/',
	'wysiwyg override toolbar': false,
	'wysiwyg menubar': true,
	'wysiwyg skin': 'lightgray',
	'wysiwyg images': true,
	'wysiwyg additional buttons': 'searchreplace visualchars,' +
		' charmap ltr rtl pagebreak paste, forecolor backcolor,' +
		' emoticons media, preview print ',
	'wysiwyg additional plugins': 'example, table, advlist, anchor,' +
		' autolink, autosave, bbcode, charmap, contextmenu, ' +
		' directionality, emoticons, fullpage, hr, media, pagebreak,' +
		' paste, preview, print, searchreplace, textcolor,' +
		' visualblocks, visualchars, wordcount',
	'cloudinary config': {
		cloud_name: 'not',
		api_key: 'really',
		api_secret: 'used',
	},
	'wysiwyg cloudinary images': true,
	'wysiwyg additional options': {
		image_title: true,
		automatic_uploads: true,
		images_upload_url: '/images',
		uploadimage_form_url: '/api/fileupload/create',
		images_reuse_filename: true,
		images_upload_handler: (blobInfo, success, failure) => {
			console.log('---image_upload_handler---');
			var xhr, formData;

			xhr = new XMLHttpRequest();
			xhr.withCredentials = false;
			xhr.open('POST', 'postAcceptor.php');

			xhr.onload = () => {
				var json;

				if (xhr.status !== 200) {
					failure('HTTP Error: ' + xhr.status);
					return;
				}

				json = JSON.parse(xhr.responseText);

				if (!json || typeof json.location !== 'string') {
					failure('Invalid JSON: ' + xhr.responseText);
					return;
				}

				success(json.location);
			};

			formData = new FormData();
			formData.append('file', blobInfo.blob(), blobInfo.filename());

			xhr.send(formData);
		},
		file_picker_callback: (callback, value, meta) => {
			console.log('---file_picker_callback---');
			// Provide file and text for the link dialog
			if (meta.filetype === 'file') {
				callback('mypage.html', {
					text: 'My text',
				});
			}
			// Provide image and alt text for the image dialog
			if (meta.filetype === 'image') {
				callback('myimage.jpg', {
					alt: 'My alt text',
				});
			}
			// Provide alternative source and posted for the media dialog
			if (meta.filetype === 'media') {
				callback('movie.mp4', {
					source2: 'alt.ogg',
					poster: 'image.jpg',
				});
			}
		},
	},
});

// Load your project's Models
keystone.import('./server/models');

// Add routes
keystone.set('routes', require('./server/routes'));

// Start Keystone
keystone.start();
