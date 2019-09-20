var rp = require("request-promise");
var tough = require("tough-cookie");
var fs = require("fs");
var https = require("https");
var AWS = require("aws-sdk");
var axios = require("axios");
require("dotenv").config({ path: "/home/system5/Desktop/hhnsweb-react/.env" });
// var httpAgent = new https.Agent({
// 	keepAlive: true,
// 	keepAliveMsecs: 3000

var englishNodeList = 0;
var russianNodeList = 0;
var englishLectureList = 0;
var russianLectureList = 0;
var englishTranscriptsList = 0;
var russianTranscriptsList = 0;
var englishQuotesList = 0;
var russianQuotesList = 0;
var englishKirtanList = 0;
var russianKirtanList = 0;
var videoList = 0;
var ruSummaryList = 0;
var galleryList = 0;
// });
let count = 0;
var httpAgent = new https.Agent();
httpAgent.maxSockets = 60;
const readline = require("readline");

function timeConverter(timestamp) {
	let date = new Date(timestamp * 1000);
	return date;
}
const cookie = new tough.Cookie({
	key: "SSESS8c0f16dd6e4ff53e267519930069d1e3",
	//value: "mGCQ4zhYa9K0Dex2-xTn4Eh5c3Ej_4NnuEKuhxPcPb0",
	value: "pAZYmQp6eb3H7-be9S6Z6_3gSx8OfeNuq9egFKtQNaU",
	domain: "nrs.niranjanaswami.net",
	httpOnly: false,
	maxAge: 315360000000000
});
var cookiejar = rp.jar();
cookiejar._jar.rejectPublicSuffixes = false;
cookiejar.setCookie(cookie.toString(), "https://nrs.niranjanaswami.net");

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0;
		var v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}


var fetchDateTime;

function saveErrorLog(error) {
	// var AWS = require('aws-sdk');
	// AWS.config.update({region: 'us-east-2'});
	let date = new Date();
	let folderName = Math.round(
		new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
	).toString();
	let timestamp = new Date().getTime().toString();
	console.log(timestamp);
	let filePath = "errorSavingRecords/" + folderName + "/" + timestamp + ".txt";

	//let s3 = new AWS.S3({apiVersion: '2006-03-01'});
	var bucketParams = {
		Bucket: "hhns"
	};

	let body = {
		error: error
	};

	// Call S3 to obtain a list of the objects in the bucket
	console.log("here1");
	let objectParams = {
		Bucket: bucketParams.Bucket,
		Key: filePath,
		Body: JSON.stringify(body)
	};
	let uploadPromise = new AWS.S3({ apiVersion: "2006-03-01" })
		.putObject(objectParams)
		.promise();
	uploadPromise
		.then(data => {
			console.log(
				"Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath
			);
			//res.status(200).json( { message : "Successfully uploaded data to " + bucketParams.Bucket + "/" + filePath } );
		})
		.catch(err => {
			console.log(err);
			console.log({ error: err });
		});
}

listObject();

function listObject() {
	// Load the AWS SDK for Node.js

	AWS.config.update({
		region: "us-east-2",
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	});

	// Create S3 service object
	s3 = new AWS.S3({ apiVersion: "2006-03-01" });

	// Create the parameters for calling listObjects
	var bucketParams = {
		Bucket: "hhns"
	};
	let date = new Date();
	let timestamp = Math.round(
		new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
	).toString();
	console.log("timestamp" + timestamp);
	// Call S3 to obtain a list of the objects in the bucket
	s3.listObjects(bucketParams, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred

		var sortArray;

		let arr = data.Contents.filter(value => {
			if (value.Key.includes("savingRecords/" + timestamp + "/")) {
				return value;
			} else if (value.Key.includes("savingRecords/")) {
				return value;
			}
		});
		if (arr.length > 0) {
			arr.sort(function(a, b) {
				return b.LastModified > a.LastModified
					? 1
					: a.LastModified > b.LastModified
					? -1
					: 0;
			});

			for (var file of arr) {
				console.log(file);
			}

			var params = { Bucket: "hhns", Key: arr[0].Key };
			//let filename = './data/timestamp.txt';
			// var filename = "./data/" + arr[0].Key.replace(/^.*[\\\/]/, "");
			// console.log(filename);
			// var file = fs.createWriteStream(filename);
			s3.getObject(params, function(err, data) {
				if (err) return err;
				let objectData = data.Body.toString("utf-8");
				console.log(JSON.parse(objectData).timestamp);
				fetchDateTime = JSON.parse(objectData).timestamp;
				getEnglishNodeList(); // Use the encoding necessary
			});
		} else {
			console.log("no data");
			fetchDateTime = 0;
			//getEnglishNodeList();
			getEnglishLectureNodeList();
			//getQutoesEnglishNodeList();
			//getEnglishKirtanNodeList();
		}
	});
}


