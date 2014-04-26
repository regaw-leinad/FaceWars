function applyGravity(entity, dt) {
	var x_d = Board.centerX - entity.m.x;
	var y_d = Board.centerY - entity.m.y;
	var x_sqr = x_d*x_d;
	var y_sqr = y_d*y_d;
 
	var dist = Math.sqrt(x_sqr + y_sqr);
 
	var pull = 0.001 / dist;
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
 
    var speed = Math.sqrt(entity.dx*entity.dx + entity.dy*entity.dy);
    if(speed > 0.3) {
    	entity.dx *= 0.85;
    	entity.dy *= 0.85;
    }
	
    entity.m.x += entity.dx * dt;
    entity.m.y += entity.dy * dt;
 
    if(entity.m.x === Board.centerX &&
    	entity.m.y === Board.centerY) {
    	// TODO
    }
 
 
}