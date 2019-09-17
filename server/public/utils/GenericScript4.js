var rp = require("request-promise");
var tough = require("tough-cookie");
var fs = require("fs");
var https = require("https");
var AWS = require("aws-sdk");
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
/* #region Blog*/
var englishDataList = [];
var raussainDataList = [];
var raussainfinalData = [];

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
			getEnglishNodeList();
			//getQutoesEnglishNodeList();
			//getEnglishKirtanNodeList();
		}
	});
}

function getEnglishNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=blog&pagesize=600&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(async function(body) {
			englishDataList = body;
			//englishDataList.splice(0, 490);
			console.log(
				"getEnglishList() function is successfully executed",
				englishDataList.length,
				"data received"
			);
			englishDataList = englishDataList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (englishDataList && englishDataList.length > 0) {
				console.log("after filteration>>>>", englishDataList.length);
				getEnglishDatainBatches();
			} else {
				console.log("no new data here>>>");
				getRuNodeList();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getEnglishNodeList() function in Blog region ====>>>>",
				err
			);
			saveErrorLog(
				"Error inside getEnglishNodeList() function in Blog region====>>>>"
			);
			getRuNodeList();
		});
}

function getEnglishDatainBatches() {
	//getRuNodeList();
	if (englishDataList.length > 0) {
		let ar = englishDataList.splice(0, 10);
		getEnglishData(ar, () => {
			setTimeout(() => {
				getEnglishDatainBatches();
				// console.log("fetching only 10 records");
				// englishNodeList = 1;
				// getRuNodeList();
			}, 4000);
		});
	} else {
		englishNodeList = 1;
		getRuNodeList();
	}
}

function getRaussainDatainBatches() {
	if (raussainDataList.length > 0) {
		let ar = raussainDataList.splice(0, 10);
		getRaussainData(ar, () => {
			setTimeout(() => {
				getRaussainDatainBatches();
				// console.log("fetching only 10 records");
				// russianNodeList = 1;
				// updateDatabaseInBatches();
			}, 4000);
		});
	} else {
		russianNodeList = 1;
		updateDatabaseInBatches();
	}
}

function updateDatabaseInBatches() {
	if (raussainfinalData.length > 0) {
		let batchArray = raussainfinalData.splice(0, 10);
		updateDatabase(batchArray, () => {
			setTimeout(() => {
				updateDatabaseInBatches();
				// console.log("saving only 10 records");
				// getEnglishLectureNodeList();
			}, 1000);
		});
	} else {
		getEnglishLectureNodeList();
	}
}

function getRuNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=blog&pagesize=600&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			raussainDataList = body;
			//raussainDataList.splice(0, 490);
			console.log(
				"getRuNodeList() function is successfully executed",
				raussainDataList.length,
				"data received"
			);
			// raussainDataList = raussainDataList.filter(function(value) {
			// 	return value.created > fetchDateTime;
			// });
			// if (raussainDataList && raussainDataList.length > 0) {
			// 	console.log("after filteration>>>", raussainDataList.length);
			// 	getRaussainDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new data here>> calling another function for populating lecture data"
			// 	);
			// 	getEnglishLectureNodeList();
			// }
			getRaussainDatainBatches();
		})
		.catch(function(err) {
			console.log("Error inside getRuNodeList() function ====>>>>", err);
			saveErrorLog(
				"error inside getRuNodeList() function in Blog Region ====>>>>"
			);
			getEnglishLectureNodeList();
		});
}

function getRaussainData(ar, callback) {
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
				//if (ar[i].created > fetchDateTime) {
				if (ar[i].tnid !== 0) {
					const temp = {
						tnid: ar[i].tnid,
						languages: "both",
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							body: data[i].body
						}
					};
					raussainfinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						author: "Niranjana Swami",
						audio_files: [],
						tnid: ar[i].tnid,
						blog_creation_date: data[i].date,
						created_date_time: timeConverter(ar[i].created),
						publish_date: ar[i].created,
						languages: ar[i].tnid !== 0 ? "" : "en",
						comments: data[i].comments,
						ru: {
							nid: data[i].nid,
							title: data[i].title,
							body: data[i].body
						}
					};
					createSingleRUBlogItem(body);
				}
			}
			callback();
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
			saveErrorLog("error inside the profile api ===>>>");
		});
}

