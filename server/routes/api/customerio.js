var keystone = require('keystone');
let CIO = require('customerio-node');

exports.signin = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	
    const cio = new CIO("e852e13f1e42dd7e7798", "bd896e1a2113b9f7cf2f");
    console.log(req.body);
    cio.identify(req.body.id, req.body).then(() => {
        res.status(200).json({message : "data send to cusomer.io"});
    });


};

exports.pageview = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	
    const cio = new CIO("e852e13f1e42dd7e7798", "bd896e1a2113b9f7cf2f");
    console.log(req.body);
    cio.trackPageView(req.body.id, req.body.url).then(() => {
        res.status(200).json({message : "data send to cusomer.io"});
    }).catch( err => console.log(err));


};

exports.track = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	
    const cio = new CIO("e852e13f1e42dd7e7798", "bd896e1a2113b9f7cf2f");
    console.log(req.body);
    cio.track(req.body.id, {
        name : req.body.name,
        data : req.body.data,
    }).then(() => {
        res.status(200).json({message : "data send to cusomer.io"});
    }).catch( err => console.log(err));


};