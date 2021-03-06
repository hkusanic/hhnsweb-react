var rp = require('request-promise');
var tough = require('tough-cookie');
var fs = require('fs');
var https = require('https');
var httpAgent = new https.Agent();
httpAgent.maxSockets = 30;
const readline = require('readline');
var fs = require('fs');
const axios = require('axios');
var AWS = require('aws-sdk');
require('dotenv').config({ path: '/home/system5/Desktop/hhnsweb-react/.env' });

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let apiURL = 'http://localhost:3000';
rl.question('Please provide the api url\n', answer => {
	apiURL = answer ? answer : 'http://localhost:3000';
	console.log(`API url: ${apiURL}`);
	rl.question(
		'What do you like to do? \n1.Populate Blog Data\n2.Populate Lecture Data\n3.Insert Transcription Data into Lectures\n4.Insert Summary Data into Lectures\n5.Insert Quotes Data\n6.Insert Kirtan Data\n7.Insert Video Data\n8.Insert Gallery Data.\n9.Insert User Data\n',
		answer => {
			switch (answer) {
				case '1':
					console.log('Populating Blog Data');
					getEnglishNodeList();
					break;
				case '2':
					console.log('Populating Lecture Data');
					getEnglishLectureNodeList();
					break;
				case '3':
					console.log('Populating Transcription Data');
					getEnglishTranscriptionNodeList();
					break;
				case '4':
					console.log('Populating Summary Data');
					getRuSummaryNodeList();
					break;
				case '5':
					console.log('Populating Quotes Data');
					getQutoesEnglishNodeList();
					break;
				case '6':
					console.log('Populating Kirtan Data');
					getEnglishKirtanNodeList();
					// getRuKirtanNodeList();
					break;
				case '7':
					console.log('Populating Video Data');
					getVideoNodeList();
					break;
				case '8':
					console.log('Populating gallery Data');
					getGalleryList();
					break;
				case '9':
					console.log('Populating User Data');
					getUserList();
					break;
			}
			rl.close();
		}
	);
});

let count = 0;
httpAgent.maxSockets = 60;

function timeConverter (timestamp) {
	let date = new Date(timestamp * 1000);
	return date;
}
const cookie = new tough.Cookie({
	key: 'SSESS8c0f16dd6e4ff53e267519930069d1e3',
	value: 'aFNQAzZHyiJ5nFKIrDaaxQv_x_irrGHrcOF8kQJl5OE',
	domain: 'nrs.niranjanaswami.net',
	httpOnly: false,
	maxAge: 315360000000000,
});
var cookiejar = rp.jar();
cookiejar._jar.rejectPublicSuffixes = false;
cookiejar.setCookie(cookie.toString(), 'https://nrs.niranjanaswami.net');

function uuidv4 () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0;
		var v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/* #region Blog*/
var englishDataList = [];
var raussainDataList = [];
var raussainfinalData = [];

async function getEnglishNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=blog&pagesize=600&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			englishDataList = body;
			// englishDataList.splice(0, 490);
			console.log(
				'getEnglishList() function is successfully executed',
				englishDataList.length,
				'data received'
			);
			// englishDataList = englishDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (englishDataList && englishDataList.length > 0) {
			// 	console.log("after filteration>>>>", englishDataList.length);
			// 	await getEnglishDatainBatches();
			// } else {
			// 	console.log("no new english blog data here>>>");
			// 	await getRuNodeList();
			// }
			getEnglishDatainBatches();
		})
		.catch(async function (err) {
			console.log(
				'Error inside getEnglishNodeList() function in Blog region ====>>>>',
				err
			);

			// await getRuNodeList();
		});
}

function getEnglishDatainBatches () {
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

function getRaussainDatainBatches () {
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
		updateDatabaseInBatches();
	}
}

function updateDatabaseInBatches () {
	if (raussainfinalData.length > 0) {
		let batchArray = raussainfinalData.splice(0, 10);
		updateDatabase(batchArray, async () => {
			setTimeout(() => {
				updateDatabaseInBatches();
			}, 1000);
		});
	}
	// else {
	// 	getEnglishLectureNodeList();
	// }
}

async function getRuNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=blog&pagesize=600&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			raussainDataList = body;
			// raussainDataList.splice(0, 490);
			console.log(
				'getRuNodeList() function is successfully executed',
				raussainDataList.length,
				'data received'
			);
			// raussainDataList = raussainDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (raussainDataList && raussainDataList.length > 0) {
			// 	console.log("after filteration>>>", raussainDataList.length);
			// 	await getRaussainDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new russian blog data here>> calling another function for populating lecture data"
			// 	);
			// 	getEnglishLectureNodeList();
			// }
			getRaussainDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getRuNodeList() function ====>>>>', err);
		});
}

function getRaussainData (ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/ru/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise)
		.then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (ar[i].tnid !== 0) {
					const temp = {
						tnid: ar[i].tnid,
						languages: 'both',
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							body: data[i].body,
						},
					};
					raussainfinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						author: 'Niranjana Swami',
						audio_files: [],
						tnid: ar[i].tnid,
						blog_creation_date: data[i].date,
						created_date_time: timeConverter(ar[i].created),
						publish_date: ar[i].created,
						languages: ar[i].tnid !== 0 ? '' : 'en',
						comments: data[i].comments,
						ru: {
							nid: data[i].nid,
							title: data[i].title,
							body: data[i].body,
						},
					};
					createSingleRUBlogItem(body);
				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
		});
}

function updateDatabase (batchArray, callback) {
	let options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/blog/updateBulkNew/',
		// uri: "http://dev.niranjanaswami.net/api/blog/updateBulkNew/",
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 600000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('success');
			callback();
		})
		.catch(err => {
			console.log('errr', err);
			// saveErrorLog("error in updateDatabase() function in Blog region");
		});
}

function createSingleRUBlogItem (body) {
	const options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/blog/create/',
		// uri: "http://dev.niranjanaswami.net/api/blog/create/",
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('Single RU Blog inserted');
		})
		.catch(err => {
			console.log(err);
		});
}

