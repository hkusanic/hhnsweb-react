var rp = require("request-promise");
var tough = require("tough-cookie");
var fs = require("fs");
var https = require("https");
var httpAgent = new https.Agent();
httpAgent.maxSockets = 30;
const readline = require("readline");
var fs = require("fs");
const axios = require("axios");


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
let apiURL = "http://localhost:3000";
rl.question("Please provide the api url\n", answer => {
	apiURL = answer ? answer : "http://localhost:3000";
	console.log(`API url: ${apiURL}`);
	rl.question(
		"What do you like to do? \n1.Populate Blog Data\n2.Populate Lecture Data\n3.Insert Transcription Data into Lectures\n4.Insert Summary Data into Lectures\n5.Insert Quotes Data\n6.Insert Kirtan Data\n",
		answer => {
			switch (answer) {
				case "1":
					console.log("Populating Blog Data");
					getEnglishNodeList();
					break;
				case "2":
					console.log("Populating Lecture Data");
					getEnglishLectureNodeList();
					break;
				case "3":
					console.log("Populating Transcription Data");
					getEnglishTranscriptionNodeList();
					break;
				case "4":
					console.log("Populating Summary Data");
					getRuSummaryNodeList();
					break;
				case "5":
					console.log("Populating Quotes Data");
					// getQutoesEnglishNodeList();
					getQuotesRuNodeList();
					break;
				case "6":
					console.log("Populating Kirtan Data");
					// getEnglishKirtanNodeList();
					getRuKirtanNodeList();
					break;
			}

			rl.close();
		}
	);
});

function timeConverter(timestamp) {
	let date = new Date(timestamp * 1000);
	return date;
}
const cookie = new tough.Cookie({
	key: "SSESS8c0f16dd6e4ff53e267519930069d1e3",
	//value: 'XUfGmT8GfOHDJsh_5Pnit_eUpvmu9CrGqYbRyBr4vho',
	value: "pAZYmQp6eb3H7-be9S6Z6_3gSx8OfeNuq9egFKtQNaU",
	domain: "nrs.niranjanaswami.net",
	httpOnly: false,
	maxAge: 3153600000000
});
var cookiejar = rp.jar();
cookiejar._jar.rejectPublicSuffixes = false;
cookiejar.setCookie(cookie.toString(), "https://nrs.niranjanaswami.net");

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (Math.random(getEnglishData) * 16) | 0;
		var v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/* #region Blog*/
var englishDataList = [];
var raussainDataList = [];
var raussainfinalData = [];

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
		.then(function(body) getEnglishData{
			englishDataList = body;
			console.log(
				"getEnglishList() function is successfully executed",
				englishDataList.length,
				"data received"
			);
			getEnglishDatainBatches();
		})
		.catch(function(err) {
			console.log("Error inside getUserList() function ====>>>>", err);
		});
}

function getEnglishDatainBatches() {
	if (englishDataList.length > 0) {
		let ar = englishDataList.splice(0, 10);
		getEnglishData(ar, () => {
			setTimeout(() => {
				getEnglishDatainBatches();
			}, 4000);
		});
	} else {
		getRuNodeList();
	}
}

function getRaussainDatainBatches() {
	if (raussainDataList.length > 0) {
		let ar = raussainDataList.splice(0, 10);
		getRaussainData(ar, () => {
			setTimeout(() => {
				getRaussainDatainBatches();
			}, 4000);
		});
	} else {
		updateDatabaseInBatches();
	}
}

function updateDatabaseInBatches() {
	if (raussainfinalData.length > 0) {
		let batchArray = raussainfinalData.splice(0, 10);
		updateDatabase(batchArray, () => {
			setTimeout(() => {
				updateDatabaseInBatches();
			}, 1000);
		});
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
			console.log(
				"getRuNodeList() function is successfully executed",
				raussainDataList.length,
				"data received"
			);
			getRaussainDatainBatches();
		})
		.catch(function(err) {
			console.log("Error inside getRuNodeList() function ====>>>>", err);
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
						publish_date: timeConverter(ar[i].created),
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
		});
}

