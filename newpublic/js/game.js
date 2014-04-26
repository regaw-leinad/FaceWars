
	$(window).bind('beforeunload', function(eventObject) {
	    socket.emit(Packet.USER_DISCONNECTING, { user: currentUser });
	});

	var EntityType = {
		SHIP: 0,
		PROJECTILE: 1
	};

	var entitiesByID = {};
	var ownProjectilesById = {};
	var ownShipEntity;
	var ammoAmt = 5;

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

	// handle frame
	function onFrame(time) {
		
		var dt = time - onFrame.oldTime;
		onFrame.oldTime = time;

		// handle user keyboard input
		handleInput(8);

		// update ship
		if (ownShipEntity) {
			applyGravity(ownShipEntity, dt);
			if(ownShipEntity.speed > 0.3) {
				ownShipEntity.speed = 0.3;
			}
			socket.emit(
				Packet.UPDATE_ENTITY, 
				{ entity: ownShipEntity.getModel() }
			);
		}

		// update projectiles
		Object.keys(ownProjectilesById).forEach(function (id) {
			var projectile = ownProjectilesById[id];
			applyGravity(projectile, dt);
			socket.emit(
				Packet.UPDATE_ENTITY, 
				{ entity: projectile.getModel() }
			);
		});

		// update keyboard handler
		Keys.update();
	}

	function handleInput(dt) {
		if (!ownShipEntity) return;
		dt = dt || 1;
		var ship = ownShipEntity;
		var speed = 0.3 * dt * 0.05;
		var rotation = 5;

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
			var bullet = new Projectile(Projectile.createNewDataFromUser(currentUser, 
				ownShipEntity.m, ownShipEntity.dx, ownShipEntity.dy));
			entitiesByID[bullet.m.id] = bullet;
			ownProjectilesById[bullet.m.id] = bullet;
		}

	}
