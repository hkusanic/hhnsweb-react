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
	app.get('/index.html', function (req, res) {

		keystone.set('updateDatabase', false);
		// Render some simple boilerplate html
		function renderFullPage (result) {
			// Note the div class name here, we will use that as a hook for our React code
			// static menu
			return `
				<!doctype html>
				<html>
					<head>
						<title>Keystone With React And Redux</title>
					</head>
					<body>
						<div class="react-container">
						</div>
						<span>
						RESULT: ${result.length}
						</span>
						<script src="bundle.js"></script>
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