function updateDatabase(batchArray, callback) {
	let options = {
		method: "POST",
		uri: "http://localhost:3000/api/blog/updateBulkNew/",
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
		});
}
function createSingleRUBlogItem(body) {
	const options = {
		method: "POST",
		uri: "http://localhost:3000/api/blog/create/",
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
				const body = {
					uuid: uuidv4(),
					author: "Niranjana Swami",
					audio_files: [],
					tnid: ar[i].tnid,
					blog_creation_date: item.date,
					created_date_time: timeConverter(ar[i].created),
					publish_date: timeConverter(ar[i].created),
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
					uri: "http://localhost:3000/api/blog/create/",
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
			console.log(
				"getEnglishLectureNodeList() function is successfully executed",
				englishLectureDataList.length,
				"data received"
			);
			getEnglishLectureDatainBatches();
		})
		.catch(function(err) {
			console.log(
				"Error inside getEnglishLectureNodeList() function ====>>>>",
				err
			);
		});
}

function getEnglishLectureDatainBatches() {
	if (englishLectureDataList.length > 0) {
		let ar = englishLectureDataList.splice(0, 10);
		getEnglishLectureData(ar, () => {
			setTimeout(() => {
				getEnglishLectureDatainBatches();
			}, 2000);
		});
	} else {
		getRuLectureNodeList();
	}
}

function getEnglishLectureData(ar, callback) {
	const Englishpromise = [];
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
					uri: `${apiURL}/api/lecture/create/`,
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
		});
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
			console.log(
				"getRuLectureNodeList() function is successfully executed",
				russianLectureDataList.length,
				"data received"
			);
			getRussianLectureDatainBatches();
		})
		.catch(function(err) {
			console.log("Error inside getRuLectureNodeList() function ====>>>>", err);
		});
}

function getRussianLectureDatainBatches() {
	if (russianLectureDataList.length > 0) {
		let ar = russianLectureDataList.splice(0, 10);
		getRussianLectureData(ar, () => {
			setTimeout(() => {
				getRussianLectureDatainBatches();
			}, 2000);
		});
	} else {
		updateDatabaseLectures();
	}
}

function getRussianLectureData(ar, callback) {
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
				if (ar[i].tnid !== 0) {
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
			}
			callback();
		})
		.catch(err => {
			console.log("error inside the getRussianLectureData() ===>>>", err);
		});
}

function updateDatabaseLectures() {
	let options = {
		method: "POST",
		uri: `${apiURL}/api/lecture/updateBulkNew/`,
		body: russianLectureFinalData,
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
		})
		.catch(err => {
			console.log("errr");
		});
}

function createSingleRULectureItem(body) {
	const options = {
		method: "POST",
		uri: `${apiURL}/api/lecture/create/`,
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
		});
}

/* #endregion*/

/* #region Transcription*/

var englishTranscriptionDataList = [];
var russianTranscriptionDataList = [];
var transcriptionFinalData = [];
let errorList = [];
let urlDataList = [];

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
			console.log(
				"getEnglishTranscriptionNodeList() function is successfully executed",
				englishTranscriptionDataList.length,
				"data received"
			);
			getEnglishTranscriptionDatainBatches();
		})
		.catch(function(err) {
			console.log(
				"Error inside getEnglishTranscriptionNodeList() function ====>>>>",
				err
			);
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
		// updateDatabaseTranscriptions();
	}
}

function getEnglishTranscriptionData(ar, callback) {
	const Englishpromise = [];
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
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise)
		.then(data => {
			console.log("data EnglishPromise inserted =====>>>>", data.length);
			for (let i = 0; i < data.length; i++) {
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
				}
				 else {
					console.log(
						`Invalid or Missing Reference in data with nid ${ar[i].nid}`
					);
					let str = `En ${ar[i].nid}`;
					errorList.push(str);
				}
			}
			callback();
		})
		.catch(err => {
			console.log("error inside the getEnglishTranscriptionData() ===>>>", err);
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
			console.log(
				"getRuTranscriptionNodeList() function is successfully executed",
				russianTranscriptionDataList.length,
				"data received"
			);
			getRussianTranscriptionDatainBatches();
		})
		.catch(function(err) {
			console.log(
				"Error inside getRuTranscriptionNodeList() function ====>>>>",
				err
			);
		});
}

function getRussianTranscriptionDatainBatches() {
	if (russianTranscriptionDataList.length > 0) {
		let ar = russianTranscriptionDataList.splice(0, 10);
		getRussianTranscriptionData(ar, () => {
			setTimeout(() => {
				getRussianTranscriptionDatainBatches();
			}, 2000);
		});
	} else {
		updateDatabaseTranscriptions();
	}
}

