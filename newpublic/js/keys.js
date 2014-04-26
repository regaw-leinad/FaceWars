var Keys = (function () {
	// state maps { keyCode: boolean }
	var keyIsDown = {};
	var keyIsPressed = {};
	var keyPressLimbo = {};
	// handle key down
	window.addEventListener('keydown', function (e) {
		var key = e.keyCode || e.which;
		keyIsDown[key] = true;
		if (!keyPressLimbo[key]) {
			keyIsPressed[key] = true;
			keyPressLimbo[key] = true;
		}
	});
	// handle key up
	window.addEventListener('keyup', function (e) {
		var key = e.keyCode || e.which;
		switch (key) {
			case 32:
			case 37:
			case 38:
			case 39:
			case 40:
				e.preventDefault();
		}
		if (keyIsDown[key]) {
			delete keyIsDown[key];
		}
		if (keyPressLimbo[key]) {
			delete keyPressLimbo[key];
		}
	});
	// public interface
	return {
		// update on frame
		update: function () {
			// reset presses
			keyIsPressed = {};
		},
		// state check methods
		isDown: function (keyCode) {
			return keyIsDown[keyCode];
		},
		isPressed: function (keyCode) {
			if (keyIsPressed[keyCode]) {
				delete keyIsPressed[keyCode];
				return true;
			} else {
				return false;
			}
		},
		// keycodes
		SPACEBAR: 32,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	};
})();