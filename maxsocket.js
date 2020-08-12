const Max = require("max-api");
const io = require('socket.io-client');

const localhostIP = 'http://localhost:8000';
var serverIP = '';


var socket;

Max.post('script start');

if (serverIP != '') connectServer();
else Max.post('what is your server hostname?');

Max.addHandler('local', () => {
	connectLocal();
});

Max.addHandler('server', (ip) => {
	serverIP = ip;
	connectServer();
});

function connectLocal() {
	Max.post('connect to local server');
	if (socket) socket.disconnect();
	socket = io(localhostIP);
	addSocketListener();
}


function connectServer() {
	Max.post('connect to server');
	if (socket) socket.disconnect();
	socket = io(serverIP);
	addSocketListener();
}

function addSocketListener() {
	socket.on('connect', (data) => {
		Max.post('connected!');

		//receiver: 
	    socket.on('debug', (message) => {
			Max.post(message)
		});

		socket.on('osc', (message) => {
			if (message.address && message.args) {
				Max.post(message.address + " " + message.args[0].value)
				Max.outlet(message.address + " " + message.args[0].value)
			} else {
				Max.post(message);
				Max.outlet(message);
			}
			
			
		});

	})
}