function getEnglishData (ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/en/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise)
		.then(data => {
			const insertDataPromise = data.map((item, i) => {
				// console.log(ar[i].created);
				// if (ar[i].created > fetchDateTime) {
				const body = {
					uuid: uuidv4(),
					author: 'Niranjana Swami',
					audio_files: [],
					tnid: ar[i].tnid,
					blog_creation_date: item.date,
					created_date_time: timeConverter(ar[i].created),
					// publish_date: timeConverter(ar[i].created),
					publish_date: ar[i].created,
					languages: item.tnid !== 0 ? '' : 'en',
					comments: item.comments,
					en: {
						nid: ar[i].nid,
						title: item.title,
						body: item.body,
					},
				};
				const options = {
					method: 'POST',
					uri: 'http://localhost:3000/api/blog/create/',
					// uri: "http://dev.niranjanaswami.net/api/blog/create/",
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);
			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log('data inserted =====>>>>', data.length);
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
		});
}
/* #endregion*/

/* #lecture regiion*/

var englishLectureDataList = [];
var russianLectureDataList = [];
var russianLectureFinalData = [];

async function getEnglishLectureNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=lecture&pagesize=10000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			englishLectureDataList = body;
			// englishLectureDataList.splice(0, 3300);
			console.log(
				'getEnglishLectureNodeList() function is successfully executed',
				englishLectureDataList.length,
				'data received'
			);
			// englishLectureDataList = englishLectureDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (englishLectureDataList && englishLectureDataList.length > 0) {
			// 	console.log(
			// 		"after filteration length>>",
			// 		englishLectureDataList.length
			// 	);
			// 	await getEnglishLectureDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new english lecture data here. Calling getRuLectureNodeList()"
			// 	);
			// 	await getRuLectureNodeList();
			// }
			getEnglishLectureDatainBatches();
		})
		.catch(function (err) {
			console.log(
				'Error inside getEnglishLectureNodeList() function ====>>>>',
				err
			);
		});
}

async function getEnglishLectureDatainBatches () {
	if (englishLectureDataList.length > 0) {
		let ar = englishLectureDataList.splice(0, 10);
		getEnglishLectureData(ar, () => {
			setTimeout(() => {
				getEnglishLectureDatainBatches();
			}, 2000);
		});
	} else {
		englishLectureList = 1;
		getRuLectureNodeList();
	}
}

function getRuLectureNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=lecture&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			russianLectureDataList = body;
			// russianLectureDataList.splice(0, 3300);
			console.log(
				'getRuLectureNodeList() function is successfully executed',
				russianLectureDataList.length,
				'data received'
			);
			// console.log("fetchDateTime>>", fetchDateTime);
			// russianLectureDataList = russianLectureDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (russianLectureDataList && russianLectureDataList.length > 0) {
			// 	console.log(
			// 		"after filteration length here>>>",
			// 		russianLectureDataList.length
			// 	);
			// 	await getRussianLectureDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new russian lectures data here>>>>Calling another function for populating Transcription "
			// 	);
			// 	await getEnglishTranscriptionNodeList();
			// }
			getRussianLectureDatainBatches();
		})
		.catch(function (err) {
			console.log('Error inside getRuLectureNodeList() function ====>>>>', err);
		});
}

function getRussianLectureDatainBatches () {
	if (russianLectureDataList.length > 0) {
		let ar = russianLectureDataList.splice(0, 10);
		getRussianLectureData(ar, () => {
			setTimeout(() => {
				getRussianLectureDatainBatches();
			}, 2000);
		});
	} else {
		russianLectureList = 1;
		updateDatabaseLecturesinBatches();
	}
}

function getRussianLectureData (ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/ru/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise)
		.then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].tnid !== 0) {
					const temp = {
						tnid: ar[i].tnid,
						languages: 'both',
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							topic: data[i].topic,
							location: data[i].location,
							translation: data[i].translation,
						},
					};
					russianLectureFinalData.push(temp);
				} else {
					const body = {
						uuid: uuidv4(),
						tnid: ar[i].tnid,
						languages: 'ru',
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
							translation: data[i].translation,
						},
					};
					createSingleRULectureItem(body);
				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getRussianLectureData() ===>>>', err);
		});
}

function updateDatabaseLecturesinBatches () {
	if (russianLectureFinalData.length > 0) {
		let batchArray = russianLectureFinalData.splice(0, 200);
		updateDatabaseLectures(batchArray, () => {
			setTimeout(() => {
				updateDatabaseLecturesinBatches();
			}, 1000);
		});
	}
}

function updateDatabaseLectures (batchArray, callback) {
	let options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/lecture/updateBulkNew/',
		// uri: "http://dev.niranjanaswami.net/api/lecture/updateBulkNew/",
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 600000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('success');
			callback();
		})
		.catch(err => {
			console.log('errr');
		});
}

function createSingleRULectureItem (body) {
	const options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/lecture/create/',
		// uri: "http://dev.niranjanaswami.net/api/lecture/create/",
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('Single RU Lecture inserted');
		})
		.catch(err => {
			console.log(err);
		});
}

