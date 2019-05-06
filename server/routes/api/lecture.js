var keystone = require('keystone');
let logger = require('./../../logger/logger');

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

const zlib = require('zlib');
// const zipFolder = require('zip-folder');
const zipFolder = require('zip-a-folder');
const pdfreader = require('pdfreader');

const pdf = require('pdf-parse');

/**
 * List Page
 */

// Getting our page model

var Lecture = keystone.list('Lecture');

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

// Creating the API end point
// More about keystone api here: https://gist.github.com/JedWatson/9741171
exports.list = function (req, res) {
	
	// Querying the data this works similarly to the Mongo db.collection.find() method
	let query = [];

	if (req.query.title) {
		let title = {
			'en.title': {
				$regex: '.*' + req.query.title + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			title = {
				'en.title': {
					$regex: '.*' + req.query.title + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			title = {
				'ru.title': {
					$regex: '.*' + req.query.title + '.*',
					$options: 'i',
				},
			};
		}

		query.push(title);
	}
	if (req.query.verse) {
		query.push({
			verse: {
				$regex: '.*' + req.query.verse + '.*',
				$options: 'i',
			},
		});
	}
	if (req.query.location) {
		let location = {
			'en.location': {
				$regex: '.*' + req.query.location + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			location = {
				'en.location': {
					$regex: '.*' + req.query.location + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			location = {
				'ru.location': {
					$regex: '.*' + req.query.location + '.*',
					$options: 'i',
				},
			};
		}

		query.push(location);
	}
	if (req.query.topic) {
		let topic_query = {
			'en.topic': {
				$regex: '.*' + req.query.topic + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			topic_query = {
				'en.topic': {
					$regex: '.*' + req.query.topic + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			topic_query = {
				'ru.topic': {
					$regex: '.*' + req.query.topic + '.*',
					$options: 'i',
				},
			};
		}

		query.push(topic_query);
	}
	if (req.query.event) {
		let event_query = {
			'en.event': {
				$regex: '.*' + req.query.event + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			event_query = {
				'en.event': {
					$regex: '.*' + req.query.event + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			event_query = {
				'ru.event': {
					$regex: '.*' + req.query.event + '.*',
					$options: 'i',
				},
			};
		}

		query.push(event_query);
	}

	if (req.query.chapter) {
		let chapter_query = {
			chapter: {
				$regex: '.*' + req.query.chapter + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			chapter_query = {
				chapter: {
					$regex: '.*' + req.query.chapter + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			chapter_query = {
				chapter: {
					$regex: '.*' + req.query.chapter + '.*',
					$options: 'i',
				},
			};
		}

		query.push(chapter_query);
	}

	if (req.query.song) {
		let song_query = {
			song: {
				$regex: '.*' + req.query.song + '.*',
				$options: 'i',
			},
		};
		if (req.cookies.languageCode === 'en') {
			song_query = {
				song: {
					$regex: '.*' + req.query.song + '.*',
					$options: 'i',
				},
			};
		}
		if (req.cookies.languageCode === 'ru') {
			song_query = {
				song: {
					$regex: '.*' + req.query.song + '.*',
					$options: 'i',
				},
			};
		}

		query.push(song_query);
	}

	if (req.query.transcriptions) {
		let transcription_query = {
			'en.transcription.text': { $exists: true, $ne: '' },
		};

		// if (req.cookies.languageCode === 'en')
		// transcription_query = {"en.transcription.text" : {"$exists" : true, "$ne" : ""}}
		// if (req.cookies.languageCode === 'ru')
		// transcription_query = {"ru.transcription.text" : {"$exists" : true, "$ne" : ""}}

		query.push(transcription_query);
	}

	if (req.query.summaries) {
		let summaries_query = { 'ru.summary.text': { $exists: true, $ne: '' } };

		// if (req.cookies.languageCode === 'en')
		// summaries_query =  {"en.summary.text" : {"$exists" : true, "$ne" : ""}}
		// if (req.cookies.languageCode === 'ru')
		// summaries_query =  {"ru.summary.text" : {"$exists" : true, "$ne" : ""}}

		query.push(summaries_query);
	}

	if (req.query.video) {
		let video_query = { youtube: { $exists: true, $ne: [] } };
		if (req.cookies.languageCode === 'en') {
			video_query = { youtube: { $exists: true, $ne: [] } };
		}
		if (req.cookies.languageCode === 'ru') {
			video_query = { youtube: { $exists: true, $ne: [] } };
		}

		query.push(video_query);
	}

	if (req.query.year) {
		let year_query = {
			created_date: {
				$regex: '.*' + req.query.year + '.*',
				$options: 'i',
			},
		};

		query.push(year_query);
	}

	if (req.query.date) {
		let date_query = {
			created_date: {
				$regex: '.*' + req.query.date + '.*',
				$options: 'i',
			},
		};

		query.push(date_query);
	}

	let createdDateSort = '-created_date';

	if (req.query.createdDateSort) {
		if (req.query.createdDateSort === 'asc') {
			createdDateSort = 'created_date';
		}
		else {
			createdDateSort = '-created_date';
		}

	}

	let filters = {};

	if (query.length > 0) {
		filters = {
			$and: query,
		};
	}

	logger.info(
		{
			req: req,
		},
		'API list lecture'
	);
	Lecture.paginate({
		page: req.query.page || 1,
		perPage: 20,
		filters: filters,
	}).sort(createdDateSort).exec(function (err, items) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API list lecture'
			);
			return res.apiError('database error', err);
		}
		return res.apiResponse({
			success: true,
			lecture: items,
			total: items.results.length,
		});
		// Using express req.query we can limit the number of recipes returned by setting a limit property in the link
		// This is handy if we want to speed up loading times once our recipe collection grows
	});
};

// Lecture Download

exports.lectureDownload = function(req, res){

	var dir = "/home/system6/Desktop/hhnsweb-react/server/routes/api/files/nrs-lectures-"+req.body.year;
	var zipPath = "/home/system6/Desktop/hhnsweb-react/server/routes/api/files/";
	if (!Fs.existsSync(dir)){
		Fs.mkdirSync(dir);
	}

	async function download() {
		const url = req.body.url;

		const path = Path.resolve(__dirname, 'files/nrs-lectures-'+req.body.year,  req.body.title + '.mp3');
	
		const response = await Axios({
			method: 'GET',
			url : url,
			responseType: 'stream',
		});
	
		response.data.pipe(Fs.createWriteStream(path));
	
		return new Promise((resolve, reject) => {
			response.data.on('end', () => {
				resolve();
			});
	
			response.data.on('error', err => {
				reject(err);
			});
		});
	}
	
	download().then(() => {
		console.log("Download finished..");

		if (!Fs.existsSync(dir)){
			Fs.mkdirSync(dir);
		}

		res.apiResponse({
			data: "Downloaded Successfully",
		});
	}, (err) => {
		console.log("error");
		res.apiResponse({
			data: err,
		});
	});

    function compressfile(filename){
        var newfilename = filename+".gz",
        writestream = Fs.createWriteStream(newfilename);
        readstream.pipe(compress).pipe(writestream);
    }

}

// Lecture Download

exports.lectureZip = function (req, res) {
	console.log(req.body);
	zipFolder.zipFolder(req.body.Source, req.body.Destination, function(err){
		if(err){
			console.log('Something went wrong!', err);
		}
		res.apiResponse({
			data: 'all done!',
		});
	}, function(response){
		console.log(response);
	});

};

exports.pdfRead = function (req, res) {

	// default render callback
	function render_page(pageData) {
    
		let render_options = {
			normalizeWhitespace: true,
			disableCombineTextItems: true
		}
	
		return pageData.getTextContent(render_options).then(function(textContent) {
			let lastY, text = '';
			for (let item of textContent.items) {
				if (lastY == item.transform[5] || !lastY){
					text += item.str;
				}  
				else{
					text += '\n' + item.str;
				}    
				lastY = item.transform[5];
			}
			return text;
		});
	}
	
	let options = {
		pagerender: render_page
	}
 

	let dataBuffer = Fs.readFileSync('/home/system6/Documents/30-04-2019/hhnsweb-react/server/routes/api/files/hello.pdf');

	pdf(dataBuffer, options).then(function(data) {
	
			// number of pages
			console.log(data.numpages);
			// number of rendered pages
			console.log(data.numrender);
			// PDF info
			console.log(data.info);
			// PDF metadata
			console.log(data.metadata); 
			// PDF.js version
			// check https://mozilla.github.io/pdf.js/getting_started/
			console.log(data.version);
			// // PDF text
			// console.log(data.text); 
			res.apiResponse({
				data: data.text,
			});
					
	});
		
};

exports.pdfDownloadAndRead = function (req, res) {

	var dir = "/home/system6/Documents/30-04-2019/hhnsweb-react/server/public/utils/files/nrs-pdf";
	if (!Fs.existsSync(dir)){
		Fs.mkdirSync(dir);
	}

	async function download() {
		const url = req.body.attachment_link;
		console.log(__dirname);
		//const path = Path.resolve(__dirname, 'files/nrs-pdf',  req.body.attachment_name);
		const path = Path.resolve('/home/system6/Documents/30-04-2019/hhnsweb-react/server/public/utils', 'files/nrs-pdf',  req.body.attachment_name);
		const response = await Axios({
			method: 'GET',
			url : url,
			responseType: 'stream',
		});
	
		response.data.pipe(Fs.createWriteStream(path));
	
		return new Promise((resolve, reject) => {
			response.data.on('end', () => {
				resolve();
			});
	
			response.data.on('error', err => {
				reject(err);
			});
		});
	}
	
	download().then(() => {
		console.log("Download finished..");

		if (!Fs.existsSync(dir)){
			Fs.mkdirSync(dir);
		}

		function render_page(pageData) {
    
			let render_options = {
				normalizeWhitespace: true,
				disableCombineTextItems: true
			}
		
			return pageData.getTextContent(render_options).then(function(textContent) {
				let lastY, text = '';
				for (let item of textContent.items) {
					if (lastY == item.transform[5] || !lastY){
						text += item.str;
					}  
					else{
						text += '\n' + item.str;
					}    
					lastY = item.transform[5];
				}
				return text;
			});
		}
		
		let options = {
			pagerender: render_page
		}

		let dataBuffer = Fs.readFileSync('/home/system6/Documents/30-04-2019/hhnsweb-react/server/routes/api/files/nrs-pdf/' + req.body.attachment_name);
		pdf(dataBuffer).then(function(data) {
			res.apiResponse({
				data: data.text,
			});
		});
	}, (err) => {
		console.log("error");
		res.apiResponse({
			data: err,
		});
	});
		
};

exports.pdfDataPushing = function (req, res) {
	var obj = [];
	Fs.exists('output.json', function(exists){
		if(exists){
			console.log("yes file exists");
			Fs.readFile('output.json', function readFileCallback(err, data){
				if (err){
					console.log(err);
				} 
				else {
					obj = JSON.parse(data);
					//obj.table = [];
					obj.push(req.body);
					
					var json = JSON.stringify(obj); 
					Fs.writeFile('output.json', json); 
				}
			});
		} 
		else {
			obj = [];
			console.log("file not exists")
			for (i=0; i<5 ; i++){
			obj.push(req.body);
			}
			var json = JSON.stringify(obj);
			Fs.writeFile('output.json', json);
		}
	});
};

exports.create = function (req, res) {
	var item = new Lecture.model();
	var data = req.method === 'POST' ? req.body : req.query;
	data.created_date = data.created_date ? data.created_date:todayDate();
	logger.info(
		{
			req: req,
		},
		'API create lecture'
	);
	item.getUpdateHandler(req).process(data, function (err) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API create lecture'
			);
			return res.apiError('error', err);
		}

		res.apiResponse({
			Lecture: item,
		});
	});
};

exports.createBulk = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API createBulk lecture'
	);
	keystone.createItems(
		{
			Lecture: req.body,
		},
		function (err, stats) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API createBulk lecture'
				);
				return res.apiError('error', err);
			}
			return res.apiResponse({
				Lecture: true,
			});
		}
	);
};

exports.updateBulk = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API updateBulk lecture'
	);
	if (!req.body) {
		logger.error(
			{
				error: 'No Data',
			},
			'API updateBulk lecture'
		);
		res.json({
			error: {
				title: 'Data is Reqired',
				detail: 'Mandatory values are missing. Please check.',
			},
		});
	}
	let data = req.body;
	for (let i = 0; i < data.length; i++) {
		Lecture.model
			.findOne({
				uuid: data[i].uuid,
			})
			.exec(function (err, item) {
				if (err) {
					logger.error(
						{
							error: err,
						},
						'API updateBulk lecture'
					);
					return res.apiError('database error', err);
				}
				if (!item) {
					logger.error(
						{
							error: 'No Item',
						},
						'API updateBulk lecture'
					);
					return res.apiError('not found');
				}

				item.getUpdateHandler(req).process(data[i], function (err) {
					if (err) {
						logger.error(
							{
								error: err,
							},
							'API updateBulk lecture'
						);
						return res.apiError('create error', err);
					}

					res.apiResponse({
						Lecture: item,
					});
				});
			});
	}
};

exports.update = function (req, res) {
	console.log('body inside update ===>>', req.body);
	logger.info(
		{
			req: req,
		},
		'API update lecture'
	);
	Lecture.model
		.findOne({ uuid: req.params.id })
		.exec(function (err, item) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API update lecture'
				);
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error(
					{
						error: 'No Item',
					},
					'API update lecture'
				);
				return res.apiError('not found');
			}

			item.getUpdateHandler(req).process(req.body, function (err) {
				if (err) {
					logger.error(
						{
							error: err,
						},
						'API update lecture'
					);
					return res.apiError('create error', err);
				}

				res.apiResponse({
					Lecture: item,
				});
			});
		});
};

