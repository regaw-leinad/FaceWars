var http = require('http');
var url = require('url');
var fs = require('fs');

var mime = require('./mime');

function FileServer(port) {
    var server = http.createServer(function(req, res) {
        var parsedUrl = url.parse(req.url);
        // default to index if root request
        if (parsedUrl.pathname === '/') {
            parsedUrl.pathname = '/index.html';
        }
        var filename = './newpublic' + parsedUrl.pathname;
        fs.exists(filename, function (exists) {
            if (exists) {
                res.writeHeader(200, {
                    'Content-Type': mime.lookup(filename),
                    'Cache-Control': 'public; max-age=31536000'
                });
                fs.createReadStream(filename).pipe(res);
            } else {
                res.writeHeader(404, {
                    'Content-Type': 'text/html'
                });
                res.end('File not found');
            }
        });
    });

    console.log('About to open port for file server');
    return server.listen(port || 1234);
}

module.exports = FileServer;
