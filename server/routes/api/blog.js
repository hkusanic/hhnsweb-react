var keystone = require('keystone');
let logger = require('./../../logger/logger');

/**
 * List Page
 */

// Getting our page model
var Blog = keystone.list('Blog');
const AWS = require('aws-sdk');

/**
 * To generate presigned url for upload and download of file.
 * @param {string} type "upload" to get url for upload video
 *  "download" to get url for download video
 * @param {object} fileDetails
 * @param {string} fileDetails.name File name at s3 bucket
 * if file in folder, append folder name like "folder/file.ext"
 * @param {string} fileDetails.type Mime type of file
 * @param {*} s3 AWS Sdk configured s3 object
 * @param {object} config configurations to generate presigned url
 * @param {number} config.signedUrlExpireSeconds Expiration time of presignedUrl
 * @param {string} config.bucket Bucket name where file will be uploaded/downloaded
 */
function todayDate () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var today = yyyy + '-' + mm + '-' + dd;
	return today;
}
function generatePresignedUrl (type = 'upload', fileDetails, s3, config) {

	if (type === 'upload' && !fileDetails.type) {
		throw new Error('Missing arguments : Please specify the mime type of file.');
	}

	const myKey = fileDetails.name;
	const fileType = fileDetails.type;

	const urlType = {
		upload: 'putObject',
		download: 'getObject',
	};
	const commonOptions = {
		Bucket: process.env.BUCKET,
		Key: myKey,
		Expires: 100000,
		ACL: 'public-read',
	};
	const options = {
		upload: Object.assign({}, commonOptions, { ContentType: fileType }),
		download: Object.assign({}, commonOptions),
	};
	return s3.getSignedUrl(urlType[type], options[type]);
}

/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */
function generateS3Object (awsConfig) {
	const awsConfigObj = {
		accessKeyId: process.env.ACCESSKEYID,
		secretAccessKey: process.env.SECRETACCESSKEY,
		s3BucketEndpoint: false,
		endpoint: 'https://s3.amazonaws.com',
	};

	console.log('accessKeyId ======>>>>>>', process.env.ACCESSKEYID);
	console.log('secretAccessKey ======>>>>>>', process.env.SECRETACCESSKEY);
	console.log('bucket ======>>>>>>', process.env.BUCKET);
	logger.info({ awsConfigObj: awsConfigObj }, 'AWS Object');
	logger.info({ bucketName: process.env.BUCKET }, 'Bucket Name');
	AWS.config.update(awsConfigObj);
	return new AWS.S3();
}


exports.generateUploadUrl = (req, res) => {
	let isError = false;
	const errors = [];
	if (!req.query.name) { isError = true; handleErr('noVideoName', errors); }
	if (!req.query.type) { isError = true; handleErr('noVideoType', errors); }
	if (isError) {
		logger.error({ err: errors });
		return res.status(400).json({ errors });
	}
	const s3 = generateS3Object();
	const options = {
		signedUrlExpireSeconds: 100000,
		bucket: process.env.BUCKET,
		ACL: 'public-read',
	};
	const url = generatePresignedUrl('upload', req.query, s3, options);
	return res.json({
		presignedUrl: url,
	});
};

exports.deleteFile = (req, res) => {
	var bucketInstance = new AWS.S3();
	var params = {
		Bucket: process.env.BUCKET,
		Delete: { // required
			Objects: [ // required
			  {
					Key: req.query.filename, // required
			  },
			],
		  },
	};
	bucketInstance.deleteObjects(params, function (err, data) {
		if (data) {
			return res.apiResponse({
				data: data,
				success: true,
			});
		}
		else {
			return res.apiError('not found/deleted', err);
		}
	});
};


// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {
	// Querying the data this works similarly to the Mongo db.collection.find() method
	logger.info(
		{
			req: req,
		},
		'API list blog'
	);
	Blog.paginate({
		page: req.query.page || 1,
		perPage: 20,
	}).sort({ created_date_time: 'desc' }).exec(function (err, items) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API list blog'
			);
			return res.apiError('database error', err);
		}
		res.apiResponse({
			// Filter page by
			blog: items,
		});

		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our blog collection grows
	});
};

exports.get = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API get blog'
	);
	Blog.model
		.findOne()
		.where({ uuid: req.body.uuid })
		.exec(function (err, item) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API get blog'
				);
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error(
					{
						error: 'item not found',
					},
					'API get blog'
				);
				return res.apiError('not found');
			}
			res.apiResponse({
				blog: item,
			});
		});
};

exports.create = function (req, res) {
	var item = new Blog.model();
	var data = req.method === 'POST' ? req.body : req.query;
	// data.date = todayDate();
	logger.info(
		{
			req: req,
		},
		'API create Blog'
	);
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API create Blog'
			);
			return res.apiError('error', err);
		}

		res.apiResponse({
			Blog: item,
		});
	});
};


exports.getblogbyid = function (req, res) {
	if (!req.body.uuid) {
		res.json({ error: { title: 'Id is Required', detail: 'Mandatory values are missing. Please check.' } });
	}

	Blog.model.findOne().where('uuid', req.body.uuid).exec((err, blog) => {

		if (err || !blog) {
			logger.error({
				error: err,
			}, 'API getblogbyid');
			return res.json({ error: { title: 'Not able to find blog' } });
		}
		res.json({
			blog: blog,
			success: true,
		});
	});

};

exports.update = function (req, res) {
	logger.info({
		req: req,
	}, 'API update blog');

	Blog.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API update blog');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'Item not found',
			}, 'API update blog');
			return res.apiError('not found');
		}

		var data = (req.method === 'POST') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) {
				logger.error({
					error: err,
				}, 'API update blog');
				return res.apiError('create error', err);
			}

			res.apiResponse({
				Blog: item,
			});

		});

	});
};

exports.remove = function (req, res) {
	logger.info({
		req: req,
	}, 'API remove blog');
	Blog.model.findOne({ uuid: req.params.id }).exec(function (err, item) {

		if (err) {
			logger.error({
				error: err,
			}, 'API remove blog');
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error({
				error: 'No Item',
			}, 'API remove blog');
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error({
					error: err,
				}, 'API remove blog');
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				Blog: true,
			});
		});

	});
};
