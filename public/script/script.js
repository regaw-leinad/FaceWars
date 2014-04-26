$(document).ready(function() {
    var socket = io.connect('http://localhost:1234');
    socket.on('connect', function(data) {
        alert('hi');
    });

    $nameForm = $('#nameForm');
    $nameText = $('#nameText');
    $nameForm.on('submit', function (e) {
    	e.preventDefault();
    	socket.emit(0, {
    		userName: $nameText.val()
    	});
    	$nameText.val('');
    });

});
