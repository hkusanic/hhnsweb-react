const keystone = require('keystone');
const exec = require('child_process').exec;

const FileData = keystone.list('FileUpload');

/**
 * List Files
 */
exports.list = function (req, res) {
	console.log('file upload list');
	FileData.model.find(function (err, items) {

		if (err) return res.apiError('database error', err);

		res.apiResponse({
			collections: items,
		});

	});
};

/**
 * Get File by ID
 */
exports.get = function (req, res) {
	console.log('file upload - get file by id');
	FileData.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		res.apiResponse({
			collection: item,
		});

	});
};


/**
 * Update File by ID
 */
exports.update = function (req, res) {
	console.log('file upload - update file by id');
	FileData.model.findById(req.params.id).exec(function (err, item) {
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		let data = (req.method === 'POST') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) return res.apiError('create error', err);

			res.apiResponse({
				collection: item,
			});

		});
	});
};

/**
 * Upload a New File
 */
exports.create = function (req, res) {
	console.log('file upload - upload new file');
	let item = new FileData.model();
	let data = (req.method === 'POST') ? req.body : req.query;
	item.name = req.files.file.originalname;
	req.files.file.filename = req.files.file.originalname;
	/* console.log('---REQUEST---');
	console.dir(req);
	console.log('---DATA---');
	console.dir(data); */
	item.getUpdateHandler(req).process(req.files, function (err) {
		if (err) {
			console.log('---ERROR---');
			console(err);
			return res.apiError('error', err);
		};

		// return res.apiResponse({
		// 	file_upload: item,
		// });
		
		return res.apiResponse({
			location: 'uploads/f1qfijmhT8XFIzeq.png',
			success: true,
		});
	});
};

/**
 * Delete File by ID
 */
exports.remove = function (req, res) {
	console.log('file upload - delete file by id');
	let fileId = req.params.id;
	FileData.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);

		if (!item) return res.apiError('not found');

		item.remove(function (err) {

			if (err) return res.apiError('database error', err);

			// Delete the file
			exec('rm public/uploads/files/' + fileId + '.*', function (err, stdout, stderr) {
				if (err) {
					console.log('child process exited with error code ' + err.code);
					return;
				}
				console.log(stdout);
			});

			return res.apiResponse({
				success: true,
			});
		});

	});
};