function getEnglishLectureData (ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/en/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise)
		.then(data => {
			const insertDataPromise = data.map((item, i) => {
				const body = {
					uuid: uuidv4(),
					tnid: ar[i].tnid,
					languages: item.tnid != 0 ? '' : 'en',
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
						translation: item.translation,
					},
					counters: {
						downloads: item.downloads,
					},
				};
				const options = {
					method: 'POST',
					uri: 'http://localhost:3000/api/lecture/create/',
					// uri: "http://dev.niranjanaswami.net/api/lecture/create/",
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);
			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log('data inserted =====>>>>', data.length);
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
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

async function getEnglishTranscriptionNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=transcription&pagesize=10000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(async function (body) {
			englishTranscriptionDataList = body;
			englishTranscriptionDataList.splice(0, 60);
			console.log(
				'getEnglishTranscriptionNodeList() function is successfully executed',
				englishTranscriptionDataList.length,
				'data received'
			);
			// englishTranscriptionDataList = englishTranscriptionDataList.filter(
			// 	function(value) {
			// 		return parseInt(value.created) > fetchDateTime;
			// 	}
			// );
			// if (
			// 	englishTranscriptionDataList &&
			// 	englishTranscriptionDataList.length > 0
			// ) {
			// 	console.log(
			// 		"after filteration>>>",
			// 		englishTranscriptionDataList.length
			// 	);
			// 	englishTranscriptsList = 1;
			// 	await getEnglishTranscriptionDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new English Transcriptions data here>>> Calling RuNode Transcription list"
			// 	);
			// 	await getRuTranscriptionNodeList();
			// }
			getEnglishTranscriptionDatainBatches();
		})
		.catch(async function (err) {
			console.log(
				'Error inside getEnglishTranscriptionNodeList() function ====>>>>',
				err
			);
			getRuTranscriptionNodeList();
		});
}

function getEnglishTranscriptionDatainBatches () {
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

function getEnglishTranscriptionData (ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/en/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise)
		.then(data => {
			console.log('data EnglishPromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].audio.nid) {
					let filePath = './uploadss/transcriptions/' + Date.now() + '.pdf';
					console.log('filePath>>', filePath);
					axios({
						url: data[i].file,
						responseType: 'stream',
					})
						.then(response => {
							response.data.pipe(fs.createWriteStream(filePath));
							console.log('File downloaded sucessfully');
							const temp = {
								tnid: data[i].audio.nid,
								en: {
									transcription: {
										nid: ar[i].nid,
										title: data[i].title,
										text: data[i].body,
										attachment_name: data[i].filename,
										attachment_link: filePath,
									},
								},
							};
							transcriptionFinalData.push(temp);
						})
						.catch(error => {
							console.log('Error while downloading file ==>> ', error);
						});
				} else {
					console.log(
						`Invalid or Missing Reference in data with nid ${data[i].nid}`
					);
				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getEnglishTranscriptionData() ===>>>', err);
		});
}

async function getRuTranscriptionNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=transcription&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			russianTranscriptionDataList = body;
			russianTranscriptionDataList.splice(0, 60);
			console.log(
				'getRuTranscriptionNodeList() function is successfully executed',
				russianTranscriptionDataList.length,
				'data received'
			);
			// russianTranscriptionDataList = russianTranscriptionDataList.filter(
			// 	function(value) {
			// 		return parseInt(value.created) > fetchDateTime;
			// 	}
			// );
			// if (
			// 	russianTranscriptionDataList &&
			// 	russianTranscriptionDataList.length > 0
			// ) {
			// 	console.log(
			// 		"after filteration length>>>",
			// 		russianTranscriptionDataList.length
			// 	);
			// 	await getRussianTranscriptionDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new data in russian transcriptions here>> calling another function for populating quotes"
			// 	);
			// 	await getQutoesEnglishNodeList();
			// }
			getRussianTranscriptionDatainBatches();
		})
		.catch(async function (err) {
			console.log(
				'Error inside getRuTranscriptionNodeList() function ====>>>>',
				err
			);
		});
}

async function getRussianTranscriptionDatainBatches () {
	if (russianTranscriptionDataList.length > 0) {
		let ar = russianTranscriptionDataList.splice(0, 10);
		getRussianTranscriptionData(ar, () => {
			setTimeout(() => {
				getRussianTranscriptionDatainBatches();
			}, 2000);
		});
	} else {
		updateS3Transcriptions();
	}
}

function getRussianTranscriptionData (ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/ru/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise)
		.then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
			for (let i = 0; i < data.length; i++) {
				if (data[i].audio.nid) {
					let filePath = './uploadss/transcriptions/' + Date.now() + '.pdf';
					axios({
						url: data[i].file,
						responseType: 'stream',
					})
						.then(response => {
							response.data.pipe(fs.createWriteStream(filePath));
							console.log('File downloaded sucessfully');
							const temp = {
								tnid: data[i].audio.nid,
								ru: {
									transcription: {
										nid: ar[i].nid,
										title: data[i].title,
										text: data[i].body,
										attachment_name: data[i].filename,
										attachment_link: filePath,
									},
								},
							};
							transcriptionFinalData.push(temp);
						})
						.catch(error => {
							console.log('Error while downloading file ==>> ', error);
						});
				} else {
					console.log(
						`Invalid or Missing Reference in data with nid ${data[i].nid}`
					);
				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the getRussianTranscriptionData() ===>>>', err);
		});
}

/**
 * To generate s3 object using configuration object
 * @param {object} awsConfig
 * @param {string} awsConfig.accessKeyId Access Key of AWS configuration
 * @param {string} awsConfig.secretAccessKey Access Secret Key(Token) of AWS configuration
 */

async function generateS3Object (awsConfig) {
	const awsConfigObj = {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		s3BucketEndpoint: false,
		endpoint: 'https://s3.amazonaws.com',
	};
	AWS.config.update(awsConfigObj);
	return new AWS.S3();
}

async function updateS3Transcriptions () {
	console.log('updateS3Transcriptions is running');
	console.log(transcriptionFinalData);
	let counter0 = 0;
	let counter1 = 0;
	let promiseArrayEN = [];
	let promiseArrayRU = [];
	for (let i = 0; i < transcriptionFinalData.length; i++) {
		let filePathEN
			= transcriptionFinalData[i].en
			&& transcriptionFinalData[i].en.transcription.attachment_link
				? transcriptionFinalData[i].en.transcription.attachment_link
				: null;
		let filePathRU
			= transcriptionFinalData[i].ru
			&& transcriptionFinalData[i].ru.transcription.attachment_link
				? transcriptionFinalData[i].ru.transcription.attachment_link
				: null;
		if (filePathEN) {
			counter0++;
			let content = await fs.readFileSync(filePathEN);
			let base64data = new Buffer(content, 'binary');
			let myKey = `uploadss/transcriptions/${Date.now()}.pdf`;
			let params = {
				Bucket: 'nrstranscriptionlist2',
				Key: myKey,
				Body: base64data,
				ACL: 'public-read',
			};
			let promise = new Promise((resolve, reject) => {
				const s3 = generateS3Object();
				resolve(s3);
			});
			promise.then(s3 => {
				let url;
				s3.upload(params, (err, data) => {
					if (err) console.error(`Upload Error ${err}`);
					else {
						url = data.Location;
						console.log('Upload Completed, url ==>> ', url);
						transcriptionFinalData[i].en.transcription.attachment_link = url;
						// transcriptionFinalData[i].en.transcription.attachment_name = url;
						counter1++;
					}
				});
			});
		}
		if (filePathRU) {
			counter0++;
			let content = await fs.readFileSync(filePathRU);
			let base64data = new Buffer(content, 'binary');
			let myKey = `uploadss/transcriptions/${Date.now()}.pdf`;
			let params = {
				Bucket: 'nrstranscriptionlist2',
				Key: myKey,
				Body: base64data,
				ACL: 'public-read',
			};
			// const s3 = await generateS3Object();
			let promise = new Promise((resolve, reject) => {
				const s3 = generateS3Object();
				resolve(s3);
			});
			promise.then(s3 => {
				let url;
				s3.upload(params, (err, data) => {
					if (err) console.error(`Upload Error ${err}`);
					else {
						url = data.Location;
						console.log('Upload Completed, url ==>> ', url);
						transcriptionFinalData[i].ru.transcription.attachment_link = url;
						// transcriptionFinalData[i].ru.transcription.attachment_name = url;
						counter1++;
					}
				});
			});
		}
	}
	setTimeout(() => {
		console.log('here');
		updateDatabaseTranscriptionsInBatches();
	}, 8000);
}