/* #region Lectures*/

var englishLectureDataList = [];
var russianLectureDataList = [];
var russianLectureFinalData = [];

function getEnglishLectureNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=lecture&pagesize=10000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			englishLectureDataList = body;
			englishLectureDataList.splice(0, 3300);
			console.log(
				"getEnglishLectureNodeList() function is successfully executed",
				englishLectureDataList.length,
				"data received"
			);
			englishLectureDataList = englishLectureDataList.filter(function(value) {
				return parseInt(value.created) > fetchDateTime;
			});
			if (englishLectureDataList && englishLectureDataList.length > 0) {
				console.log(
					"after filteration length>>",
					englishLectureDataList.length
				);
				getEnglishLectureDatainBatches();
			} else {
				console.log("no new data here. Calling getRuLectureNodeList()");
				getRuLectureNodeList();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getEnglishLectureNodeList() function ====>>>>",
				err
			);
			saveErrorLog(
				"Error inside getEnglishLectureNodeList() function ====>>>>" + err
			);
			getRuLectureNodeList();
		});
}

function getEnglishLectureDatainBatches() {
	if (englishLectureDataList.length > 0) {
		let ar = englishLectureDataList.splice(0, 10);
		getEnglishLectureData(ar, () => {
			setTimeout(() => {
				getEnglishLectureDatainBatches();
				// console.log("fetching only 10 English Lecture records");
				// englishLectureList = 1;
				// getRuLectureNodeList();
			}, 2000);
		});
	} else {
		englishLectureList = 1;
		getRuLectureNodeList();
	}
}

function getRuLectureNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=lecture&pagesize=6000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			russianLectureDataList = body;
			russianLectureDataList.splice(0, 3300);

			console.log(
				"getRuLectureNodeList() function is successfully executed",
				russianLectureDataList.length,
				"data received"
			);
			console.log("fetchDateTime>>", fetchDateTime);
			russianLectureDataList = russianLectureDataList.filter(function(value) {
				return parseInt(value.created) > fetchDateTime;
			});
			if (russianLectureDataList && russianLectureDataList.length > 0) {
				console.log(
					"after filteration length here>>>",
					russianLectureDataList.length
				);
				getRussianLectureDatainBatches();
			} else {
				console.log(
					"no new data here>>>>Calling another function for populating Transcription "
				);
				getEnglishTranscriptionNodeList();
			}
		})
		.catch(function(err) {
			console.log("Error inside getRuLectureNodeList() function ====>>>>", err);
			saveErrorLog("Error inside getRuLectureNodeList() function ====>>>>");
			getEnglishTranscriptionNodeList();
		});
}
function getRussianLectureDatainBatches() {
	if (russianLectureDataList.length > 0) {
		let ar = russianLectureDataList.splice(0, 10);
		getRussianLectureData(ar, () => {
			setTimeout(() => {
				getRussianLectureDatainBatches();
				// console.log("fetching only 10 russian lecture records");
				// russianLectureList = 1;
				// updateDatabaseLectures();
			}, 2000);
		});
	} else {
		russianLectureList = 1;
		updateDatabaseLecturesinBatches();
	}
}
function getRussianLectureData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/ru/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				"User-Agent": "Request-Promise"
			}
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise)
		.then(data => {
			console.log("data Raussainpromise inserted =====>>>>", data.length);
			for (let i = 0; i < data.length; i++) {
				//if (data[i].created > fetchDateTime) {
				if (data[i].tnid !== 0) {
					const temp = {
						tnid: ar[i].tnid,
						languages: "both",
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							topic: data[i].topic,
							location: data[i].location,
							translation: data[i].translation
						}
					};
					russianLectureFinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						tnid: ar[i].tnid,
						languages: "ru",
						author: data[i].author,
						soundcloud_link: data[i].soundcloud,
						lecture_date: data[i].date,
						published_date: timeConverter(ar[i].created),
						duration: data[i].duration,
						part: data[i].part,
						chapter: data[i].chapter,
						verse: data[i].verse,
						audio_link: data[i].file,
						created_date_time: timeConverter(ar[i].created),
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							topic: data[i].topic,
							location: data[i].location,
							translation: data[i].translation
						}
					};
					createSingleRULectureItem(body);
				}
				//}
			}
			callback();
		})
		.catch(err => {
			console.log("error inside the getRussianLectureData() ===>>>", err);
			saveErrorLog(
				"error inside the getRussianLectureData() in Lecture region===>>>"
			);
		});
}

