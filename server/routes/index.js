var keystone = require('keystone');
let modelHelper = require('../helpers/modelHelper');


// Then to get access to our API route we will use importer
var importRoutes = keystone.importer(__dirname);
// And finally set up the api on a route
var routes = {
	api: importRoutes('./api'),
};
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// Export our app routes
exports = module.exports = function (app) {
	// Get access to the API route in our app
	app.get('/api/recipe/', keystone.middleware.api, routes.api.recipe.list);
	app.all('/api/appointment/:id/update', keystone.middleware.api, routes.api.appointment.update);
	app.post('/api/appointment/:id/remove', keystone.middleware.api, routes.api.appointment.remove);
	app.all('/api/appointment/create', keystone.middleware.api, routes.api.appointment.create);
	app.get('/api/appointment/:id', keystone.middleware.api, routes.api.appointment.get);
	app.get('/api/page/', keystone.middleware.api, routes.api.page.list);
	app.get('/api/topic/', keystone.middleware.api, routes.api.topic.list);
	app.get('/api/location/', keystone.middleware.api, routes.api.location.list);
	app.get('/api/event/', keystone.middleware.api, routes.api.event.list);
	app.post('/api/blog/find/', keystone.middleware.api, routes.api.blog.get);
	app.get('/api/blog/', keystone.middleware.api, routes.api.blog.list);
	app.post('/api/blog/getblogbyid/', keystone.middleware.api, routes.api.blog.getblogbyid);
	app.post('/api/blog/create/', keystone.middleware.api, routes.api.blog.create);
	app.all('/api/blog/:id/update', keystone.middleware.api, routes.api.blog.update);
	app.post('/api/blog/:id/remove', keystone.middleware.api, routes.api.blog.remove);
	app.get('/api/lecture/', keystone.middleware.api, routes.api.lecture.list);
	app.post('/api/lecture/createBulk/', keystone.middleware.api, routes.api.lecture.createBulk);
	app.post('/api/lecture/create/', keystone.middleware.api, routes.api.lecture.create);
	app.post('/api/comment/create/', keystone.middleware.api, routes.api.comment.create);
	app.get('/api/comment/', keystone.middleware.api, routes.api.comment.list);
	app.get('/api/comment/getlimitedlist/', keystone.middleware.api, routes.api.comment.getlimitedlist);
	app.post('/api/comment/:id/remove', keystone.middleware.api, routes.api.comment.remove);
	app.post('/api/gallery/create/', keystone.middleware.api, routes.api.gallery.create);
	app.get('/api/gallerylist/', keystone.middleware.api, routes.api.gallerylist.list);
	app.post('/api/gallerylist/create/', keystone.middleware.api, routes.api.gallerylist.create);
	app.post('/api/quotetopiclist/create/', keystone.middleware.api, routes.api.quotetopiclist.create);
	app.get('/api/quotetopiclist/', keystone.middleware.api, routes.api.quotetopiclist.list);
	app.get('/api/gallery/', keystone.middleware.api, routes.api.gallery.list);
	app.post('/api/gallerylist/:id/remove', keystone.middleware.api, routes.api.gallerylist.remove);
	app.post('/api/gallery/:id/update', keystone.middleware.api, routes.api.gallery.update);
	app.post('/api/quote/:id/remove', keystone.middleware.api, routes.api.quote.remove);
	app.post('/api/quote/create/', keystone.middleware.api, routes.api.quote.create);
	app.get('/api/quote/', keystone.middleware.api, routes.api.quote.list);
	app.post('/api/quote/getquotebyid/', keystone.middleware.api, routes.api.quote.getquotebyid);
	app.all('/api/video/:id/update', keystone.middleware.api, routes.api.video.update);
	app.post('/api/video/:id/remove', keystone.middleware.api, routes.api.video.remove);
	app.post('/api/video/create/', keystone.middleware.api, routes.api.video.create);
	app.get('/api/video/', keystone.middleware.api, routes.api.video.list);
	app.post('/api/video/getquotebyid/', keystone.middleware.api, routes.api.video.getvideobyid);
	app.all('/api/video/:id/update', keystone.middleware.api, routes.api.video.update);
	app.post('/api/gallery/getGalleryByGallery/', keystone.middleware.api, routes.api.gallery.getGalleryByGallery);
	app.get('/api/gallery/getStaticGallery/', keystone.middleware.api, routes.api.gallerylist.list);
	app.post('/api/gallery/getgallerybyid/', keystone.middleware.api, routes.api.gallery.getGallerybyid);
	app.post('/api/gallery/:id/remove', keystone.middleware.api, routes.api.gallery.remove);
	app.post('/api/replies/:id/removeByCommentId', keystone.middleware.api, routes.api.replies.removeByCommentId);
	app.post('/api/replies/create/', keystone.middleware.api, routes.api.replies.create);
	app.get('/api/replies/', keystone.middleware.api, routes.api.replies.list);
	app.post('/api/replies/:id/remove', keystone.middleware.api, routes.api.replies.remove);
	app.post('/api/location/createBulk/', keystone.middleware.api, routes.api.location.createBulk);
	app.post('/api/location/create/', keystone.middleware.api, routes.api.location.create);
	app.post('/api/kirtan/createBulk/', keystone.middleware.api, routes.api.kirtan.createBulk);
	app.post('/api/mkv/createBulk/', keystone.middleware.api, routes.api.mkv.createBulk);
	app.post('/api/kirtan/create/', keystone.middleware.api, routes.api.kirtan.create);
	app.get('/api/kirtan/', keystone.middleware.api, routes.api.kirtan.list);
	app.post('/api/kirtan/:id/remove', keystone.middleware.api, routes.api.kirtan.remove);
	app.all('/api/kirtan/:id/update', keystone.middleware.api, routes.api.kirtan.update);
	app.post('/api/kirtan/getkirtanbyid/', keystone.middleware.api, routes.api.kirtan.getKirtanbyid);
	app.get('/api/mkv/', keystone.middleware.api, routes.api.mkv.list);
	app.post('/api/mkv/create/', keystone.middleware.api, routes.api.mkv.create);
	app.post('/api/lecture/updateBulk/', keystone.middleware.api, routes.api.lecture.updateBulk);
	app.all('/api/lecture/:id/update', keystone.middleware.api, routes.api.lecture.update);
	app.all('/api/lecture/updateCounters', keystone.middleware.api, routes.api.lecture.updateCounters);
	app.post('/api/lecture/:id/remove', keystone.middleware.api, routes.api.lecture.remove);
	app.post('/api/lecture/', keystone.middleware.api, routes.api.lecture.create);
	app.post('/api/lecture/getlecturebyid/', keystone.middleware.api, routes.api.lecture.getlecturebyid);
	app.post('/api/signin/', keystone.middleware.api, routes.api.user.signin);
	app.post('/api/signup/', keystone.middleware.api, routes.api.user.signup);
	app.post('/api/signout/', keystone.middleware.api, routes.api.user.signout);
	app.post('/api/forgotpassword/', keystone.middleware.api, routes.api.user.forgotpassword);
	app.post('/api/getuserbyaccessid/', keystone.middleware.api, routes.api.user.getuserbyaccessid);
	app.post('/api/resetpassword/', keystone.middleware.api, routes.api.user.resetpassword);
	app.post('/api/editprofile/', keystone.middleware.api, routes.api.user.editprofile);
	app.post('/api/booking/bookingcreated/', keystone.middleware.api, routes.api.booking.bookingcreated);
	app.get('/api/booking/:email', keystone.middleware.api, routes.api.booking.get);
	app.post('/api/contactus/', keystone.middleware.api, routes.api.contactus.create);
	app.get('/api/user/', keystone.middleware.api, routes.api.user.list);
	app.get('/api/appointment/', keystone.middleware.api, routes.api.appointment.list);
	app.get('/api/blog/generateUploadUrl/', keystone.middleware.api, routes.api.blog.generateUploadUrl);
	app.get('/api/blog/deleteFile/', keystone.middleware.api, routes.api.blog.deleteFile);
	// File Upload Routes
	app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
	app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
	app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
	app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
	app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);
	app.options('/api*', function (req, res) { res.send(200); });

	// app.post('/api/blog/generateUploadUrl', multipartMiddleware,routes.api.blog.generateUploadUrl );
	// Set up the default app route to  http://localhost:3000/index.htmli
	app.get('/*', function (req, res) {
		keystone.set('updateDatabase', false);
		// Render some simple boilerplate html
		function renderFullPage (result) {
			// Note the div class name here, we will use that as a hook for our React code
			// static menu
			return `
				<!doctype html>
				<html>
					<head>
						<title>H.H. Niranjana Swami - Official web-site</title>
						<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Work+Sans:300,500,700,800%7COswald:300,400,500">
						<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
						<link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
						<link rel="stylesheet" href="../css/bootstrap.css">
						<link rel="stylesheet" href="../css/fonts.css">
						<link rel="stylesheet" href="../css/custom.css">
						<link rel="stylesheet" href="../css/cus.css">
						<link rel="stylesheet" href="../css/mobilevalidation.css">
						<link rel="stylesheet" href="../css/codeFlag.css">
						<link rel="stylesheet" href="../css/style.css" id="main-styles-link">
						<script type="text/javascript" src="../js/bundle.js"></script>
						<script src="../js/core.min.js"></script>
					</head>
					<body>
						<div id="react-container" />
					</body>
				</html>
				`;
		}

		modelHelper.getStaticNavigation().then((result) => {
			console.log('KEYSTONE STATIC MENU RESTORED');
			console.dir(result);
			// Send the html boilerplate
			res.send(renderFullPage(result));
		});
	});
};