async function updateDatabaseTranscriptionsInBatches () {
	console.log('sending data in batches');
	if (transcriptionFinalData.length > 0) {
		let batchArray = transcriptionFinalData.splice(0, 10);
		updateDatabaseTranscriptions(batchArray, () => {
			setTimeout(() => {
				updateDatabaseTranscriptionsInBatches();
			}, 2000);
		});
	}
}

async function updateDatabaseTranscriptions (batchArray, callback) {
	console.log('saving data in batches');
	let options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/lecture/updateBulkNew',
		// uri: "http://dev.niranjanaswami.net/api/lecture/updateBulkNew",
		// uri: `${apiURL}/api/lecture/updateBulkNew/`,
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 600000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('success');
			callback();
		})
		.catch(err => {
			console.log(err);
			callback();
		});
}
/* #endregion*/

/* Quotes Script Start point */

var quotesEnglishNodeList = [];
var quotesRaussainNodeList = [];
var quotesFinalRaussainData = [];

async function getQutoesEnglishNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=quote&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			quotesEnglishNodeList = body;
			// quotesEnglishNodeList.splice(0, 5400);
			console.log(
				'getQutoesEnglishNodeList() function is successfully executed',
				quotesEnglishNodeList.length,
				'data received'
			);
			// quotesEnglishNodeList = quotesEnglishNodeList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (quotesEnglishNodeList && quotesEnglishNodeList.length > 0) {
			// 	console.log(
			// 		"after filteration length>>>>",
			// 		quotesEnglishNodeList.length
			// 	);
			// 	await getQuotesDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new english quotes Data here calling russian quotes list"
			// 	);
			// 	await getQuotesRuNodeList();
			// }
			getQuotesDatainBatches();
		})
		.catch(async function (err) {
			console.log(
				'Error inside getQutoesEnglishNodeList() function ====>>>>',
				err
			);
		});
}

async function getQuotesDatainBatches () {
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
		await getQuotesRuNodeList();
	}
}

function getQuotesData (ar, callback) {
	const Quotespromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			// uri: `${EMAIL_CONFIG.CONSTANTS.FETCH_URL}/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Quotespromise.push(rp(options));
	});
	Promise.all(Quotespromise)
		.then(data => {
			const insertQuotesDataPromise = data.map((item, i) => {
				// if (ar[i].created > fetchDateTime) {
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
							item.body && item.body.length > 0 ? getQuotesBody(item.body) : '',
						source_of_quote:
							item.body && item.body.length > 0
								? getQuotesSource(item.body)
								: '',
					},
				};
				const options = {
					method: 'POST',
					uri: 'http://localhost:3000/api/quote/create/',
					// uri: "http://dev.niranjanaswami.net/api/quote/create/",
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);
				// }
			});
			return Promise.all(insertQuotesDataPromise);
		})
		.then(data => {
			console.log('submitted successfully ====>>>> data', data.length);
			callback();
		})
		.catch(err => {
			console.log('error inside getQuotesData===>>>', err);
		});
}

function getQuotesBody (body) {
	const startIndex = body.indexOf('</p>');
	return body.substr(0, startIndex + 4);
}

function getQuotesSource (body) {
	const startIndex = body.indexOf('</p>');
	return body.substr(startIndex + 5);
}

async function getQuotesRuNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=quote&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			quotesRaussainNodeList = body;
			console.log('quotesRaussainNodeList', quotesRaussainNodeList.length);
			// quotesRaussainNodeList.splice(0, 5200);
			console.log(
				'gerQuotesRuNodeList() function is successfully executed',
				quotesRaussainNodeList.length,
				'data received'
			);
			// quotesRaussainNodeList = quotesRaussainNodeList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (quotesRaussainNodeList && quotesRaussainNodeList.length > 0) {
			// 	console.log(
			// 		"after filteration length >>>>",
			// 		quotesRaussainNodeList.length
			// 	);
			// 	getQuotesRaussainDatainBatches();
			// } else {
			// 	console.log(
			// 		"no new russian quotes here>>>calling another function for populating kirtan"
			// 	);
			getQuotesRaussainDatainBatches();

			// }
		})
		.catch(function (err) {
			console.log('Error inside gerQuotesRuNodeList() function ====>>>>', err);
		});
}

async function getQuotesRaussainDatainBatches () {
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

function getQuotesRaussainData (ar, callback) {
	const QuotesRaussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		QuotesRaussainpromise.push(rp(options));
	});
	Promise.all(QuotesRaussainpromise)
		.then(data => {
			for (let i = 0; i < data.length; i++) {
				if (ar[i].tnid !== 0) {
					console.log('presetn tnid');

					const temp = {
						tnid: ar[i].tnid,
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							body:
								data[i].body && data[i].body.length > 0
									? getQuotesBody(data[i].body)
									: '',
							source_of_quote:
								data[i].body && data[i].body.length > 0
									? getQuotesSource(data[i].body)
									: '',
						},
					};
					quotesFinalRaussainData.push(temp);
				} else {
					console.log('not presetn tnid');
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
							body: data[i].body.length > 0 ? getQuotesBody(data[i].body) : '',
							source_of_quote:
								data[i].body.length > 0 ? getQuotesSource(data[i].body) : '',
						},
					};
					createSingleRUQuoteItem(body);
				}
				// }
			}
			count++;
			console.log('here', count);
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
		});
}

async function updateQuoteDatabaseInBatches () {
	console.log('updateQuoteDatabaseInBatches is running');
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
	}
}

function updateQuoteDatabase (batchArray, callback) {
	console.log('updateQuoteDatabase is running');
	console.log('length of batchArray', batchArray.length);
	let options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/quote/updateBulkNew',
		// uri: "http://dev.niranjanaswami.net/api/quote/updateBulkNew/",
		// uri: "http://dev.niranjanaswami.net/api/quote/updateBulkNew/",
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 60000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('success 1111');
			callback();
		})
		.catch(err => {
			console.log(err);
		});
}

