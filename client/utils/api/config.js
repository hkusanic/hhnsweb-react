let serverAddress = window.location.protocol + '//' + window.location.hostname;

if (window.location.hostname === 'localhost') {
	serverAddress = serverAddress + ':' + window.location.port;
}

// const serverAddress = 'http://dev.niranjanaswami.net';

export default serverAddress;