function updateDatabaseLecturesinBatches() {
	if (russianLectureFinalData.length > 0) {
		let batchArray = russianLectureFinalData.splice(0, 200);
		updateDatabaseLectures(batchArray, () => {
			setTimeout(() => {
				updateDatabaseLecturesinBatches();
			}, 1000);
		});
	} else {
		getEnglishTranscriptionNodeList();
	}
}

function updateDatabaseLectures(batchArray, callback) {
	let options = {
		method: "POST",
		uri: "http://localhost:3000/api/lecture/updateBulkNew/",
		//uri: "http://dev.niranjanaswami.net/api/lecture/updateBulkNew/",
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 600000,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};
	rp(options)
		.then(data => {
			console.log("success");
			callback();
		})
		.catch(err => {
			console.log("errr");
			saveErrorLog("err inside updateDatabaseLecture region");
		});
}
function createSingleRULectureItem(body) {
	const options = {
		method: "POST",
		uri: "http://localhost:3000/api/lecture/create/",
		//uri: "http://dev.niranjanaswami.net/api/lecture/create/",
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};
	rp(options)
		.then(data => {
			console.log("Single RU Lecture inserted");
		})
		.catch(err => {
			console.log(err);
			saveErrorLog("err inside createSingleRULectureItem function");
		});
}
function getEnglishLectureData(ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/en/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				"User-Agent": "Request-Promise"
			}
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise)
		.then(data => {
			const insertDataPromise = data.map((item, i) => {
				const body = {
					uuid: uuidv4(),
					tnid: ar[i].tnid,
					languages: item.tnid != 0 ? "" : "en",
					author: item.author,
					soundcloud_link: item.soundcloud,
					lecture_date: item.date,
					published_date: timeConverter(ar[i].created),
					created_date_time: timeConverter(ar[i].created),
					duration: item.duration,
					part: item.part,
					chapter: item.chapter,
					verse: item.verse,
					audio_link: item.file,
					en: {
						nid: ar[i].nid,
						title: item.title,
						event: item.event,
						topic: item.topic,
						location: item.location,
						translation: item.translation
					},
					counters: {
						downloads: item.downloads
					}
				};
				const options = {
					method: "POST",
					uri: "http://localhost:3000/api/lecture/create/",
					//uri: "http://dev.niranjanaswami.net/api/lecture/create/",
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						"User-Agent": "Request-Promise"
					}
				};
				return rp(options);
			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log("data inserted =====>>>>", data.length);
			callback();
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
			saveErrorLog("error inside the profile api ===>>>");
		});
}

/* #endregion*/

/* #region Transcription*/
/* Get transcription tnid both en and ru
get transcription details both
get target id and insert data into target */
var englishTranscriptionDataList = [];
var russianTranscriptionDataList = [];
var transcriptionFinalData = [];
let errorList = [];

function getEnglishTranscriptionNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=transcription&pagesize=10000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};
	rp(options)
		.then(function(body) {
			englishTranscriptionDataList = body;
			englishTranscriptionDataList.splice(0, 60);
			console.log(
				"getEnglishTranscriptionNodeList() function is successfully executed",
				englishTranscriptionDataList.length,
				"data received"
			);
			englishTranscriptionDataList = englishTranscriptionDataList.filter(
				function(value) {
					return parseInt(value.created) > fetchDateTime;
				}
			);
			if (
				englishTranscriptionDataList &&
				englishTranscriptionDataList.length > 0
			) {
				console.log(
					"after filteration>>>",
					englishTranscriptionDataList.length
				);
				englishTranscriptsList = 1;
				getEnglishTranscriptionDatainBatches();
			} else {
				console.log("no new data here>>> Calling RuNode list");
				getRuTranscriptionNodeList();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getEnglishTranscriptionNodeList() function ====>>>>",
				err
			);
			saveErrorLog(
				"Error inside getEnglishTranscriptionNodeList() function in Transcription Region ====>>>>"
			);
			getRuTranscriptionNodeList();
		});
}
function getEnglishTranscriptionDatainBatches() {
	if (englishTranscriptionDataList.length > 0) {
		let ar = englishTranscriptionDataList.splice(0, 10);
		getEnglishTranscriptionData(ar, () => {
			setTimeout(() => {
				getEnglishTranscriptionDatainBatches();
			}, 2000);
		});
	} else {
		getRuTranscriptionNodeList();
	}
}
function getEnglishTranscriptionData(ar, callback) {
	//console.log("ar>>>>", ar);
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/en/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				"User-Agent": "Request-Promise"
			}
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise)
		.then(data => {
			console.log("data EnglishPromise inserted =====>>>>", data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].audio.nid) {
					let filePath = "./uploads/transcription/" + Date.now() + ".pdf";
					console.log("filePath>>", filePath);
					axios({
						url: data[i].file,
						responseType: "stream"
					})
						.then(response => {
							response.data.pipe(fs.createWriteStream(filePath));
							console.log("File downloaded sucessfully");
							const temp = {
								tnid: data[i].audio.nid,
								en: {
									transcription: {
										nid: ar[i].nid,
										title: data[i].title,
										text: data[i].body,
										attachment_name: data[i].file,
										attachment_link: filePath
									}
								}
							};
							transcriptionFinalData.push(temp);
						})
						.catch(error => {
							console.log("Error while downloading file ==>> ", error);
						});
				} else {
					console.log(
						`Invalid or Missing Reference in data with nid ${data[i].nid}`
					);
					saveErrorLog(
						`Invalid or Missing Reference in data with nid ${data[i].nid}`
					);
				}
			}
			callback();
		})
		.catch(err => {
			console.log("error inside the getEnglishTranscriptionData() ===>>>", err);
			saveErrorLog("error inside the getEnglishTranscriptionData() ===>>>");
		});
}
function getRuTranscriptionNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=transcription&pagesize=6000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			russianTranscriptionDataList = body;
			russianTranscriptionDataList.splice(0, 50);
			console.log(
				"getRuTranscriptionNodeList() function is successfully executed",
				russianTranscriptionDataList.length,
				"data received"
			);
			russianTranscriptionDataList = russianTranscriptionDataList.filter(
				function(value) {
					return parseInt(value.created) > fetchDateTime;
				}
			);
			if (
				russianTranscriptionDataList &&
				russianTranscriptionDataList.length > 0
			) {
				console.log(
					"after filteration length>>>",
					russianTranscriptionDataList.length
				);
				getRussianTranscriptionDatainBatches();
			} else {
				console.log(
					"no new data here>> calling another function for populating quotes"
				);
				getQutoesEnglishNodeList();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getRuTranscriptionNodeList() function ====>>>>",
				err
			);
			saveErrorLog(
				"Error inside getRuTranscriptionNodeList() function ====>>>>"
			);
			getQutoesEnglishNodeList();
		});
}
function getRussianTranscriptionDatainBatches() {
	if (russianTranscriptionDataList.length > 0) {
		let ar = russianTranscriptionDataList.splice(0, 10);
		getRussianTranscriptionData(ar, () => {
			setTimeout(() => {
				getRussianTranscriptionDatainBatches();
				// console.log("fetching only 10 russian transcription records");
				// updateDatabaseTranscriptions();
			}, 2000);
		});
	} else {
		//updateDatabaseTranscriptions();
		//updateDatabaseTranscriptionS3();
		updateDatabaseTranscriptionsInBatches();
	}
}
function getRussianTranscriptionData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/ru/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				"User-Agent": "Request-Promise"
			}
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise)
		.then(data => {
			console.log("data Raussainpromise inserted =====>>>>", data.length);
			for (let i = 0; i < data.length; i++) {
				//console.log("data[i]>>>>", data[i]);
				if (data[i].audio.nid) {
					let filePath = "./uploads/transcription/" + Date.now() + ".pdf";
					axios({
						url: data[i].file,
						responseType: "stream"
					})
						.then(response => {
							response.data.pipe(fs.createWriteStream(filePath));
							console.log("File downloaded sucessfully");
							const temp = {
								tnid: data[i].audio.nid,
								ru: {
									transcription: {
										nid: ar[i].nid,
										title: data[i].title,
										text: data[i].body,
										attachment_name: data[i].file,
										attachment_link: filePath
									}
								}
							};
							transcriptionFinalData.push(temp);
						})
						.catch(error => {
							console.log("Error while downloading file ==>> ", error);
						});
					}
					else {
					console.log(
						`Invalid or Missing Reference in data with nid ${data[i].nid}`
					);
					saveErrorLog(
						`Invalid or Missing Reference in data with nid ${data[i].nid} in getRussianTranscriptiondata() function`
					);
					}
				}
			callback();
		})
		.catch(err => {
			console.log("error inside the getRussianTranscriptionData() ===>>>", err);
			saveErrorLog(
				"error inside the getRussianTranscriptionData() in Transcription region===>>>"
			);
		});
}


