var keystone = require('keystone');
let CIO = require('customerio-node');
const { Client } = require('pg');
let uuid =require('uuid');



exports.track = function (req, res) {
    // Querying the data this works similarly to the Mongo db.collection.find() method
    
        const client = new Client({
        connectionString: 'postgres://kpqavkfofrbdme:4d5fc3ca89d9259949ce625720db81152f3350e106988f493a59de6ca5386d60@ec2-54-235-104-136.compute-1.amazonaws.com:5432/d91sc91703qd7s',
        ssl: true,
        });
        
        client.connect();
	
        let event_name = req.body.name.toLowerCase();
        event_name = event_name.split(' ').join('_');
        //console.log(event_name);
        console.log(event_name);
        if(event_name === 'audio_list'){
                client.query('SELECT * FROM javascript.audio_list', (err, res) => {
                if (err){
                    console.log(err);
                    client.query('CREATE SCHEMA javascript', (err3, res3) => {
                        if(err3){
                            console.log(err3);
                            client.query('CREATE TABLE javascript.audio_list( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err1){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();
                                    client.query("INSERT INTO javascript.audio_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            console.log("updated");
                                        }
                                    });
                                } else {
                                    let id = uuid();
                                    let date = new Date();
                                    console.log("audio_list table created" + res1);
                                    client.query("INSERT INTO javascript.audio_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            console.log("updated");
                                        }
                                    });
                                }
                            })
                        }
                        else {
                            client.query('CREATE TABLE javascript.audio_list( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();

                                    client.query("INSERT INTO javascript.audio_list ( id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            console.log("updated");
                                        }
                                    });
                                } else {
                                    let id = uuid();
                                    let date = new Date();
                                    console.log("audio_list table created" + res1);
                                    client.query("INSERT INTO javascript.audio_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            console.log("updated");
                                        }
                                    });
                                }
                            }) 
                        }
                    });  
                }
                else {
                    //console.log(res);
                    //console.log(res.rows);
                    
                            let date = new Date();
                            let id = uuid();

                            client.query("INSERT INTO javascript.audio_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                if(err2){
                                    console.log(err2);
                                } else {
                                    console.log("updated");
                                }
                             })
                }
            });
        } else if(event_name === 'video_list'){
            client.query('SELECT * FROM javascript.video_list', (err, res) => {
                if (err){
                    console.log(err);
                    client.query('CREATE SCHEMA javascript', (err3, res3) => {
                        if(err3){
                            console.log(err3);
                            client.query('CREATE TABLE javascript.video_list( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err1){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();
                                    client.query("INSERT INTO javascript.video_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            return err2;
                                        } else {
                                            return "updated";
                                        }
                                    });                                
                                } else {
                                    let date = new Date();
                                    let id = uuid();

                                    console.log("video_list table created" + res1);
                                    client.query("INSERT INTO javascript.video_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            return err2;
                                        } else {
                                            return "updated";
                                        }
                                    });
                                }
                            })
                        }
                        else {
                            client.query('CREATE TABLE javascript.video_list( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();

                                    client.query("INSERT INTO javascript.video_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            return err2;
                                        } else {
                                            return "updated";
                                        }
                                    });
                                } else {
                                    let date = new Date();
                                    let id = uuid();

                                    console.log("video_list table created1" + res1);
                                    client.query("INSERT INTO javascript.video_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            return err2;
                                        } else {
                                            return "updated";
                                        }
                                    });
                                }
                            }) 
                        }
                    });  
                }
                else {
                    console.log('here');
                    let date = new Date();
                    let id = uuid();
                    client.query("INSERT INTO javascript.video_list (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.data.id + "', '"+ req.body.data.name +"', '"+date+"')", (err2, res2) => {
                        if(err2){
                            return err2;
                        } else {
                            console.log('updated');
                            return "updated";
                        }
                    })
                }
            });
        } else if(event_name === 'user_signin'){
            client.query('SELECT * FROM javascript.user_login', (err, res4) => {
                if (err){
                    console.log(err);
                    client.query('CREATE SCHEMA javascript', (err3, res3) => {
                        if(err3){
                            console.log(err3);
                            client.query('CREATE TABLE javascript.user_login( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err1){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();
                                    client.query("INSERT INTO javascript.user_login (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });                                
                                } else {
                                    let date = new Date();
                                    let id = uuid();

                                    console.log("video_list table created" + res1);
                                    client.query("INSERT INTO javascript.user_login (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });
                                }
                            })
                        }
                        else {
                            client.query('CREATE TABLE javascript.user_login( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();

                                    client.query("INSERT INTO javascript.user_login (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });
                                } else {
                                    let date = new Date();
                                    let id = uuid();

                                    console.log("video_list table created1" + res1);
                                    client.query("INSERT INTO javascript.user_login (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });
                                }
                            }) 
                        }
                    });  
                }
                else {
                    console.log('here');
                    let date = new Date();
                    let id = uuid();
                    client.query("INSERT INTO javascript.user_login (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                        if(err2){
                            console.log(err2);
                        } else {
                            console.log('updated');
                            res.status(200).json( { message : "updated" } );
                        }
                    })
                }
            });
        } else if(event_name === 'user_signup'){
            client.query('SELECT * FROM javascript.user_signup', (err, res4) => {
                if (err){
                    console.log(err);
                    client.query('CREATE SCHEMA javascript', (err3, res3) => {
                        if(err3){
                            console.log(err3);
                            client.query('CREATE TABLE javascript.user_signup( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err1){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();
                                    client.query("INSERT INTO javascript.user_signup (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });                                
                                } else {
                                    let date = new Date();
                                    let id = uuid();

                                    console.log("video_list table created" + res1);
                                    client.query("INSERT INTO javascript.user_signup (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });
                                }
                            })
                        }
                        else {
                            client.query('CREATE TABLE javascript.user_signup( id uuid, user_id text, event_name VARCHAR (50) UNIQUE NOT  NULL, created_on text NOT NULL, PRIMARY KEY (id))', (err1, res1) => {
                                if(err){ 
                                    console.log(err1);
                                    let date = new Date();
                                    let id = uuid();

                                    client.query("INSERT INTO javascript.user_signup (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });
                                } else {
                                    let date = new Date();
                                    let id = uuid();

                                    console.log("video_list table created1" + res1);
                                    client.query("INSERT INTO javascript.user_signup (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                                        if(err2){
                                            console.log(err2);
                                        } else {
                                            res.status(200).json( { message : "updated" } );
                                        }
                                    });
                                }
                            }) 
                        }
                    });  
                }
                else {
                    console.log('here');
                    let date = new Date();
                    let id = uuid();
                    client.query("INSERT INTO javascript.user_signup (id, user_id, event_name, created_on) VALUES ('"+id+"', '" + req.body.id + "', '"+ req.body.name +"', '"+date+"')", (err2, res2) => {
                        if(err2){
                            console.log(err2);
                        } else {
                            console.log('updated');
                            res.status(200).json( { message : "updated" } );
                        }
                    })
                }
            });
        }


};