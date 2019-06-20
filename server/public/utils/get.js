/*get node list
get each node data from new api
get lecture details from old api
make data object combining tnid from old api with data
push to db*/

var rp = require('request-promise');
var tough = require('tough-cookie');
var fs = require('fs');
var https = require('https');
var httpAgent = new https.Agent();
httpAgent.maxSockets = 30;
const readline = require('readline');
var fs = require("fs");
var russianSummaryDataList = [];
var summaryFinalData = [];
let errorList = [];

function timeConverter(timestamp) {
    let date = new Date(timestamp * 1000);
    return date;
}
const cookie = new tough.Cookie({
    key: 'SSESS8c0f16dd6e4ff53e267519930069d1e3',
    value: 'mGCQ4zhYa9K0Dex2-xTn4Eh5c3Ej_4NnuEKuhxPcPb0',
    domain: 'nrs.niranjanaswami.net',
    httpOnly: false,
    maxAge: 3153600000000,
});
var cookiejar = rp.jar();
cookiejar._jar.rejectPublicSuffixes = false;
cookiejar.setCookie(cookie.toString(), 'https://nrs.niranjanaswami.net');

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

getRuSummaryNodeList();
