function applyGravity(cx, cy, amount, entity) {
    var distX = cx - entity.m.x;
    var distY = cy - entity.m.y;
    var rad = Math.atan2(distY, distX);
    var distMag = Math.sqrt(distX * distX + distY * distY);
    var pull = amount / distMag;

    var newDx = entity.dx + pull * Math.cos(rad);
    var newDy = entity.dy + pull * Math.sin(rad);

    entity.dx = newDx;
    entity.dy = newDy;

    entity.m.x += newDx;
    entity.m.y += newDy;
}

function checkCollisions() {
    
    Object.keys(ownProjectilesById).forEach(function (projId) {
        var p = ownProjectilesById[projId];

        if (isInsideCircle(p.m.x, p.m.y, Board.centerX, Board.centerY, 30)) {
            delete ownProjectilesById[projId];
            console.log('emitting ENTITY_DIE for projectile');
            socket.emit(Packet.ENTITY_DIE, { entity: p.m });
        } else if (p.m.x < 0 || p.m.x > Board.width || p.m.y < 0 || p.m.y > Board.height) {
            delete ownProjectilesById[projId];
            console.log('emitting ENTITY_DIE for projectile');
            socket.emit(Packet.ENTITY_DIE, { entity: p.m });
        } else {
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
                        setKillBox(kills);
                    }
                }
            });
        }
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
