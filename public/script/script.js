$(document).ready(function() {
    var socket = io.connect('http://localhost:1234');

    socket.on(1, function(data) {
        console.log(data);
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
