$(document).ready(function() {
    var socket = io.connect('http://localhost:1234');
    socket.on('connect', function(data) {
        console.log('connected to server');
    });
});
