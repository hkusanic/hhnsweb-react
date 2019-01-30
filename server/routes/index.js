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
	app.get('/api/page/', keystone.middleware.api, routes.api.page.list);
	// Set up the default app route to  http://localhost:3000/index.html
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