function createSingleRUQuoteItem (body) {
	console.log('create api');
	console.log('single create api for quotes');
	const options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/lecture/updateBulkNew',
		// uri: "http://dev.niranjanaswami.net/api/quote/create/",
		// uri: "http://dev.niranjanaswami.net/api/quote/create/",
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('Single RU Quotes inserted');
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

async function getEnglishKirtanNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=kirtan&pagesize=10000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			// console.log('body===>',body)
			englishKirtanDataList = body;
			englishKirtanDataList.splice(0, 10000);
			console.log(
				'getEnglishList() function is successfully executed',
				englishKirtanDataList.length,
				'data received'
			);
			// englishKirtanDataList = englishKirtanDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (englishKirtanDataList && englishKirtanDataList.length > 0) {
			// 	console.log("after filteration>>>", englishKirtanDataList.length);
			// 	await getEnglishKirtanDatainBatches();
			// } else {
			// 	console.log("no new english kirtan here calling russian kirtan list");
			// 	await getRuKirtanNodeList();
			// }
			getEnglishKirtanDatainBatches();
		})
		.catch(async function (err) {
			console.log('Error inside getUserList() function ====>>>>', err);
		});
}

async function getEnglishKirtanDatainBatches () {
	// getRuKirtanNodeList();
	// console.log("englishDataList===>", englishDataList);
	if (englishKirtanDataList.length > 0) {
		let ar = englishKirtanDataList.splice(0, 10);
		getEnglishKirtanData(ar, () => {
			setTimeout(() => {
				getEnglishKirtanDatainBatches();
			}, 2000);
		});
	} else {
		englishKirtanList = 1;
		await getRuKirtanNodeList();
	}
}

function getEnglishKirtanData (ar, callback) {
	const Englishpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			// uri: `https://nrs.niranjanaswami.net/en/rest/node/${item.nid}.json`,
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Englishpromise.push(rp(options));
	});
	Promise.all(Englishpromise)
		.then(data => {
			const insertDataPromise = data.map((item, i) => {
				// if (ar[i].created > fetchDateTime) {
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
					language: ar[i].tnid !== 0 ? '' : 'en',
					kirtan_creation_date:
						typeof data[i].date === 'string' ? data[i].date : '',
					en: {
						nid: ar[i].nid,
						title: item.title,
						event: item.event,
						location: item.location,
					},
				};
				const options = {
					method: 'POST',
					uri: 'http://localhost:3000/api/kirtan/create/',
					// uri: `http://dev.niranjanaswami.net/api/kirtan/create/`,
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);
				// }
			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log('data inserted =====>>>>', data.length);
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
		});
}

async function getRuKirtanNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=kirtan&pagesize=10000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			raussainKirtanDataList = body;
			raussainKirtanDataList.splice(0, 823);
			console.log(
				'getRuNodeList() function is successfully executed',
				raussainKirtanDataList.length,
				'data received'
			);
			// raussainKirtanDataList = raussainKirtanDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (raussainKirtanDataList && raussainKirtanDataList.length > 0) {
			// 	console.log(
			// 		"after filteration length>>",
			// 		raussainKirtanDataList.length
			// 	);
			// 	 getRaussainKirtanDatainBatches();
			// } else {
			// 	console.log("no new russian kirtan here ending calling video list");
			// 	await getVideoNodeList();
			// }
			getRaussainKirtanDatainBatches();
		})
		.catch(async function (err) {
			console.log('Error inside getRuNodeList() function ====>>>>', err);
			saveErrorLog('Error inside getRuNodeList() function ====>>>>');
			await getVideoNodeList();
		});
}
function getRaussainKirtanDatainBatches () {
	// console.log("getRaussainKirtanDatainBatches is running");
	if (raussainKirtanDataList.length > 0) {
		let ar = raussainKirtanDataList.splice(0, 10);
		getRaussainKirtanData(ar, () => {
			setTimeout(() => {
				getRaussainKirtanDatainBatches();
			}, 2000);
		});
	} else {
		russianKirtanList = 1;
		updateKirtanDatabaseInBatches();
	}
}

function updateKirtanDatabaseInBatches () {
	console.log('updateKirtanDataBaseInBatches() is running ');
	if (raussainKirtanfinalData.length > 0) {
		let batchArray = raussainKirtanfinalData.splice(0, 100);
		updateKirtanDatabase(batchArray, () => {
			console.log("i'm running callback");
			setTimeout(() => {
				updateKirtanDatabaseInBatches();
			}, 3000);
		});
	}
}

function getRaussainKirtanData (ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise)
		.then(data => {
			console.log('successfully executed====>>>>', data.length);

			for (let i = 0; i < data.length; i++) {
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
							downloads: data[i].downloads,
						},
						language: ar[i].tnid !== 0 ? '' : 'both',
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							location: data[i].location,
						},
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
							downloads: data[i].downloads,
						},
						language: 'ru',
						ru: {
							nid: ar[i].nid,
							title: data[i].title,
							event: data[i].event,
							location: data[i].location,
						},
					};
					createSingleRUKirtanItem(body);
				}
			}
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
		});
}

function createSingleRUKirtanItem (body) {
	const options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/kirtan/create/',
		// uri: "http://dev.niranjanaswami.net/api/kirtan/create/",
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('Single RU Kirtan inserted');
		})
		.catch(err => {
			console.log(err);
		});
}

function updateKirtanDatabase (array, callback) {
	if (array.length > 0)
		{console.log('inside update kirtan ===>>>', array.length);}
	let options = {
		method: 'POST',
		uri: `http://localhost:3000/api/kirtan/updateBulkNew/`,
		// uri: `http://dev.niranjanaswami.net/api/kirtan/updateBulkNew/`,
		body: array,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('success updated kirtan');
			callback();
		})
		.catch(err => {
			console.log('errr===>>', err);
		});
}

/*  kirtan Script End point */

/* region Video */

var videoNodeList = [];
var videoNodeListRaussain = [];

async function getVideoNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=video&pagesize=1200&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			videoNodeList = body;
			videoNodeList.splice(0, 1100);
			console.log(
				'getVideoNodeList() function is successfully executed',
				videoNodeList.length,
				'data received'
			);
			// videoNodeList = videoNodeList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (videoNodeList && videoNodeList.length > 0) {
			// 	console.log("after filteration length", videoNodeList.length);
			// 	await getVideoNodeListRaussain();
			// } else {
			// 	console.log(
			// 		"no new videonodelist updated calling getVideoNodeLisrRaussain here "
			// 	);
			// 	await getVideoNodeListRaussain();
			// }
			getVideoNodeListRaussain();
		})
		.catch(function (err) {
			console.log('Error inside getVideoNodeList() function ====>>>>', err);
		});
}

