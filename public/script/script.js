var Packet = {
    USER_AUTH_NEW: 0,
    USER_AUTH_RESPONSE: 1,
    USER_JOIN_SESSION: 2,
    USER_LEAVE_SESSION: 3,
    USER_DISCONNECTING: 4,
    UPDATE_ENTITY: 5
};

var currentUser;
var socket;

$(document).ready(function() {
    socket = io.connect('http://localhost:1234');

    socket.on(Packet.USER_AUTH_RESPONSE, function(data) {
        if (data.err) {
            console.log(data.err);
            return;
        }

        currentUser = data.user;
        console.log('authed');
    });

    $nameForm = $('#nameForm');
    $nameText = $('#nameText');
    $nameForm.on('submit', function (e) {
    	e.preventDefault();
    	socket.emit(Packet.USER_AUTH_NEW, {
    		userName: $nameText.val()
    	});
    	$nameText.val('');
    });
});

$(window).bind('beforeunload', function(eventObject) {
    socket.emit(Packet.USER_DISCONNECTING, { user: currentUser });
    //clearStoredData();
});
