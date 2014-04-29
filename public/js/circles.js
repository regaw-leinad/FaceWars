// circle resize logic
var main = $('#layer0');

function load() {
	randomColors()
	resize()

	main.css('margin-top', window.innerHeight / 6 + 'px');
	main.fadeIn()
}

function resize() {
	var porthole = document.getElementById('porthole');
	var circle = document.getElementById('circle');
	var star = document.getElementById('star');

	porthole.setAttribute('height', window.innerHeight);
	porthole.setAttribute('width', window.innerWidth);

	var xcenter = window.innerWidth / 2;
	var ycenter = window.innerHeight / 2;

	var smaller = (window.innerHeight < window.innerWidth) ? window.innerHeight : window.innerWidth;

	//circle.setAttribute('cx', xcenter);
	//circle.setAttribute('cy', ycenter);

	centerCircle(circle, xcenter, ycenter)
	centerCircle(star, xcenter, ycenter)

	//circle.setAttribute('r', smaller / 2 + 500);
	//star.setAttribute('r', smaller / 25);
	//circle.setAttribute('cx', xcenter);
	//circle.setAttribute('cy', ycenter);
	//circle.setAttribute('r', smaller / 2 + 500);
}

function centerCircle(circle, xcenter, ycenter) {
	circle.setAttribute('cx', xcenter);
	circle.setAttribute('cy', ycenter);
}

$(document).ready(function() {
	setTimeout(function() {
		var input = document.getElementById('username');
		console.log(input);
		input.focus();
	}, 1000);
});

$('input[type=text]').on('keyup', function(e) {
    if (e.which == 13) {
        e.preventDefault();
		socket.emit(Packet.USER_AUTH_NEW, {
			userName: $('#username').val(),
			color: $('#color').css('background-color')
		}); 
    }
});

function fadeGameIn() {
	$('#layer0').fadeOut()
//	$('#layer1').fadeIn()
	$('#gameboard').fadeIn()
}

function randomColors() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);
	$('.preview').attr('style', 'background-color: rgb('+ r + ','+ g + ','+ b + ');');
}

function raiseUsernameError(err) {
	var username = document.getElementById('username')
	  , inputGrp = document.getElementById('inputs');
	
	username.value = '';
	inputGrp.classList.add("has-error");
	username.setAttribute('placeholder', err);
	username.onclick = function(){
		inputGrp.classList.remove("has-error");
		username.setAttribute('placeholder', '');
	};
	username.onkeydown = function(){
		inputGrp.classList.remove("has-error");
		username.setAttribute('placeholder', '');
	};
}

function clearUsername() {
	inputGrp.classList.remove("has-error");
	username.setAttribute('placeholder', '');
}