async function getVideoNodeListRaussain () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/ru/rest/node.json?parameters%5Btype%5D=video&pagesize=1200&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			videoNodeListRaussain = body;
			videoNodeListRaussain.splice(0, 1100);
			// videoNodeListRaussain = videoNodeListRaussain.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (videoNodeListRaussain && videoNodeListRaussain.length > 0) {
			// 	console.log(
			// 		"getVideoNodeListRaussain() function is successfully executed",
			// 		videoNodeListRaussain.length,
			// 		"data received"
			// 	);
			// 	await getVideoDatainBatches();
			// } else {
			// 	console.log("no new video here calling summary");
			// 	await getRuSummaryNodeList();
			// }
			getVideoDatainBatches();
		})
		.catch(async function (err) {
			console.log(
				'Error inside getVideoNodeListRaussain() function ====>>>>',
				err
			);
		});
}

async function getVideoDatainBatches () {
	if (videoNodeList.length > 0) {
		let ar = videoNodeList.splice(0, 10);
		getVideoData(ar, () => {
			setTimeout(() => {
				getVideoDatainBatches();
			}, 5000);
		});
	}
}

function getVideoUrls (array) {
	const url = [];
	for (let i = 0; i < array.length; i++) {
		const str = array[i].safe_value.replace('watch?v=', 'embed/');
		url.push(str);
	}
	return url;
}

function getVideoData (ar, callback) {
	const Videopromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/en/rest/node/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Videopromise.push(rp(options));
	});
	Promise.all(Videopromise)
		.then(data => {
			const insertVideoPromise = data.map((item, j) => {
				const refrenceId
					= data[j].field_video_reference && data[j].field_video_reference.und
						? data[j].field_video_reference.und[0].target_id
						: null;
				if (refrenceId !== null) {
					const options = {
						method: 'GET',
						uri: `https://nrs.niranjanaswami.net/en/rest/object/${refrenceId}.json`,
						json: true,
						jar: cookiejar,
						pool: httpAgent,
						timeout: 6000000,
						headers: {
							'User-Agent': 'Request-Promise',
						},
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
										: '',
								en: {
									nid: data[j].nid,
									title: data[j].title,
									body: data[j].body,
									event: singleLecture.event,
									location: singleLecture.location,
								},
								ru: {
									nid: getRaussianNodeId(data[j].nid),
									title: getRaussianTitle(data[j].tnid),
									body: data[j].body,
									event: singleLecture.event,
									location: singleLecture.location,
								},
								oldData: {
									referenceId: refrenceId,
								},
								video_page_view: 0,
								reference: singleLecture.title,
								urls:
									data[j].field_youtube && data[j].field_youtube.und
										? getVideoUrls(data[j].field_youtube.und)
										: [],
							};

							const options = {
								method: 'POST',
								uri: 'http://localhost:3000/api/video/create/',
								// uri: "http://dev.niranjanaswami.net/api/video/create/",
								body: body,
								json: true,
								pool: httpAgent,
								timeout: 6000000,
								headers: {
									'User-Agent': 'Request-Promise',
								},
							};
							return rp(options);
						})
						.catch(err => {
							console.log('error in getting english video details ===>>>', err);
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
								: 'other',
						en: {
							nid: data[j].nid,
							title: data[j].title,
							body: data[j].body,
						},
						ru: {
							nid: getRaussianNodeId(data[j].nid),
							title: getRaussianTitle(data[j].tnid),
							body: data[j].body,
						},
						oldData: {
							referenceId: null,
						},
						reference: '',
						video_page_view: 0,
						urls:
							data[j].field_youtube && data[j].field_youtube.und
								? getVideoUrls(data[j].field_youtube.und)
								: [],
					};

					const options = {
						method: 'POST',
						uri: 'http://localhost:3000/api/video/create/',
						// uri: "http://dev.niranjanaswami.net/api/video/create/",
						body: body,
						json: true,
						pool: httpAgent,
						timeout: 6000000,
						headers: {
							'User-Agent': 'Request-Promise',
						},
					};
					return rp(options);
				}
			});
			return Promise.all(insertVideoPromise);
		})
		.then(data => {
			console.log('data inserted =====>>>>', data.length);
			callback();
		})
		.catch(err => {
			console.log('error inside the profile api ===>>>', err);
		});
}

function getRaussianTitle (tnid) {
	for (let i = 0; i < videoNodeListRaussain.length; i++) {
		if (videoNodeListRaussain[i].tnid === tnid) {
			return videoNodeListRaussain[i].title;
		}
	}
}

function getRaussianNodeId (tnid) {
	for (let i = 0; i < videoNodeListRaussain.length; i++) {
		if (videoNodeListRaussain[i].tnid === tnid) {
			return videoNodeListRaussain[i].nid;
		}
	}
}

/* summary region */

var russianSummaryDataList = [];
var summaryFinalData = [];

function getRuSummaryNodeList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/rest/node.json?parameters%5Btype%5D=summary&pagesize=6000&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(function (body) {
			russianSummaryDataList = body;
			// russianSummaryDataList.splice(0, 550);
			console.log(
				'getRuSummaryNodeList() function is successfully executed',
				russianSummaryDataList.length,
				'data received'
			);
			// russianSummaryDataList = russianSummaryDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (russianSummaryDataList && russianSummaryDataList.length > 0) {
			// 	console.log(
			// 		"after filteration length>>>",
			// 		russianSummaryDataList.length
			// 	);
			// 	await getRussianSummaryDatainBatches();
			// } else {
			// 	console.log("no new data in summary calling get GalleryList function");
			// 	await getGalleryList();
			// }
			getRussianSummaryDatainBatches();
		})
		.catch(async function (err) {
			console.log(
				'Error inside getRuTranscriptionNodeList() function ====>>>>',
				err
			);
			saveErrorLog('err inside getRuTranscriptionNodeList() function====>>>>');
			await getGalleryList();
		});
}