exports.updateCounters = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API update lecture'
	);
	Lecture.model
		.findOne({
			uuid: req.body.uuid,
		})
		.exec(function (err, item) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API update lecture'
				);
				return res.apiError('database error', err);
			}
			if (!item) {
				logger.error(
					{
						error: 'No Item',
					},
					'API update lecture'
				);
				return res.apiError('not found');
			}
			if (req.body.audio_page_view) {
				item.counters.audio_page_view = item.counters.audio_page_view + 1;
			}
			if (req.body.audio_play_count) {
				item.counters.audio_play_count = item.counters.audio_play_count + 1;
			}
			if (req.body.video_page_view) {
				item.counters.video_page_view = item.counters.video_page_view + 1;
			}
			if (req.body.en_transcription_view) {
				item.counters.en_transcription_view
					= item.counters.en_transcription_view + 1;
			}
			if (req.body.ru_transcription_view) {
				item.counters.ru_transcription_view
					= item.counters.ru_transcription_view + 1;
			}
			if (req.body.en_summary_view) {
				item.counters.en_summary_view = item.counters.en_summary_view + 1;
			}
			if (req.body.ru_summary_view) {
				item.counters.ru_summary_view = item.counters.ru_summary_view + 1;
			}
			if (req.body.downloads) {
				item.counters.downloads = item.counters.downloads + 1;
			}

			item.getUpdateHandler(req).process(item, function (err) {
				if (err) {
					logger.error(
						{
							error: err,
						},
						'API update lecture'
					);
					return res.apiError('create error', err);
				}

				res.apiResponse({
					Lecture: item,
				});
			});
		});
};

exports.remove = function (req, res) {
	logger.info(
		{
			req: req,
		},
		'API remove lecture'
	);
	Lecture.model.findOne({ uuid: req.params.id }).exec(function (err, item) {
		if (err) {
			logger.error(
				{
					error: err,
				},
				'API remove lecture'
			);
			return res.apiError('database error', err);
		}
		if (!item) {
			logger.error(
				{
					error: 'No Item',
				},
				'API remove lecture'
			);
			return res.apiError('not found');
		}

		item.remove(function (err) {
			if (err) {
				logger.error(
					{
						error: err,
					},
					'API remove lecture'
				);
				return res.apiError('database error', err);
			}

			return res.apiResponse({
				Lecture: true,
			});
		});
	});
};

exports.getlecturebyid = function (req, res) {
	if (!req.body.uuid) {
		res.json({ error: { title: 'Id is Required', detail: 'Mandatory values are missing. Please check.' } });
	}

	Lecture.model.findOne().where('uuid', req.body.uuid).exec((err, lecture) => {

		if (err || !lecture) {
			logger.error({
				error: err,
			}, 'API getlecturebyid');
			return res.json({ error: { title: 'Not able to find lecture' } });
		}
		res.json({
			lecture: lecture,
			success: true,
		});
	});

};