function updateDatabaseTranscriptionsInBatches() {
	console.log('updateDatabaseTranscriptions in Batches is running');
	console.log('length>>',transcriptionFinalData.length);
	if (transcriptionFinalData.length > 0) {
		let batchArray = transcriptionFinalData.splice(0, 10);
		updateDatabaseTranscriptions(batchArray, () => {
			setTimeout(() => {
				updateDatabaseTranscriptionsInBatches();
			}, 2000);
		});
	} else {
		englishTranscriptsList = 1;
		russianTranscriptsList = 1;
		getQutoesEnglishNodeList();
	}
}

/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */

async function generateS3Object(awsConfig) {
	const awsConfigObj = {
		// accessKeyId: "AKIAJJPND6YRD2UHG2YQ",
		// secretAccessKey: "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",
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		s3BucketEndpoint: false,
		endpoint: "https://s3.amazonaws.com"
	};
	AWS.config.update(awsConfigObj);
	return new AWS.S3();
}


async function updateDatabaseTranscriptions(batchArray,callback) {
	let counter0 = 0;
	let counter1 = 0;
	for (let i = 0; i < batchArray.length; i++) {
		let filePathEN =
			batchArray[i].en &&
			batchArray[i].en.transcription.attachment_link
				? batchArray[i].en.transcription.attachment_link
				: null;
		let filePathRU =
			batchArray[i].ru &&
			batchArray[i].ru.transcription.attachment_link
				? batchArray[i].ru.transcription.attachment_link
				: null;
		if (filePathEN) {
			counter0++;
			let content = await fs.readFileSync(filePathEN);
			let base64data = new Buffer(content, "binary");
			let myKey = `uploads/transcription/${Date.now()}.pdf`;
			let params = {
				Bucket: "nrstranscriptionlist",
				Key: myKey,
				Body: base64data,
				ACL: "public-read"
			};
			const s3 = await generateS3Object();
			let url;
			s3.upload(params, (err, data) => {
				if (err) console.error(`Upload Error ${err}`);
				else {
					url = data.Location;
					console.log("Upload Completed, url ==>> ", url);
					batchArray[i].en.transcription.attachment_link = url;
					counter1++;
				}
			});
		}
		if (filePathRU) {
			counter0++;
			let content = await fs.readFileSync(filePathRU);
			let base64data = new Buffer(content, "binary");
			let myKey = `uploads/transcription/${Date.now()}.pdf`;
			let params = {
				Bucket: "nrstranscriptionlist",
				Key: myKey,
				Body: base64data,
				ACL: "public-read"
			};
			const s3 = await generateS3Object();
			let url;
			s3.upload(params, (err, data) => {
				if (err) console.error(`Upload Error ${err}`);
				else {
					url = data.Location;
					console.log("Upload Completed, url ==>> ", url);
					batchArray[i].ru.transcription.attachment_link = url;
					counter1++;
				}
			});
		}
    }
    console.log('values');
            console.log(counter0);
            console.log(counter1);
	let timer = setInterval(() => {
		if (counter1 === counter0) {
            console.log('hello');
            console.log('values');
            console.log(JSON.stringify(batchArray))
            console.log(counter0);
            console.log(counter1);
			let options = {
				method: "POST",
				uri : "https://localhost:3000/api/lecture/updateBulkNew",
				//uri: `${apiURL}/api/lecture/updateBulkNew/`,
				body: batchArray,
				json: true,
				pool: httpAgent,
				timeout: 600000,
				headers: {
					"User-Agent": "Request-Promise"
				}
			};
			rp(options)
				.then(data => {
					console.log("success");
					clearInterval(timer);
                    writeErrors();
                    callback();
				})
				.catch(err => {
					console.log('err>>>',err);
                    writeErrors();
                    
				});
			
		} else {
			console.log("Waiting for upload to complete");
		}
	}, 3000);
}

function writeErrors() {
	fs.writeFile("transcript_errors.txt", errorList, err => {
		if (err) console.log(err);
		console.log("Successfully Written to File.");
	});
}
