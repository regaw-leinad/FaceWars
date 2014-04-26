// own modules
var packet = require('./module/packet');
var FileServer = require('./module/fileServer');
var fileServer = new FileServer(1234);

// Begin game server
var io = require('socket.io');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

var UserStore = require('./module/userStore');
var SessionStore = require('./module/sessionStore');

var users = new UserStore();
var sessions = new SessionStore();

var socket = io.listen(fileServer, { 'log level': 1 });

socket.on('connection', function(client) {
    console.log(client.id + ' has connected');

});