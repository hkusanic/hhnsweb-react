var keystone = require('keystone');
let kissmetrics = require('kissmetrics');

// exports.signin = function (req, res) {
// 	// Querying the data this works similarly to the Mongo db.collection.find() method
	
//     var kmClient = new kissmetrics({ key:'0c8419784114ca4c820c1f414228108ce430c4c1' });

//     console.log(req.body);
//     kmClient.identify(req.body.id, req.body).then(() => {
//         res.status(200).json({message : "data send to cusomer.io"});
//     });

// };

// exports.pageview = function (req, res) {
// 	// Querying the data this works similarly to the Mongo db.collection.find() method
	
//     var kmClient = new kissmetrics({ key: '0c8419784114ca4c820c1f414228108ce430c4c1' });
//     console.log(req.body);
//     kmClient.trackPageView(req.body.id, req.body.url).then(() => {
//         res.status(200).json({message : "data send to cusomer.io"});
//     }).catch( err => console.log(err));


// };

exports.alias = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	
    var kmClient = new kissmetrics({ key: '0c8419784114ca4c820c1f414228108ce430c4c1' });
    console.log(req.body);
    kmClient.alias('some kind of id')
};