function getRussianTranscriptionData(ar, callback) {
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
						`Invalid or Missing Reference in data with nid ${ar[i].nid}`
					);
					let str = `Ru ${ar[i].nid}`;
					errorList.push(str);
				}
			}
			callback();
		})
		.catch(err => {
			console.log("error inside the getRussianTranscriptionData() ===>>>", err);
		});
}



/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */

async function generateS3Object(awsConfig) {
	const awsConfigObj = {
		accessKeyId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
		secretAccessKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
		s3BucketEndpoint: false,
		endpoint: "https://s3.amazonaws.com"
	};
	AWS.config.update(awsConfigObj);
	return new AWS.S3();
}

async function updateDatabaseTranscriptions() {
	let counter0 = 0;
	let counter1 = 0;
	for (let i = 0; i < transcriptionFinalData.length; i++) {
		let filePathEN =
			transcriptionFinalData[i].en &&
			transcriptionFinalData[i].en.transcription.attachment_link
				? transcriptionFinalData[i].en.transcription.attachment_link
				: null;
		let filePathRU =
			transcriptionFinalData[i].ru &&
			transcriptionFinalData[i].ru.transcription.attachment_link
				? transcriptionFinalData[i].ru.transcription.attachment_link
				: null;
		if (filePathEN) {
			counter0++;
			let content = await fs.readFileSync(filePathEN);
			let base64data = new Buffer(content, "binary");
			let myKey = `uploads/transcription/${Date.now()}.pdf`;
			let params = {
				Bucket: "nrsblog",
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
					transcriptionFinalData[i].en.transcription.attachment_link = url;
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
				Bucket: "nrsblog",
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
					transcriptionFinalData[i].ru.transcription.attachment_link = url;
					counter1++;
				}
			});
		}
	}
	let timer = setInterval(() => {
		if (counter1 === counter0) {
			let options = {
				method: "POST",
				uri: `${apiURL}/api/lecture/updateBulkNew/`,
				body: transcriptionFinalData,
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
					writeErrors();
				})
				.catch(err => {
					console.log(err);
					writeErrors();
				});
			clearInterval(timer);
		} else {
			console.log("Waiting for upload to complete");
		}
	}, 2000);
}

function writeErrors() {
	fs.writeFile("transcript_errors.txt", errorList, err => {
		if (err) console.log(err);
		console.log("Successfully Written to File.");
	});
}

/* #endregion*/

/* #region Summary */
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
			console.log(
				"getRuSummaryNodeList() function is successfully executed",
				russianSummaryDataList.length,
				"data received"
			);
			getRussianSummaryDatainBatches();
		})
		.catch(function(err) {
			console.log(
				"Error inside getRuTranscriptionNodeList() function ====>>>>",
				err
			);
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
		updateDatabaseSummary();
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
		});
}

function updateDatabaseSummary() {
	console.log("updateDatabaseSummary()", summaryFinalData.length);
	let options = {
		method: "POST",
		uri: `${apiURL}/api/lecture/updateBulkNew/`,
		body: summaryFinalData,
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
		})
		.catch(err => {
			console.log("Error in updateDatabaseSummary()", err);
		});
}

/* #endregion */

/* Quotes Script Start point */

var quotesEnglishNodeList = [];
var quotesRaussainNodeList = [];
// var quotesFinalRaussainData = [];

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
			// quotesEnglishNodeList.splice(0, 5216);
			console.log(
				"getQutoesEnglishNodeList() function is successfully executed",
				quotesEnglishNodeList.length,
				"data received"
			);
			getQuotesDatainBatches();
		})
		.catch(function(err) {
			console.log(
				"Error inside getQutoesEnglishNodeList() function ====>>>>",
				err
			);
		});
}

function getQuotesDatainBatches() {
	if (quotesEnglishNodeList.length > 0) {
		let ar = quotesEnglishNodeList.splice(0, 10);
		getQuotesData(ar, () => {
			setTimeout(() => {
				getQuotesDatainBatches();
			}, 3000);
		});
	} else {
		getQuotesRuNodeList();
	}
}