function getRussianSummaryDatainBatches () {
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

function getRussianSummaryData (ar, callback) {
	const Raussainpromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
		};
		Raussainpromise.push(rp(options));
	});
	Promise.all(Raussainpromise)
		.then(data => {
			console.log('data Raussainpromise inserted =====>>>>', data.length);
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
										attachment_link: data[i].audio.file,
									},
								},
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
			console.log('error inside the getRussianSummaryData() ===>>>', err);
		});
}

function getTNIDfromLecture (nid) {
	const options = {
		method: 'GET',
		uri: `https://nrs.niranjanaswami.net/ru/rest/node/${nid}.json`,
		json: true,
		jar: cookiejar,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	return rp(options)
		.then(data => {
			return data.tnid;
		})
		.catch(err => {
			console.log(err);
		});
}

async function updateDatabaseSummaryInBatches () {
	if (summaryFinalData.length > 0) {
		let batchArray = summaryFinalData.splice(0, 10);
		updateDatabaseSummary(batchArray, () => {
			setTimeout(() => {
				updateDatabaseSummaryInBatches();
			}, 1000);
		});
	}
}

function updateDatabaseSummary (batchArray, callback) {
	console.log('updateDatabaseSummary()', summaryFinalData.length);
	let options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/lecture/updateBulkNew',
		// uri: `http://dev.niranjanaswami.net/api/lecture/updateBulkNew/`,
		body: batchArray,
		json: true,
		pool: httpAgent,
		timeout: 60000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('success');
			callback();
		})
		.catch(err => {
			console.log('Error in updateDatabaseSummary()', err);
		});
}

/* #endregion */

/* start gallery region */

let galleryDataList = [];

async function getGalleryList () {
	const options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/en/rest/node.json?parameters%5Btype%5D=Collection&pagesize=600&&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			galleryDataList = body;
			galleryDataList.splice(0, 290);
			console.log(
				'galleryDataList() function is successfully executed',
				galleryDataList.length,
				'data received'
			);
			// galleryDataList = galleryDataList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (galleryDataList && galleryDataList.length > 0) {
			// 	console.log("after filteration>>>>", galleryDataList.length);
			// 	await getGalleryDatainBatches();
			// } else {
			// 	console.log("no new data here>>>");
			// 	await getUserList();
			// }
			getGalleryDatainBatches();
		})
		.catch(function (err) {
			console.log(
				'Error inside getGalleryList() function in Gallery region ====>>>>',
				err
			);
		});
}

function getGalleryDatainBatches () {
	// getRuNodeList();
	if (galleryDataList.length > 0) {
		let ar = galleryDataList.splice(0, 10);
		getGalleryData(ar, async () => {
			setTimeout(async () => {
				getGalleryDatainBatches();
			}, 4000);
		});
	}
}

async function getGalleryData (ar, callback) {
	const Gallerypromise = [];
	ar.map((item, i) => {
		const options = {
			method: 'GET',
			uri: `https://nrs.niranjanaswami.net/en/rest/object/${item.nid}.json`,
			json: true,
			jar: cookiejar,
			timeout: 6000000,
			headers: {
				'User-Agent': 'Request-Promise',
			},
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
					date = year + '-' + month + '-' + day;
				} else {
					date = item.date;
				}
				// console.log(ar[i].created);
				const body = {
					uuid: uuidv4(),
					title_en: item.title,
					title_ru: '',
					comment_uuid: '',
					date: date,
					gallery: item.gallery,
					photos: item.photos,
					publish_date: timeConverter(ar[i].created),
					translation_required: ar[i].translate,
					audit: [],
				};
				const options = {
					method: 'POST',
					uri: 'http://localhost:3000/api/gallery/create/',
					// uri: "http://dev.niranjanaswami.net/api/gallery/create/",
					body: body,
					json: true,
					pool: httpAgent,
					timeout: 6000000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);
			});
			return Promise.all(insertDataPromise);
		})
		.then(data => {
			console.log('data inserted =====>>>>', data.length);
			callback();
		})
		.catch(err => {
			console.log(ar);
			console.log('error inside the gallery api ===>>>', err);
		});
}
/* #endregion*/

/* end gallery region */

/* User List Region  */

var normalUserList = [];
var discipleUserList = [];
var normalUserDetailsList = [];
var discipleUserDetailsList = [];
var finalUserData = [];

