
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
	Board.width = window.innerWidth;
	Board.height = window.innerHeight;
	Board.centerX = Board.width / 2;
	Board.centerY = Board.height / 2;

	// handle frame
	function onFrame(time) {
		
		var dt = time - onFrame.oldTime;
		onFrame.oldTime = time;

		handleInput(dt);

		applyGravity(ownShipEntity, dt);

		if (ownShipEntity) {
			socket.emit(
				Packet.UPDATE_ENTITY, 
				{ entity: ownShipEntity.getModel() }
			);
		}

		Object.keys(ownProjectilesById).forEach(function (id) {
			socket.emit(
				Packet.UPDATE_ENTITY, 
				{ entity: ownProjectilesById[id].getModel() }
			);
		});

		Keys.update();
	}

	function handleInput(dt) {
		if (!ownShipEntity) return;
		dt = dt || 1;
		var ship = ownShipEntity;
		var speed = 0.3 * dt;
		var slowdown = 3 / 4;

		// up left
		if (Keys.isDown(Keys.UP) && Keys.isDown(Keys.LEFT)) {
			speed = speed * slowdown;
			ship.moveX(-speed);
			ship.moveY(-speed);
		}
		// up right
		else if (Keys.isDown(Keys.UP) && Keys.isDown(Keys.RIGHT)) {
			speed = speed * slowdown;
			ship.moveX(speed);
			ship.moveY(-speed);
		}
		// down left
		else if (Keys.isDown(Keys.DOWN) && Keys.isDown(Keys.LEFT)) {
			speed = speed * slowdown;
			ship.moveX(-speed);
			ship.moveY(speed);
		}
		// down right
		else if (Keys.isDown(Keys.DOWN) && Keys.isDown(Keys.RIGHT)) {
			speed = speed * slowdown;
			ship.moveX(speed);
			ship.moveY(speed);
		} 
		else {
			// left
			if (Keys.isDown(Keys.LEFT)) {
				ship.moveX(-speed);
			}
			// right
			if (Keys.isDown(Keys.RIGHT)) {
				ship.moveX(speed);
			}
			// up
			if (Keys.isDown(Keys.UP)) {
				ship.moveY(-speed);
			}
			// down
			if (Keys.isDown(Keys.DOWN)) {
				ship.moveY(speed);
			}
		}
	}