function getQuotesData(ar, callback) {
	const Quotespromise = [];
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
		Quotespromise.push(rp(options));
	});
	Promise.all(Quotespromise)
		.then(data => {
			const insertQuotesDataPromise = data.map((item, i) => {
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
					uri: `${apiURL}/api/quote/create/`,
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
			return Promise.all(insertQuotesDataPromise);
		})
		.then(data => {
			console.log("submitted successfully ====>>>> data", data.length);
			callback();
		})
		.catch(err => {
			console.log("error inside getQuotesData===>>>", err);
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
			quotesRaussainNodeList.splice(0, 3000);
			console.log(
				"gerQuotesRuNodeList() function is successfully executed",
				quotesRaussainNodeList.length,
				"data received"
			);
			getQuotesRaussainDatainBatches();
		})
		.catch(function(err) {
			console.log("Error inside gerQuotesRuNodeList() function ====>>>>", err);
		});
}

function getQuotesRaussainDatainBatches() {
	if (quotesRaussainNodeList.length > 0) {
		let ar = quotesRaussainNodeList.splice(0, 10);
		getQuotesRaussainData(ar, () => {
			setTimeout(() => {
				getQuotesRaussainDatainBatches();
			}, 3000);
		});
	}
	// else {
	// updateQuoteDatabaseInBatches();
	// }
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
			let quotesFinalRaussainData = [];
			for (let i = 0; i < data.length; i++) {
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
			}
			console.log("outside for loop");

			updateQuoteDatabase(quotesFinalRaussainData, callback);
			// callback();
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
		});
}

function updateQuoteDatabaseInBatches() {
	if (quotesFinalRaussainData.length > 0) {
		let batchArray = quotesFinalRaussainData.splice(0, 10);
		updateQuoteDatabase(batchArray, () => {
			setTimeout(() => {
				updateQuoteDatabaseInBatches();
			}, 2000);
		});
	}
}

function updateQuoteDatabase(batchArray, callback) {
	console.log("inside update");
	let options = {
		method: "POST",
		uri: `${apiURL}/api/quote/updateBulkNew/`,
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
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
		});
}

function createSingleRUQuoteItem(body) {
	console.log("create api");
	console.log("single create api for quotes");
	const options = {
		method: "POST",
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
			console.log(
				"getEnglishList() function is successfully executed",
				englishKirtanDataList.length,
				"data received"
			);
			getEnglishKirtanDatainBatches();
		})
		.catch(function(err) {
			console.log("Error inside getUserList() function ====>>>>", err);
		});
}

function getEnglishKirtanDatainBatches() {
	// console.log('englishDataList===>',englishDataList)
	if (englishKirtanDataList.length > 0) {
		let ar = englishKirtanDataList.splice(0, 10);
		getEnglishKirtanData(ar, () => {
			setTimeout(() => {
				getEnglishKirtanDatainBatches();
			}, 2000);
		});
	} else {
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
				const body = {
					uuid: uuidv4(),
					tnid: ar[i].tnid,
					author: item.artist,
					audio_link: item.file,
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
					uri: `${apiURL}/api/kirtan/create/`,
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
			console.log(
				"getRuNodeList() function is successfully executed",
				raussainKirtanDataList.length,
				"data received"
			);
			getRaussainKirtanDatainBatches();
		})
		.catch(function(err) {
			console.log("Error inside getRuNodeList() function ====>>>>", err);
		});
}

function getRaussainKirtanDatainBatches() {
	if (raussainKirtanDataList.length > 0) {
		let ar = raussainKirtanDataList.splice(0, 10);
		getRaussainKirtanData(ar, () => {
			setTimeout(() => {
				getRaussainKirtanDatainBatches();
			}, 2000);
		});
	} else {
		updateKirtanDatabase();
	}
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
			let raussainKirtanfinalData = [];

			for (let i = 0; i < data.length; i++) {
				console.log(ar[i].tnid);
				if (ar[i].tnid != 0) {
					const temp = {
						tnid: ar[i].tnid,
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
						audio_link: data[i].file,
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
			}
			updateKirtanDatabase(raussainKirtanfinalData, callback);
		})
		.catch(err => {
			console.log("error inside the profile api ===>>>", err);
		});
}

function createSingleRUKirtanItem(body) {
	const options = {
		method: "POST",
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
			console.log("Single RU Kirtan inserted");
		})
		.catch(err => {
			console.log(err);
		});
}

function updateKirtanDatabase(array, callback) {
	let options = {
		method: "POST",
		uri: `${apiURL}/api/kirtan/updateBulkNew/`,
		body: array,
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
		});
}

/* kirtan Script End point */
