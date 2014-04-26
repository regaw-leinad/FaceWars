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

// $('#submit').click(function(){
// 	socket.emit(Packet.USER_AUTH_NEW, {
// 		userName: $('#username').val(),
// 		color: $('#color').val()
// 	}); 
// })

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


// // shape movement logic
// var framerate = 30;
// var timeInterval = Math.round(1000 / framerate);
// var atimer = setInterval(animateFollower, timeInterval);
// var mouseX = 0;
// var mouseY = 0;
// var follower = $('#follower');
// var rotation = 0;

// document.onkeydown = checkKey;

// $(document).mousemove(function(e) {
// 	mouseX = e.pageX;
// 	mouseY = e.pageY;
// });

// function animateFollower() {

// 	follower.css('left', mouseX);
// 	follower.css('top', mouseY);
// }

// function checkKey(e) {

// 	e = e || window.event;

// 	if (rotation >= 360) {
// 		rotation = Math.abs(rotation % 360); 
// 	} else if (rotation <= 0) {
// 		rotation += 360;
// 	}

// 	if (e.keyCode == '37') {
// 		rotation -= 5;
// 		follower[0].style.webkitTransform = 'rotate(' + rotation + 'deg)';
// 	} else if (e.keyCode == '39') {
// 		rotation += 5;
// 		follower[0].style.webkitTransform = 'rotate(' + rotation + 'deg)';
// 	} else if (e.keyCode == '38') {
//     	// up arrow
//     } else if (e.keyCode == '40') {
//     	// down arrow
//     }
// }