function updateDatabase(batchArray, callback) {
	let options = {
		method: "POST",
		//uri: "http://localhost:3000/api/blog/updateBulkNew/",
		uri: "http://dev.niranjanaswami.net/api/blog/updateBulkNew/",
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
			console.log("errr", err);
			saveErrorLog("error in updateDatabase() function in Blog region");
		});
}
function createSingleRUBlogItem(body) {
	const options = {
		method: "POST",
		//uri: "http://localhost:3000/api/blog/create/",
		uri: "http://dev.niranjanaswami.net/api/blog/create/",
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
			console.log("Single RU Blog inserted");
		})
		.catch(err => {
			console.log(err);
		});
}
function getEnglishData(ar, callback) {
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
				console.log(ar[i].created);
				//if (ar[i].created > fetchDateTime) {
				const body = {
					uuid: uuidv4(),
					author: "Niranjana Swami",
					audio_files: [],
					tnid: ar[i].tnid,
					blog_creation_date: item.date,
					created_date_time: timeConverter(ar[i].created),
					//publish_date: timeConverter(ar[i].created),
					publish_date: ar[i].created,
					languages: item.tnid !== 0 ? "" : "en",
					comments: item.comments,
					en: {
						nid: ar[i].nid,
						title: item.title,
						body: item.body
					}
				};
				const options = {
					method: "POST",
					//uri: "http://localhost:3000/api/blog/create/",
					uri: "http://dev.niranjanaswami.net/api/blog/create/",
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						"User-Agent": "Request-Promise"
					}
				};
				return rp(options);
				//}
				// else {
				// 	console.log("No new Data");
				// }
			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log("data inserted =====>>>>", data.length);
			callback();
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
			saveErrorLog(
				"error inside the profile api in getEnglishData() function===>>>"
			);
		});
}
/* #endregion*/

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
			//englishLectureDataList.splice(0, 3300);
			console.log(
				"getEnglishLectureNodeList() function is successfully executed",
				englishLectureDataList.length,
				"data received"
			);
			englishLectureDataList = englishLectureDataList.filter(function(value) {
				return value.created > fetchDateTime;
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
			//russianLectureDataList.splice(0, 3300);
			console.log(
				"getRuLectureNodeList() function is successfully executed",
				russianLectureDataList.length,
				"data received"
			);
			console.log("fetchDateTime>>", fetchDateTime);
			russianLectureDataList = russianLectureDataList.filter(function(value) {
				return value.created > fetchDateTime;
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
		//updateDatabaseLectures();
		updateDatabaseLecturesinBatches();
	}
}
function getRussianLectureData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/ru/rest/node/${item.nid}.json`,
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
						tnid: data[i].tnid,
						published_date: timeConverter(data[i].created),
						languages: "both",
						ru: {
							nid: data[i].nid,
							created: timeConverter(data[i].created),
							published: timeConverter(data[i].created),
							changed: timeConverter(data[i].changed),
							title: data[i].title
						}
					};
					russianLectureFinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						tnid: data[i].tnid,
						published_date: timeConverter(data[i].created),
						languages: "ru",
						ru: {
							nid: data[i].nid,
							created: timeConverter(data[i].created),
							published: timeConverter(data[i].created),
							changed: timeConverter(data[i].changed),
							title: data[i].title
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
		//uri: "http://localhost:3000/api/lecture/updateBulkNew/",
		uri: "http://dev.niranjanaswami.net/api/lecture/updateBulkNew/",
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
		//uri: "http://localhost:3000/api/lecture/create/",
		uri: "http://dev.niranjanaswami.net/api/lecture/create/",
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
			uri: `https://nrs.niranjanaswami.net/en/rest/node/${item.nid}.json`,
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
				if (item.created > fetchDateTime) {
					const body = {
						uuid: uuidv4(),
						tnid: item.tnid,
						published_date: timeConverter(item.created),
						languages: item.tnid != 0 ? "" : "en",
						en: {
							nid: item.nid,
							title: item.title,
							created: timeConverter(item.created),
							published: timeConverter(item.created),
							changed: timeConverter(item.changed)
						}
					};
					const options = {
						method: "POST",
						//uri: "http://localhost:3000/api/lecturecreate/",
						uri: "http://dev.niranjanaswami.net/api/lecture/create/",
						body: body,
						json: true,
						pool: httpAgent,
						timeout: 6000000,
						headers: {
							"User-Agent": "Request-Promise"
						}
					};
					return rp(options);
				}
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
			//englishTranscriptionDataList.splice(0, 60);
			console.log(
				"getEnglishTranscriptionNodeList() function is successfully executed",
				englishTranscriptionDataList.length,
				"data received"
			);
			englishTranscriptionDataList = englishTranscriptionDataList.filter(
				function(value) {
					return value.created > fetchDateTime;
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
				// console.log("fetching only 10 transcription data records");
				// englishTranscriptsList = 1;
				// getRuTranscriptionNodeList();
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
			uri: `https://nrs.niranjanaswami.net/en/rest/node/${item.nid}.json`,
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
				if (
					!Array.isArray(data[i].field_reference) &&
					data[i].field_reference.und[0]
				) {
					if (data[i].created > fetchDateTime) {
						const temp = {
							tnid: data[i].field_reference.und[0].target_id,
							en: {
								transcription: {
									nid: data[i].nid,
									created: timeConverter(data[i].created),
									published: timeConverter(data[i].created),
									changed: timeConverter(data[i].changed),
									title: data[i].title,
									text: data[i].body.und[0] ? data[i].body.und[0].value : "",
									attachment_name:
										!Array.isArray(data[i].field_attachment) &&
										data[i].field_attachment.und[0]
											? data[i].field_attachment.und[0].filename
											: "",
									attachment_link:
										!Array.isArray(data[i].field_attachment) &&
										data[i].field_attachment.und[0]
											? data[i].field_attachment.und[0].uri
											: ""
								}
							}
						};
						transcriptionFinalData.push(temp);
					}
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
			//russianTranscriptionDataList.splice(0, 60);
			console.log(
				"getRuTranscriptionNodeList() function is successfully executed",
				russianTranscriptionDataList.length,
				"data received"
			);
			russianTranscriptionDataList = russianTranscriptionDataList.filter(
				function(value) {
					return value.created > fetchDateTime;
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
		updateDatabaseTranscriptionsInBatches();
	}
}
function getRussianTranscriptionData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/ru/rest/node/${item.nid}.json`,
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
				if (
					!Array.isArray(data[i].field_reference) &&
					data[i].field_reference.und[0]
				) {
					//if (ar[i].created > fetchDateTime) {
					const temp = {
						tnid: data[i].field_reference.und[0].target_id,
						ru: {
							transcription: {
								nid: data[i].nid,
								created: timeConverter(data[i].created),
								published: timeConverter(data[i].created),
								changed: timeConverter(data[i].changed),
								title: data[i].title,
								text: data[i].body.und[0].value
									? data[i].body.und[0].value
									: "",
								attachment_name:
									!Array.isArray(data[i].field_attachment) &&
									data[i].field_attachment.und[0]
										? data[i].field_attachment.und[0].filename
										: "",
								attachment_link:
									!Array.isArray(data[i].field_attachment) &&
									data[i].field_attachment.und[0]
										? data[i].field_attachment.und[0].uri
										: ""
							}
						}
					};
					transcriptionFinalData.push(temp);
					//}
				} else {
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
	if (transcriptionFinalData.length > 0) {
		let batchArray = transcriptionFinalData.splice(0, 10);
		updateDatabaseTranscriptions(batchArray, () => {
			setTimeout(() => {
				updateDatabaseTranscriptionsInBatches();
			}, 1000);
		});
	} else {
		englishTranscriptsList = 1;
		russianTranscriptsList = 1;
		getQutoesEnglishNodeList();
	}
}
function updateDatabaseTranscriptions(batchArray, callback) {
	console.log("updateDatabaseTranscriptions is running");
	let options = {
		method: "POST",
		uri: "http://dev.niranjanaswami.net/api/lecture/updateBulkNew",
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
			console.log("errr", err);
			saveErrorLog("errr inside updateDatabaseTranscriptions function");
		});
}

/* #endregion*/

/* Quotes Script Start point */

var quotesEnglishNodeList = [];
var quotesRaussainNodeList = [];
var quotesFinalRaussainData = [];

function getQutoesEnglishNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=quote&pagesize=6000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			quotesEnglishNodeList = body;
			//quotesEnglishNodeList.splice(0, 5400);
			console.log(
				"getQutoesEnglishNodeList() function is successfully executed",
				quotesEnglishNodeList.length,
				"data received"
			);
			quotesEnglishNodeList = quotesEnglishNodeList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (quotesEnglishNodeList && quotesEnglishNodeList.length > 0) {
				console.log(
					"after filteration length>>>>",
					quotesEnglishNodeList.length
				);
				getQuotesDatainBatches();
			} else {
				console.log("no new Data here");
				getQuotesRuNodeList();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getQutoesEnglishNodeList() function ====>>>>",
				err
			);
			saveErrorLog("Error inside getQutoesEnglishNodeList() function ====>>>>");
			getQuotesRuNodeList();
		});
}

function getQuotesDatainBatches() {
	if (quotesEnglishNodeList.length > 0) {
		let ar = quotesEnglishNodeList.splice(0, 10);
		getQuotesData(ar, () => {
			setTimeout(() => {
				getQuotesDatainBatches();
				// console.log("fetching only 10 quotes records");
				// englishQuotesList = 1;
				// getQuotesRuNodeList();
			}, 3000);
		});
	} else {
		englishQuotesList = 1;
		getQuotesRuNodeList();
	}
}

function getQuotesData(ar, callback) {
	const Quotespromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			//uri: `${EMAIL_CONFIG.CONSTANTS.FETCH_URL}/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				"User-Agent": "Request-Promise"
			}
		};
		Quotespromise.push(rp(options));
	});
	Promise.all(Quotespromise)
		.then(data => {
			const insertQuotesDataPromise = data.map((item, i) => {
				//if (ar[i].created > fetchDateTime) {
				const body = {
					uuid: uuidv4(),
					author: item.author,
					tnid: ar[i].tnid,
					created_date_time: timeConverter(ar[i].created),
					published_date: timeConverter(ar[i].created),
					comments: item.comments,
					en: {
						nid: ar[i].nid,
						title: item.title,
						body:
							item.body && item.body.length > 0 ? getQuotesBody(item.body) : "",
						source_of_quote:
							item.body && item.body.length > 0
								? getQuotesSource(item.body)
								: ""
					}
				};
				const options = {
					method: "POST",
					//uri: "http://dev.niranjanaswami.net/api/quote/create/",
					uri: "http://dev.niranjanaswami.net/api/quote/create/",
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						"User-Agent": "Request-Promise"
					}
				};
				return rp(options);
				//}
			});
			return Promise.all(insertQuotesDataPromise);
		})
		.then(data => {
			console.log("submitted successfully ====>>>> data", data.length);
			callback();
		})
		.catch(err => {
			console.log("error inside getQuotesData===>>>", err);
			saveErrorLog("error inside getQuotesData===>>>");
		});
}

