var keystone = require('keystone');
let modelHelper = require('../helpers/modelHelper');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('../../webpack.config');
var compiler = webpack(webpackConfig);
const sadhanaRoutes = require('./sadhana');
const userVerifyRoutes = require('./userVerify');

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
	app.use(require('webpack-dev-middleware')(compiler, {
		hot: true, noInfo: true,
		// contentBase: '/server/public',
		publicPath: webpackConfig.output.publicPath,
		historyApiFallBack: true,
		proxy: {
			'*': 'http://localhost:3000',
		},
	}));
	app.use(require('webpack-hot-middleware')(compiler, {
		hot: true, noInfo: true,
		// contentBase: '/server/public/',
		publicPath: webpackConfig.output.publicPath,
		historyApiFallBack: true,
		proxy: {
			'*': 'http://localhost:3000',
		},
	}));
	app.use('/api/userVerify/', keystone.middleware.api, userVerifyRoutes);
	app.use('/api/sadhana/', keystone.middleware.api, sadhanaRoutes);
	app.get('/api/recipe/', keystone.middleware.api, routes.api.recipe.list);
	app.get('/api/content/', keystone.middleware.api, routes.api.content.list);
	app.get('/api/content/getLimitedList', keystone.middleware.api, routes.api.content.getlimitedlist);
	app.all('/api/appointment/:id/update', keystone.middleware.api, routes.api.appointment.update);
	app.post('/api/appointment/:id/remove', keystone.middleware.api, routes.api.appointment.remove);
	app.all('/api/appointment/create', keystone.middleware.api, routes.api.appointment.create);
	app.get('/api/appointment/:id', keystone.middleware.api, routes.api.appointment.get);
	app.get('/api/page/', keystone.middleware.api, routes.api.page.list);
	app.get('/api/location/', keystone.middleware.api, routes.api.location.list);
	app.post('/api/location/create', keystone.middleware.api, routes.api.location.create);
	app.post('/api/location/createBulk', keystone.middleware.api, routes.api.location.createBulk);
	app.get('/api/topic/', keystone.middleware.api, routes.api.topic.list);
	app.post('/api/topic/create', keystone.middleware.api, routes.api.topic.create);
	app.post('/api/topic/createBulk', keystone.middleware.api, routes.api.topic.createBulk);
	app.get('/api/event/', keystone.middleware.api, routes.api.event.list);
	app.post('/api/event/create', keystone.middleware.api, routes.api.event.create);
	app.post('/api/event/createBulk', keystone.middleware.api, routes.api.event.createBulk);
	app.get('/api/translation/', keystone.middleware.api, routes.api.translation.list);
	app.post('/api/translation/create', keystone.middleware.api, routes.api.translation.create);
	app.post('/api/translation/createBulk', keystone.middleware.api, routes.api.translation.createBulk);
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
	app.all('/api/comment/update/:id', keystone.middleware.api, routes.api.comment.update);
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
	app.post('/api/quote/quoteOfDay/', keystone.middleware.api, routes.api.quote.quoteOfDay);
	app.post('/api/quote/:id/update', keystone.middleware.api, routes.api.quote.update);
	app.post('/api/quote/getquotebyid/', keystone.middleware.api, routes.api.quote.getquotebyid);
	app.all('/api/video/:id/update', keystone.middleware.api, routes.api.video.update);
	app.post('/api/video/:id/remove', keystone.middleware.api, routes.api.video.remove);
	app.post('/api/video/create/', keystone.middleware.api, routes.api.video.create);
	app.get('/api/video/', keystone.middleware.api, routes.api.video.list);
	app.post('/api/video/getvideobyid/', keystone.middleware.api, routes.api.video.getvideobyid);
	app.post('/api/video/updatePageView', keystone.middleware.api, routes.api.video.updatePageView);
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
	app.all('/api/kirtan/updateCounters', keystone.middleware.api, routes.api.kirtan.updateCounters);
	app.all('/api/lecture/updateCounters', keystone.middleware.api, routes.api.lecture.updateCounters);
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
	app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
	app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
	app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
	app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
	app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);
	app.post('/api/user/approveSadhanaSheet', keystone.middleware.api, routes.api.user.approvedUserForSadhana);
	app.post('/api/user/getUserByUserId', keystone.middleware.api, routes.api.user.getUserByUserId);
	app.post('/api/user/create/', keystone.middleware.api, routes.api.user.create);
	app.post('/api/user/createBulk/', keystone.middleware.api, routes.api.user.createBulk);
	app.post('/api/user/uploadPic/', keystone.middleware.api, routes.api.user.uploadPic);
	app.post('/api/blog/createBulkNew/', keystone.middleware.api, routes.api.blog.createBulkNew);
	app.post('/api/blog/updateBulkNew/', keystone.middleware.api, routes.api.blog.updateBulkNew);
	app.post('/api/quote/updateBulkNew/', keystone.middleware.api, routes.api.quote.updateBulkNew);
	app.post('/api/kirtan/updateBulkNew/', keystone.middleware.api, routes.api.kirtan.updateBulkNew);
	app.post('/api/lecture/updateBulkNew/', keystone.middleware.api, routes.api.lecture.updateBulkNew);
	app.post('/api/lecture/uploadPdfToS3/', keystone.middleware.api, routes.api.lecture.uploadPDF);
	app.post('/api/updateRegistration/', keystone.middleware.api, routes.api.user.updateRegistration);
	app.post('/api/updatePassword/', keystone.middleware.api, routes.api.user.updatePassword);

	app.options('/api*', function (req, res) { res.send(200); });

	// app.post('/api/blog/generateUploadUrl', multipartMiddleware,routes.api.blog.generateUploadUrl );
	// Set up the default app route to  http://localhost:3000/index.htmli
	app.get('/*', function (req, res) {
		keystone.set('updateDatabase', false);
		// Render some simple boilerplate html
		console.log('====>', req.originalUrl);

		function renderFullPage (result) {
			// Note the div class name here, we will use that as a hook for our React code
			// static menu  <!doctype html>
			return `
               
                <html class="wide wow-animation">
					<head>
						<meta name="format-detection" content="telephone=no">
						<meta name="viewport" content="width=device-width height=device-height initial-scale=1.0 maximum-scale=1.0 user-scalable=0">
						<meta http-equiv="X-UA-Compatible" content="IE=edge">
						<meta charset="utf-8">
                        <title>H.H. Niranjana Swami - Official web-site</title>
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Work+Sans:300,500,700,800%7COswald:300,400,500">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                        <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
                        <link rel="stylesheet" href="../css/bootstrap.css">
                        <link rel="stylesheet" href="../css/fonts.css">
						<link rel="stylesheet" href="../css/custom.css">
						<link rel="stylesheet" href="../css/style1.css">
                        <link rel="stylesheet" href="../css/cus.css">
                        <link rel="stylesheet" href="../css/mobilevalidation.css">
						<link rel="stylesheet" href="../css/codeFlag.css">
						<link rel="stylesheet" href="../css/antd.css">
						<link rel="stylesheet" href="../css/style1.css">
						<link rel="stylesheet" href="../css/SingleGridMenu.css" id="main-styles-link">
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
		// <script type="text/javascript" src="../js/bundle.js"></script> <script type="text/javascript src="/bundle.js”></script>
		modelHelper.getStaticNavigation().then((result) => {
			console.log('KEYSTONE STATIC MENU RESTORED');
			console.dir(result);
			// Send the html boilerplate
			if (req.originalUrl.includes('/admin')) {
				res.sendFile(path.join(__dirname, '../../admin/', 'index1.html'));
			}
			else { res.send(renderFullPage(result)); }
		});


	});
};
