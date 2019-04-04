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
		Bucket: process.env.bucket,
		Key: myKey,
		Expires: 100000,
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
		accessKeyId: process.env.accessKeyId,
		secretAccessKey: process.env.secretAccessKey,
		s3BucketEndpoint: false,
		endpoint: 'https://s3.amazonaws.com',
	};
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
		bucket: process.env.bucket,
	};
	const url = generatePresignedUrl('upload', req.query, s3, options);
	return res.json({
		presignedUrl: url,
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
	}).exec(function (err, items) {
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
