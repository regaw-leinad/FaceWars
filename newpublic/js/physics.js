function applyGravity(entity, dt) {
	var x_d = Board.centerX - entity.m.x;
	var y_d = Board.centerY - entity.m.y;
	var x_sqr = x_d*x_d;
	var y_sqr = y_d*y_d;
 
	var dist = Math.sqrt(x_sqr + y_sqr);
 
	var pull = 0.02 / dist;
	//(x_d*x_d + y_d*y_d);
 
	//if it has already rotated, make sure to premove
	//this.preMove(delta);
 
	entity.dx += (
		//x_sqr*pull
		x_d*pull
	);
 
    entity.dy += (
    	//y_sqr*pull
    	y_d*pull
    );
 
    var speed = Math.sqrt(
        entity.dx * entity.dx + 
        entity.dy * entity.dy
    );

    if (speed > 0.3) {
    	entity.dx *= 0.85;
    	entity.dy *= 0.85;
    }
	
    entity.m.x += entity.dx * dt;
    entity.m.y += entity.dy * dt;
}

function checkCollisions() {
    Object.keys(ownProjectilesById).forEach(function (projId) {
        var p = ownProjectilesById[projId];

        Object.keys(entitiesByID).forEach(function(entityId) {
            var entity = entitiesByID[entityId];
            if (entity.m.id !== p.m.id && entity.m.userName !== p.m.userName) {
                // check collision here
                if (isInsideCircle(p.m.x, p.m.y, entity.m.x, entity.m.y, 12.5)) {
                    delete ownProjectilesById[projId];
                    delete entitiesByID[projId];
                    console.log('emitting ENTITY_DIE for projectile');
                    socket.emit(Packet.ENTITY_DIE, { entity: entity.m });
                    kills++;
                }
            }
        });
    });

    var c = ownShipEntity;
    if (isInsideCircle(c.m.x, c.m.y, Board.centerX, Board.centerY, 30)) {
        console.log('emitting ENTITY_DIE for player ship');
        socket.emit(Packet.ENTITY_DIE, { entity: c.m });
    }
}

function isInsideCircle(x, y, cx, cy, rad) {
    return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) < Math.pow(rad, 2);
}