function getQuotesBody(body) {
	const startIndex = body.indexOf("</p>");
	return body.substr(0, startIndex + 4);
}

function getQuotesSource(body) {
	const startIndex = body.indexOf("</p>");
	return body.substr(startIndex + 5);
}

function getQuotesRuNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=quote&pagesize=6000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			quotesRaussainNodeList = body;
			console.log("quotesRaussainNodeList", quotesRaussainNodeList.length);
			//quotesRaussainNodeList.splice(0, 5200);
			console.log(
				"gerQuotesRuNodeList() function is successfully executed",
				quotesRaussainNodeList.length,
				"data received"
			);
			quotesRaussainNodeList = quotesRaussainNodeList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (quotesRaussainNodeList && quotesRaussainNodeList.length > 0) {
				console.log(
					"after filteration length >>>>",
					quotesRaussainNodeList.length
				);
				getQuotesRaussainDatainBatches();
			} else {
				console.log(
					"no new quotes here>>>calling another function for populating kirtan"
				);
				getEnglishKirtanNodeList();
			}
		})
		.catch(function(err) {
			console.log("Error inside gerQuotesRuNodeList() function ====>>>>", err);
			saveErrorLog("Error inside gerQuotesRuNodeList() function ====>>>>");
			getEnglishKirtanNodeList();
		});
}

