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
        console.log('Received USER_AUTH_NEW Packet');
        console.log(data);

        if (users.getUserIdBySocketId(client.id)) {
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
                session.addUser(newUser, client);

                client.emit(Packet.USER_AUTH_RESPONSE, { user: newUser, session: session });
                client.broadcast.to(session.id).emit(Packet.USER_JOIN_SESSION, { user: newUser });
            }
        }
    });

    client.on(Packet.UPDATE_ENTITY, function(data) {
        //console.log('Received UPDATE_ENTITY Packet');
        //console.log(data);

        if (data.entity && data.entity.userName) {
            var user = users.getUserByUserName(data.entity.userName);

            var registeredUserId = users.getUserIdBySocketId(client.id);
            if (registeredUserId && registeredUserId === user.id) {
                var session = sessions.getSessionByUser(user);
                socket.sockets.in(session.id).emit(Packet.UPDATE_ENTITY, data);
            } else {
                // HACKER ALERT!
            }
        } else {
            // not a valid packet.. idoit
        }
    });

    client.on(Packet.ENTITY_DIE, function(data) {
        //console.log('Received ENTITY_DIE Packet');
        //console.log(data);

        if (data.entity && data.entity.userName) {
            var user = users.getUserByUserName(data.entity.userName);

            var registeredUserId = users.getUserIdBySocketId(client.id);
            if (registeredUserId && registeredUserId === user.id) {
                var session = sessions.getSessionByUser(user);
                socket.sockets.in(session.id).emit(Packet.ENTITY_DIE, data);
            } else {
                // HACKER ALERT!
            }
        } else {
            // not a valid packet.. idoit
        }
    });
    
    client.on(Packet.USER_DISCONNECTING, function(data) {
        console.log('Received USER_DISCONNECTING Packet');
        console.log(data);

        if (data.user) {
            var user = data.user;

            var registeredUserId = users.getUserIdBySocketId(client.id);
            if (registeredUserId && registeredUserId === user.id) {
                // remove from users and session
                users.removeUser(user);
                var session = sessions.getSessionByUser(user);
                session.removeUser(user, client);
                // Remove empty game sessions
                if (session.getUserCount() === 0) {
                    sessions.removeSession(session);
                }
                socket.sockets.in(session.id).emit(Packet.USER_LEAVE_SESSION, { user: user });
            } 
            // else ignore disconnect
        }
    });

    client.on(Packet.CHAT_MESSAGE, function(data) {
        console.log('Received CHAT_MESSAGE Packet');
        console.log(data);

        var registeredUserId = users.getUserIdBySocketId(client.id);
        if (registeredUserId && registeredUserId === data.user.id) {
            var session = sessions.getSessionByUser(user);
            socket.sockets.in(session.id).emit(Packet.CHAT_MESSAGE, data);
        }
    })
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
    if (data.toString().trim() !== '') {
        var args = data.toString().split(' ');
        var cmd = args.splice(0, 1).toString().trim();
        if (args.length > 0) {
            args[args.length - 1] = args[args.length - 1].trim();
        }
        onCommand(cmd, args);   
    }
});

function onCommand(cmd, args) {
    if (cmd === 'stop') {
        console.log('shutting down server...');
        process.exit(1);
    } else if (cmd === 'dump') {
        if (args.length === 1) {
            if (args[0] === 'sessions') {
                var sessionDump = sessions.getSessions();
                if (Object.keys(sessionDump).length === 0) {
                    console.log('No active game sessions');
                } else {
                    console.log(sessionDump);
                }
            } else if (args[0] === 'users') {
                var userDump = users.getUsers();
                if (Object.keys(userDump).length === 0) {
                    console.log('No users connected');
                } else {
                    console.log(userDump);
                }
            }
        }
    }
}
