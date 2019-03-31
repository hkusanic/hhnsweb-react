var keystone = require('keystone');
let modelHelper = require('../helpers/modelHelper');


// Then to get access to our API route we will use importer
var importRoutes = keystone.importer(__dirname);
// And finally set up the api on a route
var routes = {
	api: importRoutes('./api'),
};

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
	app.get('/api/lecture/', keystone.middleware.api, routes.api.lecture.list);
	app.post('/api/lecture/createBulk/', keystone.middleware.api, routes.api.lecture.createBulk);
	app.post('/api/lecture/create/', keystone.middleware.api, routes.api.lecture.create);
	app.post('/api/comment/create/', keystone.middleware.api, routes.api.comment.create);
	app.get('/api/replies/create', keystone.middleware.api, routes.api.replies.create);
	app.post('/api/location/createBulk/', keystone.middleware.api, routes.api.location.createBulk);
	app.post('/api/location/create/', keystone.middleware.api, routes.api.location.create);
	app.post('/api/kirtan/createBulk/', keystone.middleware.api, routes.api.kirtan.createBulk);
	app.post('/api/mkv/createBulk/', keystone.middleware.api, routes.api.mkv.createBulk);
	app.post('/api/kirtan/create/', keystone.middleware.api, routes.api.kirtan.create);
	app.get('/api/kirtan/', keystone.middleware.api, routes.api.kirtan.list);
	app.get('/api/mkv/', keystone.middleware.api, routes.api.mkv.list);
	app.post('/api/mkv/create/', keystone.middleware.api, routes.api.mkv.create);
	app.post('/api/lecture/updateBulk/', keystone.middleware.api, routes.api.lecture.updateBulk);
	app.all('/api/lecture/:id/update', keystone.middleware.api, routes.api.lecture.update);
	app.all('/api/lecture/updateCounters', keystone.middleware.api, routes.api.lecture.updateCounters);
	app.post('/api/lecture/:id/remove', keystone.middleware.api, routes.api.lecture.remove);
	app.post('/api/lecture/', keystone.middleware.api, routes.api.lecture.create);
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

	// File Upload Routes
	app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
	app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
	app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
	app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
	app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);

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
