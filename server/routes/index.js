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
	app.post('/api/blog/find/', keystone.middleware.api, routes.api.blog.get);
	app.get('/api/blog/', keystone.middleware.api, routes.api.blog.list);
	app.get('/api/lecture/', keystone.middleware.api, routes.api.lecture.list);
	app.post('/api/signin/', keystone.middleware.api, routes.api.user.signin);
	app.post('/api/signup/', keystone.middleware.api, routes.api.user.signup);
	app.post('/api/signout/', keystone.middleware.api, routes.api.user.signout);
	app.post('/api/forgotpassword/', keystone.middleware.api, routes.api.user.forgotpassword);
	app.post('/api/getuserbyaccessid/', keystone.middleware.api, routes.api.user.getuserbyaccessid);
	app.post('/api/resetpassword/', keystone.middleware.api, routes.api.user.resetpassword);
	app.post('/api/editprofile/', keystone.middleware.api, routes.api.user.editprofile);
	app.post('/api/booking/bookingcreated/', keystone.middleware.api, routes.api.booking.bookingcreated);
	app.get('/api/booking/:email', keystone.middleware.api, routes.api.booking.get);

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