function getDiscipleUserDetails () {
	const DisPromiseArr = [];

	for (let k = 0; k < normalUserDetailsList.length; k++) {
		for (let m = 0; m < discipleUserList.length; m++) {
			if (
				normalUserDetailsList[k]
				&& normalUserDetailsList[k].uid !== undefined
				&& discipleUserList[m]
				&& discipleUserList[m].uid !== undefined
			) {
				if (normalUserDetailsList[k].uid === discipleUserList[m].uid) {
					let options = {
						method: 'GET',
						uri:
							'https://nrs.niranjanaswami.net/en/rest/node/'
							+ discipleUserList[m].nid
							+ '.json',
						jar: cookiejar,
						json: true,
						timeout: 600000,
						pool: httpAgent,
						headers: {
							'User-Agent': 'Request-Promise',
						},
					};
					DisPromiseArr.push(rp(options));
				}
			}
		}
	}
	Promise.all(DisPromiseArr)
		.then(data => {
			discipleUserDetailsList = data;
			console.log(
				'getDiscipleUserDetails() function is successfully executed',
				discipleUserDetailsList.length,
				'details data received'
			);
			for (let u = 0; u < normalUserDetailsList.length; u++) {
				if (normalUserDetailsList[u] && normalUserDetailsList[u].uid) {
					let data = {
						oldData: {},
					};
					data.user_id = uuidv4();
					data.userName = normalUserDetailsList[u].name;
					data.email = normalUserDetailsList[u].mail;
					data.isPasswordUpdated = false;
					data.password = 'Gauranga';
					data.timezone = normalUserDetailsList[u].timezone;
					data.language = normalUserDetailsList[u].language;
					data.created = normalUserDetailsList[u].created;
					data.access = normalUserDetailsList[u].access;
					data.login = normalUserDetailsList[u].login;
					data.signature = normalUserDetailsList[u].signature;
					data.signature_format = normalUserDetailsList[u].signature_format;
					data.canAccessKeystone = false;
					data.oldData.uid = normalUserDetailsList[u].uid;
					data.oldData.init = normalUserDetailsList[u].init;
					data.oldData.picture = normalUserDetailsList[u].picture;
					data.oldData.path
						= 'https://nrs.niranjanaswami.net/en/rest/user/'
						+ normalUserDetailsList[u].field_disciple;
					data.disciple = normalUserDetailsList[u].field_disciple.und
						? normalUserDetailsList[u].field_disciple.und[0].value
						: 'No';
					for (let v = 0; v < discipleUserDetailsList.length; v++) {
						if (discipleUserDetailsList[v] && discipleUserDetailsList[v].uid) {
							if (
								discipleUserDetailsList[v].uid === normalUserDetailsList[u].uid
							) {
								data.disciple_profile = {};
								data.name = {};
								data.disciple_profile.first_initiation_date = discipleUserDetailsList[
									v
								].field_first_initiation_date.und
									? discipleUserDetailsList[v].field_first_initiation_date
										.und[0].value
									: '';
								data.disciple_profile.second_initiation_date = discipleUserDetailsList[
									v
								].field_second_initiation_date.und
									? discipleUserDetailsList[v].field_second_initiation_date
										.und[0].value
									: '';
								data.disciple_profile.spiritual_name = discipleUserDetailsList[
									v
								].field_spiritual_name.und
									? discipleUserDetailsList[v].field_spiritual_name.und[0].value
									: '';
								data.disciple_profile.temple = discipleUserDetailsList[v]
									.field_temple.und
									? discipleUserDetailsList[v].field_temple.und[0].value
									: '';
								data.disciple_profile.verifier
									= discipleUserDetailsList[v].verifier
									&& discipleUserDetailsList[v].verifier.und
										? discipleUserDetailsList[v].verifier.und[0].value
										: '';
								data.disciple_profile.marital_status = discipleUserDetailsList[
									v
								].field_marital_status.und
									? discipleUserDetailsList[v].field_marital_status.und[0].value
									: '';
								data.disciple_profile.education = discipleUserDetailsList[v]
									.field_education.und
									? discipleUserDetailsList[v].field_education.und[0].value
									: '';
								data.gender = discipleUserDetailsList[v].field_gender.und
									? discipleUserDetailsList[v].field_gender.und[0].value
									: '';
								data.mobileNumber = discipleUserDetailsList[v]
									.field_mobile_phone.und
									? discipleUserDetailsList[v].field_mobile_phone.und[0].value
									: '';
								data.dob = discipleUserDetailsList[v].field_birth_date.und
									? discipleUserDetailsList[v].field_birth_date.und[0].value
									: '';
								data.name.first = discipleUserDetailsList[v].field_name.und
									? discipleUserDetailsList[v].field_name.und[0].value
									: '';
								data.name.last = discipleUserDetailsList[v].field_surname.und
									? discipleUserDetailsList[v].field_surname.und[0].value
									: '';
								data.oldData.vid = discipleUserDetailsList[v].vid;
								data.oldData.nid = discipleUserDetailsList[v].nid;
							}
						}
					}
					data.oldData.picture = JSON.stringify(data.oldData.picture);
					finalUserData.push(data);
					createSingleUser(data);
				}
			}
		})

		.catch(err => {
			console.log(
				'Error inside getDiscipleUserDetails() function ====>>>>',
				err
			);
			console.log(ar);
		});
}

function createSingleUser (body) {
	// console.log(body);
	const options = {
		method: 'POST',
		uri: 'http://localhost:3000/api/user/uploadPic',
		// /uri: "http://dev.niranjanaswami.net/api/user/uploadPic",
		body: body,
		json: true,
		pool: httpAgent,
		timeout: 6000000,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};
	rp(options)
		.then(data => {
			console.log('Single User inserted');
		})
		.catch(err => {
			console.log(err);
		});
}

async function getNormalUserDetailsinBatches () {
	if (normalUserList.length > 0) {
		let ar = normalUserList.splice(0, 10);
		getNormalUserDetails(ar, () => {
			setTimeout(() => {
				getNormalUserDetailsinBatches();
			}, 4000);
		});
	}
}

function getNormalUserDetails (ar, callback) {
	console.log('length ===>>>', ar.length);
	const PromiseArr = ar.map((item, i) => {
		if (i < ar.length) {
			const uid = ar[i].uid;
			// console.log('uid ====>>>', uid);
			if (ar[i].uid !== undefined && ar[i].uid !== '0' && ar[i].uid !== null) {
				let options = {
					method: 'GET',
					uri: 'https://nrs.niranjanaswami.net/en/rest/user/' + uid + '.json',
					jar: cookiejar,
					json: true,
					pool: httpAgent,
					timeout: 600000,
					headers: {
						'User-Agent': 'Request-Promise',
					},
				};
				return rp(options);
			}
		}
	});

	Promise.all(PromiseArr)
		.then(data => {
			normalUserDetailsList = data;
			getDiscipleUserDetails();
			console.log(
				'getNormalUserDetails() function is successfully executed',
				normalUserDetailsList.length,
				'details data received'
			);
			callback();
		})
		.catch(err => {
			console.log('Error inside getNormalUserDetails() function ====>>>>', err);
		});
}

async function getDiscipleUserList () {
	let options = {
		method: 'GET',
		uri:
			'https://nrs.niranjanaswami.net/rest/node.json?parameters[type]=disciple_profile&pagesize=2000&page=0 ',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			discipleUserList = body;
			// discipleUserList.splice(0, 820);

			console.log(
				'getDiscipleUserList() function is successfully executed',
				discipleUserList.length,
				'data received'
			);
			await getNormalUserDetailsinBatches();
		})
		.catch(function (err) {
			console.log('Error inside getDiscipleUserList() function ====>>>>', err);
		});
}

async function getUserList () {
	let options = {
		method: 'GET',
		uri: 'https://nrs.niranjanaswami.net/rest/user.json?pagesize=5000&page=0',
		jar: cookiejar,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
		},
	};

	rp(options)
		.then(async function (body) {
			normalUserList = body;
			// normalUserList.splice(0, 4200);
			console.log(
				'getUserList() function is successfully executed',
				normalUserList.length,
				'data received'
			);
			// normalUserList = normalUserList.filter(function(value) {
			// 	return parseInt(value.created) > fetchDateTime;
			// });
			// if (normalUserList && normalUserList.length > 0) {
			// 	console.log("after filteration>>>>", normalUserList.length);
			// 	await getDiscipleUserList();
			// }
			await getDiscipleUserList();
		})
		.catch(function (err) {
			console.log('Error inside getUserList() function ====>>>>', err);
		});
}

/* User List region ends  */
