// Begin game server
var io = require('socket.io');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

// own modules
var Packet = require('./module/packet');
var FileServer = require('./module/fileServer');
var UserStore = require('./module/userStore');
var User = require('./module/user');
var SessionStore = require('./module/sessionStore');
var Session = require('./module/session');

var fileServer = new FileServer(1234);
var users = new UserStore();
var sessions = new SessionStore();

var mainSession = new Session();
sessions.addSession(mainSession);

var socket = io.listen(fileServer, { 'log level': 1 });

socket.on('connection', function(client) {
    console.log(client.id + ' has connected');

    client.on(Packet.USER_AUTH_NEW, function(data) {
        console.log('Received USER_AUTH_NEW Packet:');
        console.log(data);

        if (users.getUserBySocketId(client.id)) {
            console.log('Unauthorized request');
            client.emit(Packet.USER_AUTH_RESPONSE, { err: 'Unauthorized request', errCode: 5 });
        } else {
            if (!data.userName || data.userName.trim().length === 0 || !data.userName.match(/^[a-z0-9]+$/i)) {
                console.log('Invalid username');
                client.emit(Packet.USER_AUTH_RESPONSE, { err: 'Invalid username', errCode: 1 }); 
            } else if (users.hasUser(data.userName)) {
                console.log('Username already taken');
                client.emit(Packet.USER_AUTH_RESPONSE, { err: 'Username already taken', errCode: 2 });
            } else {
                var newUser = new User(data.userName, data.color || 'fff', client.id);
                users.addUser(newUser);
                var session = sessions.getNextOpenSession();
                client.emit(Packet.USER_AUTH_RESPONSE, { session: mainSession })
            }
        }
    });
});