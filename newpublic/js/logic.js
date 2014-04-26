// circle resize logic
var main = $('#layer0');

function resize() {
	var porthole = document.getElementById('porthole');
	var circle = document.getElementById('circle');

	porthole.setAttribute('height', window.innerHeight);
	porthole.setAttribute('width', window.innerWidth);


	var xcenter = window.innerWidth / 2;
	var ycenter = window.innerHeight / 2;

	var smaller = (window.innerHeight < window.innerWidth) ? window.innerHeight : window.innerWidth;

	circle.setAttribute('cx', xcenter);
	circle.setAttribute('cy', ycenter);
	circle.setAttribute('r', smaller / 2 + 500);

	main.css('margin-top', window.innerHeight / 4 + 'px');
}

// shape movement logic
var framerate = 30;
var timeInterval = Math.round(1000 / framerate);
var atimer = setInterval(animateFollower, timeInterval);
var mouseX = 0;
var mouseY = 0;
var follower = $('#follower');
var rotation = 0;

document.onkeydown = checkKey;

$(document).mousemove(function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
});

function animateFollower() {

	follower.css('left', mouseX);
	follower.css('top', mouseY);
}

function checkKey(e) {

	e = e || window.event;

	if (rotation >= 360) {
		rotation = Math.abs(rotation % 360); 
	} else if (rotation <= 0) {
		rotation += 360;
	}

	if (e.keyCode == '37') {
		rotation -= 5;
		follower[0].style.webkitTransform = 'rotate(' + rotation + 'deg)';
	} else if (e.keyCode == '39') {
		rotation += 5;
		follower[0].style.webkitTransform = 'rotate(' + rotation + 'deg)';
	} else if (e.keyCode == '38') {
    	// up arrow
    } else if (e.keyCode == '40') {
    	// down arrow
    }
}

$('#submit').click(function(){
	$('#layer0').fadeOut()
	$('#layer1').fadeIn()
})