function getQuotesRaussainDatainBatches() {
	if (quotesRaussainNodeList.length > 0) {
		let ar = quotesRaussainNodeList.splice(0, 10);
		getQuotesRaussainData(ar, () => {
			setTimeout(() => {
				getQuotesRaussainDatainBatches();
				// console.log("fetching only 10 russian quotes records");
				// russianQuotesList = 1;
				// updateQuoteDatabaseInBatches();
			}, 3000);
		});
	} else {
		russianQuotesList = 1;
		updateQuoteDatabaseInBatches();
	}
}

function getQuotesRaussainData(ar, callback) {
	const QuotesRaussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				"User-Agent": "Request-Promise"
			}
		};
		QuotesRaussainpromise.push(rp(options));
	});
	Promise.all(QuotesRaussainpromise)
		.then(data => {
			//let quotesFinalRaussainData = [];
			for (let i = 0; i < data.length; i++) {
				//if (ar[i].created > fetchDateTime) {
				if (ar[i].tnid !== 0) {
					console.log("presetn tnid");

					const temp = {
						tnid: ar[i].tnid,
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							body:
								data[i].body && data[i].body.length > 0
									? getQuotesBody(data[i].body)
									: "",
							source_of_quote:
								data[i].body && data[i].body.length > 0
									? getQuotesSource(data[i].body)
									: ""
						}
					};
					quotesFinalRaussainData.push(temp);
				} else {
					console.log("not presetn tnid");
					const body = {
						uuid: uuidv4(),
						author: data[i].author,
						tnid: ar[i].tnid,
						created_date_time: timeConverter(ar[i].created),
						published_date: timeConverter(ar[i].created),
						comments: data[i].comments,
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							body: data[i].body.length > 0 ? getQuotesBody(data[i].body) : "",
							source_of_quote:
								data[i].body.length > 0 ? getQuotesSource(data[i].body) : ""
						}
					};
					createSingleRUQuoteItem(body);
				}
				//}
			}
			count++;
			console.log("here", count);
			//updateQuoteDatabase(quotesFinalRaussainData, callback);
			callback();
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
			saveErrorLog("error inside the profile api ===>>>");
		});
}

function updateQuoteDatabaseInBatches() {
	console.log("updateQuoteDatabaseInBatches is running");
	if (quotesFinalRaussainData.length > 0) {
		let batchArray = quotesFinalRaussainData.splice(0, 400);
		updateQuoteDatabase(batchArray, () => {
			setTimeout(() => {
				updateQuoteDatabaseInBatches();
				// console.log("saving only 10 russian quores records");
				// quotesList = 1;
				// getEnglishKirtanNodeList();
			}, 3000);
		});
	} else {
		quotesList = 1;
		getEnglishKirtanNodeList();
	}
}

function updateQuoteDatabase(batchArray, callback) {
	console.log("updateQuoteDatabase is running");
	console.log("length of batchArray", batchArray.length);
	let options = {
		method: "POST",
		//uri: "http://dev.niranjanaswami.net/api/quote/updateBulkNew/",
		uri: "http://dev.niranjanaswami.net/api/quote/updateBulkNew/",
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 60000000,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};
	rp(options)
		.then(data => {
			console.log("success 1111");
			callback();
		})
		.catch(err => {
			console.log(err);
			saveErrorLog("err inside updateQuoteDatabase() function");
		});
}

function createSingleRUQuoteItem(body) {
	console.log("create api");
	console.log("single create api for quotes");
	const options = {
		method: "POST",
		//uri: "http://dev.niranjanaswami.net/api/quote/create/",
		uri: "http://dev.niranjanaswami.net/api/quote/create/",
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
			console.log("Single RU Quotes inserted");
		})
		.catch(err => {
			console.log(err);
			saveErrorLog("err inside createSingleRUQuoteItem() function");
		});
}
/* Quotes Script End point */

/* kirtan Script Start point */

