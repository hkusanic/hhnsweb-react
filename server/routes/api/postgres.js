var keystone = require('keystone');
let CIO = require('customerio-node');
const { Client } = require('pg');

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
	
    const client = new Client({
        connectionString: 'postgres://qnsustfngvgfhw:5d0b30eea0a84bd89a2239f961ea4f516c050fa08a7880386c9ca711ae79b6a3@ec2-184-73-169-163.compute-1.amazonaws.com:5432/d9hujrgrir06ai',
        ssl: true,
        });
        
        client.connect();

        let event_name = req.body.name.toLowerCase();
        event_name = event_name.split(' ').join('_');
        //console.log(event_name);
        
        client.query('SELECT * FROM javascript.audios_list', (err, res) => {
        if (err){
            console.log(err);
            client.query(`CREATE TABLE ${event_name}( user_id serial PRIMARY KEY, username VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (50) NOT NULL, email VARCHAR (355) UNIQUE NOT NULL, created_on TIMESTAMP NOT NULL, last_login TIMESTAMP ); `)
        }
        else {
            //console.log(res);
            //console.log(res.rows);
            for (let row of res.rows) {
                //console.log(JSON.parse(JSON.stringify(row)));
            }
        }
            client.end();
    });


};