var keystone = require('keystone');
let AWS = require('aws-sdk')

exports.signin = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	
    AWS.config.update({region: 'us-east-2'});
    let date = new Date();

    let folderName = Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()).toString();
    let timestamp = new Date().getTime().toString();
    console.log(timestamp);
    let filePath = 'segment-logs/'+folderName+'/'+timestamp+req.body.id+'.txt';

    let s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var bucketParams = {
        Bucket : 'hhns'
      };
      
      // Call S3 to obtain a list of the objects in the bucket
            console.log('here1');
            let objectParams = {Bucket: bucketParams.Bucket, Key: filePath, Body: JSON.stringify(req.body)};
            let uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
            uploadPromise.then(
                (data) => {
                    console.log("Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath);
                    res.status(200).json( { message : "Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath } );
            }).catch( err => {console.log(err);
                console.log({error: err}) ;
            })
}

exports.pageview = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	
    AWS.config.update({region: 'us-east-2'});
    let date = new Date();

    let folderName = Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()).toString();
    let timestamp = new Date().getTime().toString();
    console.log(timestamp);
    let filePath = 'segment-logs/'+folderName+'/'+timestamp+req.body.id+'.txt';

    let s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var bucketParams = {
        Bucket : 'hhns'
      };
      
      // Call S3 to obtain a list of the objects in the bucket
            console.log('here1');
            let objectParams = {Bucket: bucketParams.Bucket, Key: filePath, Body: JSON.stringify(req.body)};
            let uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
            uploadPromise.then(
                (data) => {
                    console.log("Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath);
                    res.status(200).json( { message : "Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath } );
            }).catch( err => {console.log(err);
                console.log({error: err}) ;
            })
}

exports.track = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	
    AWS.config.update({region: 'us-east-2'});
    let date = new Date();

    let folderName = Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()).toString();
    let timestamp = new Date().getTime().toString();
    console.log(timestamp);
    let filePath = 'segment-logs/'+folderName+'/'+timestamp+req.body.id+'.txt';

    let s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var bucketParams = {
        Bucket : 'hhns'
      };
      
      // Call S3 to obtain a list of the objects in the bucket
            console.log('here1');
            let objectParams = {Bucket: bucketParams.Bucket, Key: filePath, Body: JSON.stringify(req.body)};
            let uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
            uploadPromise.then(
                (data) => {
                    console.log("Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath);
                    res.status(200).json( { message : "Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath } );
            }).catch( err => {console.log(err);
                console.log({error: err}) ;
            })
}