var englishKirtanDataList = [];
var raussainKirtanDataList = [];
var raussainKirtanfinalData = [];

function getEnglishKirtanNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=kirtan&pagesize=10000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			// console.log('body===>',body)
			englishKirtanDataList = body;
			//englishKirtanDataList.splice(0, 678);
			console.log(
				"getEnglishList() function is successfully executed",
				englishKirtanDataList.length,
				"data received"
			);
			englishKirtanDataList = englishKirtanDataList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (englishKirtanDataList && englishKirtanDataList.length > 0) {
				console.log("after filteration>>>", englishKirtanDataList.length);
				getEnglishKirtanDatainBatches();
			} else {
				console.log("no new kirtan here");
				getRuKirtanNodeList();
			}
		})
		.catch(function(err) {
			console.log("Error inside getUserList() function ====>>>>", err);
			saveErrorLog("Error inside getUserList() function ====>>>>");
			getRuKirtanNodeList();
		});
}

function getEnglishKirtanDatainBatches() {
	//getRuKirtanNodeList();
	//console.log("englishDataList===>", englishDataList);
	if (englishKirtanDataList.length > 0) {
		let ar = englishKirtanDataList.splice(0, 10);
		getEnglishKirtanData(ar, () => {
			setTimeout(() => {
				getEnglishKirtanDatainBatches();
				// console.log("fetching only 10 kirtan records");
				// englishKirtanList = 1;
				// getRuKirtanNodeList();
			}, 2000);
		});
	} else {
		englishKirtanList = 1;
		getRuKirtanNodeList();
	}
}

function getEnglishKirtanData(ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			// uri: `https://nrs.niranjanaswami.net/en/rest/node/${item.nid}.json`,
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
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
				//if (ar[i].created > fetchDateTime) {
				const body = {
					uuid: uuidv4(),
					tnid: ar[i].tnid,
					author: item.artist,
					audio_files: item.file,
					type: item.type,
					soundcloud_link: item.soundcloud,
					duration: item.duration,
					created_date_time: timeConverter(ar[i].created),
					published_date: timeConverter(ar[i].created),
					counter: { downloads: item.downloads },
					language: ar[i].tnid !== 0 ? "" : "en",
					kirtan_creation_date:
						typeof data[i].date === "string" ? data[i].date : "",
					en: {
						nid: ar[i].nid,
						title: item.title,
						event: item.event,
						location: item.location
					}
				};
				const options = {
					method: "POST",
					//uri: "http://localhost:3000/api/kirtan/create/",
					uri: `http://dev.niranjanaswami.net/api/kirtan/create/`,
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						"User-Agent": "Request-Promise"
					}
				};
				return rp(options);
				//}
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

function getRuKirtanNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=kirtan&pagesize=10000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			raussainKirtanDataList = body;
			//raussainKirtanDataList.splice(0, 813);
			console.log(
				"getRuNodeList() function is successfully executed",
				raussainKirtanDataList.length,
				"data received"
			);
			raussainKirtanDataList = raussainKirtanDataList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (raussainKirtanDataList && raussainKirtanDataList.length > 0) {
				console.log(
					"after filteration length>>",
					raussainKirtanDataList.length
				);
				getRaussainKirtanDatainBatches();
			} else {
				console.log("no new kirtan here ending");
				getVideoNodeList();
			}
		})
		.catch(function(err) {
			console.log("Error inside getRuNodeList() function ====>>>>", err);
			saveErrorLog("Error inside getRuNodeList() function ====>>>>");
			getVideoNodeList();
		});
}

function getRaussainKirtanDatainBatches() {
	//console.log("getRaussainKirtanDatainBatches is running");
	if (raussainKirtanDataList.length > 0) {
		let ar = raussainKirtanDataList.splice(0, 10);
		getRaussainKirtanData(ar, () => {
			setTimeout(() => {
				getRaussainKirtanDatainBatches();
				// console.log("fetching only 10 russian kirtan records");
				// russianKirtanList = 1;
				// updateKirtanDatabaseInBatches();
			}, 2000);
		});
	} else {
		// updateKirtanDatabase(raussainKirtanfinalData, () => {
		// 	setTimeout(() => {
		// 		updateKirtanDatabase();
		// 	}, 3000);
		// });
		russianKirtanList = 1;
		updateKirtanDatabaseInBatches();
	}
}

function updateKirtanDatabaseInBatches() {
	console.log("updateKirtanDataBaseInBatches() is running ");
	if (raussainKirtanfinalData.length > 0) {
		let batchArray = raussainKirtanfinalData.splice(0, 100);
		updateKirtanDatabase(batchArray, () => {
			console.log("i'm running callback");
			setTimeout(() => {
				updateKirtanDatabaseInBatches();
				//console.log("saving only 10 kirtan records");
			}, 3000);
		});
	} else {
		getVideoNodeList();
	}
}

