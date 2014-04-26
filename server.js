// own modules
var packet = require('./module/packet');
var FileServer = require('./module/fileServer');
var fileServer = new FileServer(1234);

// Begin game server
var io = require('socket.io');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

