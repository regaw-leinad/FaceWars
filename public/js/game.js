$(window).bind('beforeunload', function(eventObject) {
    socket.emit(Packet.USER_DISCONNECTING, { user: currentUser });
});

var EntityType = {
	SHIP: 0,
	PROJECTILE: 1
};

var pingManager = new PingManager();
var lastUpdateTime = (new Date()).getTime();

var entitiesByID = {};
var ownProjectilesById = {};
var ownShipEntity;
var ammoAmt = 10;
var lastShot = 0;
var kills = 0;

var currentUser = {
	id: undefined,
	name: undefined,
	color: undefined
};

var currentSession = {
	id: undefined,
	users: []
};

var Board = {};
Board.$el = $('#gameboard');
Board.width = window.innerWidth;
Board.height = window.innerHeight;
Board.centerX = Board.width / 2;
Board.centerY = Board.height / 2;
$(window).on('resize', function (e) {
	Board.width = window.innerWidth;
	Board.height = window.innerHeight;
	Board.centerX = Board.width / 2;
	Board.centerY = Board.height / 2;
});

var count = 0;

// handle frame
function onFrame() {
	if (count++ % 1000 == 0) {
		console.log(pingManager.getCalculatedPing());
	}

	// handle user keyboard input
	handleInput();

	// update ship
	if (ownShipEntity) {
		applyGravity(Board.centerX, Board.centerY, 0.02, ownShipEntity);
		socket.emit(
			Packet.UPDATE_ENTITY, 
			{ entity: ownShipEntity.getModel() }
		);
		lastUpdateTime = (new Date()).getTime();
	}

	// update projectiles
	Object.keys(ownProjectilesById).forEach(function (id) {
		var projectile = ownProjectilesById[id];
		applyGravity(Board.centerX, Board.centerY, 0.04, projectile);
		socket.emit(
			Packet.UPDATE_ENTITY, 
			{ entity: projectile.getModel() }
		);
	});

	checkCollisions();

	// update keyboard handler
	Keys.update();
}

function handleInput() {
	if (!ownShipEntity) return;
	var ship = ownShipEntity;
	var ping = pingManager.getCalculatedPing();
	var speed = 0.00009 * ping;
	var rotation = 0.15 * ping;

	// left
	if (Keys.isDown(Keys.LEFT)) {
		ship.rotateCCW(rotation);
	}

	// right
	if (Keys.isDown(Keys.RIGHT)) {
		ship.rotateCW(rotation);
	}

	// up
	if (Keys.isDown(Keys.UP)) {
		ship.thrust(speed);
	}

	// down
	if (Keys.isDown(Keys.DOWN)) {
		ship.thrust(-speed);
	}

	// space
	if (Keys.isPressed(Keys.SPACEBAR)) {
		if (ammoAmt > 0 && (new Date()).getTime() - lastShot > 3000) {
			ammoAmt--;
			lastShot = (new Date()).getTime();

			var bullet = new Projectile(
				Projectile.createNewDataFromUser(
					currentUser, 
					ownShipEntity.m, 
					ownShipEntity.dx, 
					ownShipEntity.dy
				)
			);
			entitiesByID[bullet.m.id] = bullet;
			ownProjectilesById[bullet.m.id] = bullet;
		}
	}
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