function updateS3() {
	// var AWS = require('aws-sdk');
	// AWS.config.update({region: 'us-east-2'});
	let date = new Date();

	let folderName = Math.round(
		new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
	).toString();
	let timestamp = new Date().getTime().toString();
	console.log(timestamp);
	let filePath = "savingRecords/" + folderName + "/" + timestamp + ".txt";

	//let s3 = new AWS.S3({apiVersion: '2006-03-01'});
	var bucketParams = {
		Bucket: "hhns"
	};

	let body = {
		timestamp: timestamp,
		englishNodeList: englishNodeList,
		russianNodeList: russianNodeList,
		englishLectureList: englishLectureList,
		russianLectureList: russianLectureList,
		englishTranscriptsList: englishTranscriptsList,
		russianTranscriptsList: russianTranscriptsList,
		englishQuotesList: englishQuotesList,
		russianQuotesList: russianQuotesList,
		englishKirtanList: englishKirtanList,
		russianKirtanList: russianKirtanList
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

function getRaussainKirtanData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
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
			console.log("successfully executed====>>>>", data.length);
			//let raussainKirtanfinalData = [];

			for (let i = 0; i < data.length; i++) {
				//if (ar[i].created > fetchDateTime) {
				if (data[i].tnid !== 0) {
					const temp = {
						uuid: uuidv4(),
						tnid: ar[i].tnid,
						author: data[i].artist,
						audio_files: data[i].file,
						type: data[i].type,
						soundcloud_link: data[i].soundcloud,
						duration: data[i].duration,
						counter: {
							downloads: data[i].downloads
						},
						language: ar[i].tnid !== 0 ? "" : "both",
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							location: data[i].location
						}
					};
					raussainKirtanfinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						tnid: ar[i].tnid,
						author: data[i].artist,
						audio_files: data[i].file,
						type: data[i].type,
						soundcloud_link: data[i].soundcloud,
						duration: data[i].duration,
						counter: {
							downloads: data[i].downloads
						},
						language: "ru",
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							location: data[i].location
						}
					};
					createSingleRUKirtanItem(body);
				}
				//}
			}
			//updateKirtanDatabase(raussainKirtanfinalData, callback);
			callback();
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
			saveErrorLog("error inside the profile api ===>>>");
		});
}

function createSingleRUKirtanItem(body) {
	const options = {
		method: "POST",
		//uri: "http://localhost:3000/api/kirtan/create/",
		uri: "http://dev.niranjanaswami.net/api/kirtan/create/",
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
			console.log("Single RU Blog inserted");
		})
		.catch(err => {
			console.log(err);
			saveErrorLog("err inside createSingleRUKirtanItem() function");
		});
}

function updateKirtanDatabase(array, callback) {
	if (array.length > 0)
		console.log("inside update kirtan ===>>>", array.length);
	let options = {
		method: "POST",
		//uri: `http://localhost:3000/api/kirtan/updateBulkNew/`,
		uri: `http://dev.niranjanaswami.net/api/kirtan/updateBulkNew/`,
		body: array,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};
	rp(options)
		.then(data => {
			console.log("success updated kirtan");
			callback();
		})
		.catch(err => {
			console.log("errr===>>", err);
			saveErrorLog("errr inside updateKirtanDatabase function===>>");
		});
}

/*  kirtan Script End point */

/* region Video */

var videoNodeList = [];
var videoNodeListRaussain = [];

function getVideoNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=video&pagesize=1200&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			videoNodeList = body;
			//videoNodeList.splice(0, 1100);
			console.log(
				"getVideoNodeList() function is successfully executed",
				videoNodeList.length,
				"data received"
			);
			videoNodeList = videoNodeList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (videoNodeList && videoNodeList.length > 0) {
				console.log("after filteration length", videoNodeList.length);
				getVideoNodeListRaussain();
			} else {
				console.log(
					"videonodelist updated calling getVideoNodeLisrRaussain here "
				);
				getVideoNodeListRaussain();
			}
		})
		.catch(function(err) {
			console.log("Error inside getVideoNodeList() function ====>>>>", err);
			saveErrorLog("err inside getVideoNodeList() function====>>>>");
			getVideoNodeListRaussain();
		});
}

function getVideoNodeListRaussain() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=video&pagesize=1200&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			videoNodeListRaussain = body;
			//videoNodeListRaussain.splice(0, 1100);
			videoNodeListRaussain = videoNodeListRaussain.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (videoNodeListRaussain && videoNodeListRaussain.length > 0) {
				console.log(
					"getVideoNodeListRaussain() function is successfully executed",
					videoNodeListRaussain.length,
					"data received"
				);
				getVideoDatainBatches();
			} else {
				console.log("no new video here calling summary");
				getRuSummaryNodeList();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getVideoNodeListRaussain() function ====>>>>",
				err
			);
			saveErrorLog("err inside getVideoNodeListRaussain() function====>>>>");
			getRuSummaryNodeList();
		});
}

function getVideoDatainBatches() {
	if (videoNodeList.length > 0) {
		let ar = videoNodeList.splice(0, 10);
		getVideoData(ar, () => {
			setTimeout(() => {
				getVideoDatainBatches();
			}, 5000);
		});
	} else {
		console.log("videos successfully stored>>");
		videoList = 1;
		getRuSummaryNodeList();
	}
}

function getVideoUrls(array) {
	const url = [];
	for (let i = 0; i < array.length; i++) {
		const str = array[i].safe_value.replace("watch?v=", "embed/");
		url.push(str);
	}
	return url;
}

