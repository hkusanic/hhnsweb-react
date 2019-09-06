var rp = require("request-promise");
var tough = require("tough-cookie");
var fs = require("fs");
var https = require("https");
var httpAgent = new https.Agent();
httpAgent.maxSockets = 50;

function timeConverter(timestamp) {
	let date = new Date(parseInt(timestamp) * 1000);
	return date;
}
const cookie = new tough.Cookie({
	key: "SSESS8c0f16dd6e4ff53e267519930069d1e3",
	//value: "n0WkWL01lD-WpWOSXtYM5kkNP8yee-3T-roRBO5K4QE",
	value: "C4iFoia_DH9PDEA5EAaW9cI1css1MjTKuQgFCY4ruAk",
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
let latestVideoDate = null;
var videoNodeList = [];
var videoNodeListRaussain = [];

async function getLatestVideoDate() {
	let options = {
		method: "GET",
		uri: "http://localhost:3000/api/video/getlatestvideodate/",
		//body: batchArray,
		//json: true,
		//pool: httpAgent,
		timeout: 600000,
		headers: {
			"User-Agent": "Request-Promise"
		}
	};
	let response = await rp(options)
		.then(date => {
			return date;
		})
		.catch(err => {
			console.log("errr", err);
		});
	return response;
}

async function getVideoNodeList() {
	latestVideoDate = JSON.parse(await getLatestVideoDate());
	console.log("latestVideoDate>>>", latestVideoDate);
	console.log(
		"from database>>>",
		timeConverter(latestVideoDate.published_date).getTime()
	);
	console.log(
		"from database>>>",
		Date.parse(latestVideoDate.created_date_time)
	);
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
			console.log(
				"getVideoNodeList() function is successfully executed",
				videoNodeList.length,
				"data received"
			);
			videoNodeList = videoNodeList.filter(function(object) {
				return (
					timeConverter(object.created).getTime() >
					Date.parse(latestVideoDate.published_date)
				);
			});
			if (videoNodeList && videoNodeList.length > 0) {
				console.log("after filtering length>>>>", videoNodeList.length);
				getVideoNodeListRaussain();
			} else {
				console.log("After Filteration list recieved>>>>", videoNodeList);
			}

			//getVideoNodeListRaussain();
		})
		.catch(function(err) {
			console.log("Error inside getVideoNodeList() function ====>>>>", err);
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
			console.log(
				"getVideoNodeListRaussain() function is successfully executed",
				videoNodeListRaussain.length,
				"data received"
			);

			videoNodeListRaussain = videoNodeListRaussain.filter(function(object) {
				return (
					timeConverter(object.created).getTime() >
					Date.parse(latestVideoDate.published_date)
				);
			});
			if (videoNodeListRaussain && videoNodeListRaussain.length > 0) {
				console.log("after filtering length>>>>", videoNodeListRaussain.length);
				getVideoDatainBatches();
			} else {
				console.log(
					"After Filteration list recieved>>>>",
					videoNodeListRaussain
				);
			}
		})
		.catch(function(err) {
			console.log(
				"Error inside getVideoNodeListRaussain() function ====>>>>",
				err
			);
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
								uri: "http://localhost:3000/api/video/create/",
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
						uri: "http://localhost:3000/api/video/create/",
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

getVideoNodeList();
