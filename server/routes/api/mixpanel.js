var keystone = require('keystone');
let Mixpanel = require('mixpanel');

exports.signin = function (req, res) {
    // Querying the data this works similarly to the Mongo db.collection.find() method
    
    //const cio = new Mixpanel("e852e13f1e42dd7e7798", "bd896e1a2113b9f7cf2f");
    // create an instance of the mixpanel client
var mixpanel = Mixpanel.init('f820d6919f4e8095fa39c57a529272e5');

// // initialize mixpanel client configured to communicate over https
var mixpanel = Mixpanel.init('f820d6919f4e8095fa39c57a529272e5', {
    protocol: 'https'
});

// var api_key = 'b06d5ccfe0dfb9616fcf904960ba8383',
//     api_secret = 'b488732fa82827a557fa74fd05683a5b';

// var mixpanel = new Mixpanel({
//     api_key: api_key,
//     api_secret: api_secret
// });

    console.log(req.body);
    mixpanel.identify(req.body.id, req.body)


};


exports.pageview = function (req, res) {
    // Querying the data this works similarly to the Mongo db.collection.find() method
    
    //const cio = new CIO("e852e13f1e42dd7e7798", "bd896e1a2113b9f7cf2f");
   var mixpanel = Mixpanel.init('f820d6919f4e8095fa39c57a529272e5');

// // initialize mixpanel client configured to communicate over https
var mixpanel = Mixpanel.init('f820d6919f4e8095fa39c57a529272e5', {
    protocol: 'https'
});
// var api_key = 'b06d5ccfe0dfb9616fcf904960ba8383',
//     api_secret = 'b488732fa82827a557fa74fd05683a5b';

// var mixpanel = new Mixpanel({
//     api_key: api_key,
//     api_secret: api_secret
// });

    console.log(req.body);
    mixpanel.trackPageView(req.body.id, req.body.url)


};

exports.track = function (req, res) {
    // Querying the data this works similarly to the Mongo db.collection.find() method
    
    //const cio = new CIO("e852e13f1e42dd7e7798", "bd896e1a2113b9f7cf2f");
     var mixpanel = Mixpanel.init('f820d6919f4e8095fa39c57a529272e5');

// initialize mixpanel client configured to communicate over https
var mixpanel = Mixpanel.init('f820d6919f4e8095fa39c57a529272e5', {
    protocol: 'https'
});

// var api_key = 'b06d5ccfe0dfb9616fcf904960ba8383',
//     api_secret = 'b488732fa82827a557fa74fd05683a5b';

// var mixpanel = new Mixpanel({
//     api_key: api_key,
//     api_secret: api_secret
// });

    console.log(req.body);
    mixpanel.track(req.body.id, {
        name : req.body.name,
        data : req.body.data,
    })

};