function getVideoData(ar, callback) {
	const Videopromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/en/rest/node/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				"User-Agent": "Request-Promise"
			}
		};
		Videopromise.push(rp(options));
	});
	Promise.all(Videopromise)
		.then(data => {
			const insertVideoPromise = data.map((item, j) => {
				const refrenceId =
					data[j].field_video_reference && data[j].field_video_reference.und
						? data[j].field_video_reference.und[0].target_id
						: null;
				if (refrenceId !== null) {
					const options = {
						method: "GET",
						uri: `https://nrs.niranjanaswami.net/en/rest/object/${refrenceId}.json`,
						json: true,
						jar: cookiejar,
						pool: httpAgent,
						timeout: 6000000,
						headers: {
							"User-Agent": "Request-Promise"
						}
					};
					rp(options)
						.then(singleLecture => {
							const body = {
								uuid: uuidv4(),
								video_date: timeConverter(data[j].changed),
								created_date_time: timeConverter(data[j].created),
								published_date: timeConverter(data[j].created),
								type:
									data[j].field_video_type && data[j].field_video_type.und
										? data[j].field_video_type.und[0].value
										: "",
								en: {
									nid: data[j].nid,
									title: data[j].title,
									body: data[j].body,
									event: singleLecture.event,
									location: singleLecture.location
								},
								ru: {
									nid: getRaussianNodeId(data[j].nid),
									title: getRaussianTitle(data[j].tnid),
									body: data[j].body,
									event: singleLecture.event,
									location: singleLecture.location
								},
								oldData: {
									referenceId: refrenceId
								},
								video_page_view: 0,
								reference: singleLecture.title,
								urls:
									data[j].field_youtube && data[j].field_youtube.und
										? getVideoUrls(data[j].field_youtube.und)
										: []
							};

							const options = {
								method: "POST",
								//uri: "http://localhost:3000/api/video/create/",
								uri: "http://dev.niranjanaswami.net/api/video/create/",
								body: body,
								json: true,
								pool: httpAgent,
								timeout: 6000000,
								headers: {
									"User-Agent": "Request-Promise"
								}
							};
							return rp(options);
						})
						.catch(err => {
							console.log("error in getting english video details ===>>>", err);
							saveErrorLog("err in getting english video details====>>>>");
						});
				} else {
					const body = {
						uuid: uuidv4(),
						video_date:
							data[j].field_date && data[j].field_date.und
								? data[j].field_date.und[0].value
								: timeConverter(data[j].created),
						created_date_time: timeConverter(data[j].created),
						published_date: timeConverter(data[j].created),
						type:
							data[j].field_video_type && data[j].field_video_type.und
								? data[j].field_video_type.und[0].value
								: "other",
						en: {
							nid: data[j].nid,
							title: data[j].title,
							body: data[j].body
						},
						ru: {
							nid: getRaussianNodeId(data[j].nid),
							title: getRaussianTitle(data[j].tnid),
							body: data[j].body
						},
						oldData: {
							referenceId: null
						},
						reference: "",
						video_page_view: 0,
						urls:
							data[j].field_youtube && data[j].field_youtube.und
								? getVideoUrls(data[j].field_youtube.und)
								: []
					};

					const options = {
						method: "POST",
						//uri: "http://localhost:3000/api/video/create/",
						uri: "http://dev.niranjanaswami.net/api/video/create/",
						body: body,
						json: true,
						pool: httpAgent,
						timeout: 6000000,
						headers: {
							"User-Agent": "Request-Promise"
						}
					};
					return rp(options);
				}
			});
			return Promise.all(insertVideoPromise);
		})
		.then(data => {
			console.log("data inserted =====>>>>", data.length);
			callback();
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
		});
}

function getRaussianTitle(tnid) {
	for (let i = 0; i < videoNodeListRaussain.length; i++) {
		if (videoNodeListRaussain[i].tnid === tnid) {
			return videoNodeListRaussain[i].title;
		}
	}
}

function getRaussianNodeId(tnid) {
	for (let i = 0; i < videoNodeListRaussain.length; i++) {
		if (videoNodeListRaussain[i].tnid === tnid) {
			return videoNodeListRaussain[i].nid;
		}
	}
}

/* summary region */

var russianSummaryDataList = [];
var summaryFinalData = [];

function getRuSummaryNodeList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/rest/node.json?parameters%5Btype%5D=summary&pagesize=6000&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(function(body) {
			russianSummaryDataList = body;
			//russianSummaryDataList.splice(0, 550);
			console.log(
				"getRuSummaryNodeList() function is successfully executed",
				russianSummaryDataList.length,
				"data received"
			);
			russianSummaryDataList = russianSummaryDataList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (russianSummaryDataList && russianSummaryDataList.length > 0) {
				console.log(
					"after filteration length>>>",
					russianSummaryDataList.length
				);
				getRussianSummaryDatainBatches();
			} else {
				console.log("no new data here calling get GalleryList function");
				getGalleryList();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getRuTranscriptionNodeList() function ====>>>>",
				err
			);
			saveErrorLog("err inside getRuTranscriptionNodeList() function====>>>>");
			getGalleryList();
		});
}

function getRussianSummaryDatainBatches() {
	if (russianSummaryDataList.length > 0) {
		let ar = russianSummaryDataList.splice(0, 10);
		getRussianSummaryData(ar, () => {
			setTimeout(() => {
				getRussianSummaryDatainBatches();
			}, 2000);
		});
	} else {
		updateDatabaseSummaryInBatches();
	}
}

function getRussianSummaryData(ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: "GET",
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
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
				if (data[i].audio.nid && data[i].audio.nid != 0) {
					let tnid;
					getTNIDfromLecture(data[i].audio.nid).then(val => {
						tnid = val;
						if (tnid != 0) {
							const temp = {
								tnid: tnid,
								ru: {
									summary: {
										nid: ar[i].nid,
										text: data[i].body,
										attachment_name: data[i].audio.title,
										attachment_link: data[i].audio.file
									}
								}
							};
							summaryFinalData.push(temp);
						}
					});
				} else {
					console.log(
						`Invalid or Missing Reference in data with nid ${data[i].audio.nid}`
					);
				}
			}
			callback();
		})
		.catch(err => {
			console.log("error inside the getRussianSummaryData() ===>>>", err);
			saveErrorLog("err inside getRaussianSummaryData()====>>>>");
		});
}

function getTNIDfromLecture(nid) {
	const options = {
		method: "GET",
		uri: `https://nrs.niranjanaswami.net/ru/rest/node/${nid}.json`,
		json: true,
		jar: cookiejar,
		timeout: 6000000,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};
	return rp(options)
		.then(data => {
			return data.tnid;
		})
		.catch(err => {
			console.log(err);
			saveErrorLog("err inside getTNIDfromLecture function====>>>>");
		});
}

function updateDatabaseSummaryInBatches() {
	if (summaryFinalData.length > 0) {
		let batchArray = summaryFinalData.splice(0, 10);
		updateDatabaseSummary(batchArray, () => {
			setTimeout(() => {
				updateDatabaseSummaryInBatches();
			}, 1000);
		});
	} else {
		ruSummaryList = 1;
		getGalleryList();
	}
}

function updateDatabaseSummary(batchArray, callback) {
	console.log("updateDatabaseSummary()", summaryFinalData.length);
	let options = {
		method: "POST",
		uri: `http://dev.niranjanaswami.net/api/lecture/updateBulkNew/`,
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 60000,
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
			console.log("Error in updateDatabaseSummary()", err);
			saveErrorLog("err in upDateDatabaseSummary()====>>>>");
		});
}

/* #endregion */

/* start gallery region */

let galleryDataList = [];

function getGalleryList() {
	const options = {
		method: "GET",
		uri:
			"https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=Collection&pagesize=600&&page=0",
		jar: cookiejar,
		json: true,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};

	rp(options)
		.then(async function(body) {
			galleryDataList = body;
			//galleryDataList.splice(0, 490);
			console.log(
				"galleryDataList() function is successfully executed",
				galleryDataList.length,
				"data received"
			);
			fetchDateTime = 0;
			galleryDataList = galleryDataList.filter(function(value) {
				return value.created > fetchDateTime;
			});
			if (galleryDataList && galleryDataList.length > 0) {
				console.log("after filteration>>>>", galleryDataList.length);
				getGalleryDatainBatches();
			} else {
				console.log("no new data here>>>");
				updateS3();
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getGalleryList() function in Gallery region ====>>>>",
				err
			);
			saveErrorLog(
				"Error inside getGalleryList() function in Gallery region====>>>>"
			);
		});
}

function getGalleryDatainBatches() {
	//getRuNodeList();
	if (galleryDataList.length > 0) {
		let ar = galleryDataList.splice(0, 10);
		getGalleryData(ar, () => {
			setTimeout(() => {
				getGalleryDatainBatches();
				// console.log("fetching only 10 records");
				// englishNodeList = 1;
				// getRuNodeList();
			}, 4000);
		});
	} else {
		galleryList = 1;
		console.log("Gallery Updated");
		updateS3();
	}
}

function getGalleryData(ar, callback) {
	const Gallerypromise = [];
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
		Gallerypromise.push(rp(options));
	});
	Promise.all(Gallerypromise)
		.then(data => {
			const insertDataPromise = data.map((item, i) => {
				let date;
				if (item.date == false) {
					date = new Date(ar[i].created * 1000);
					let year = date.getFullYear();
					let day = date.getDate();
					let month = date.getMonth();
					date = year + "-" + month + "-" + day;
				} else {
					date = item.date;
				}
				console.log(date);
				//console.log(ar[i].created);
				const body = {
					uuid: uuidv4(),
					title_en: item.title,
					title_ru: "",
					comment_uuid: "",
					date: date,
					gallery: item.gallery,
					photos: item.photos,
					publish_date: timeConverter(ar[i].created),
					translation_required: ar[i].translate,
					audit: []
				};
				const options = {
					method: "POST",
					//uri: "http://localhost:3000/api/blog/create/",
					uri: "http://localhost:3000/api/gallery/create/",
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
			console.log(ar);
			console.log("error inside the gallery api ===>>>", err);
			saveErrorLog(
				"error inside the gallery api in getGalleryData() function===>>>"
			);
		});
}
/* #endregion*/

/* end gallery region */
