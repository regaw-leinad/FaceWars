function Entity(type, ID) {

	this.GRAVITY = 100;

	this.visible = true; 
	this.dead = false;

	this.x = 700;
	this.y = 180	;
	this.shipRotation = 0;

	this.type = type;
	this.ID = ID;
	this.velocity = {
		dx:  0,
		dy:  0,
		rotation: 0
	};

	this.collidesWith = [];
	this.preMove = null;

	// global variables that need to be sent out
	this.gameWidth = window.innerWidth;
	this.gameHeight = window.innerHeight;
	this.centerX = this.gameWidth / 2;
	this.centerY = this.gameHeight / 2; 	

	this.el = {};
	this.el.point = document.createElement('div');
	this.el.point.setAttribute('class', 'point');
	this.el.ship = document.createElement('div');
	this.el.ship.setAttribute('class', 'ship');

	this.el.point.appendChild(this.el.ship);
	document.body.appendChild(this.el.point);
	this.draw();

}

// on every frame do this run function
Entity.prototype.run = function(delta) {

	// moves all entity coordinates based on time difference
	this.move(delta);

//find all people to collide with
	//this.findCollide();?
//check all collisions
	//this.checkCollisions();

	// draws all elements out after collision detection and calculating 
	this.draw();

};

// takes the time difference and updates position/velocity
Entity.prototype.move = function(delta) {
	if (!this.visible) return;

	var x_d = this.centerX - this.x;
	var y_d = this.centerY - this.y;
	var x_sqr = x_d*x_d;
	var y_sqr = y_d*y_d;

	var dist = Math.sqrt(x_sqr + y_sqr);

	if(x_d < 0) {x_sqr = -x_sqr;}
	if(y_d < 0) {y_sqr = -y_sqr;}

	var pull = this.GRAVITY / dist;
	//(x_d*x_d + y_d*y_d);

	//if it has already rotated, make sure to premove
	//this.preMove(delta);

	this.velocity.dx += (
		//x_sqr*pull
		x_d * pull
	);
    this.velocity.dy += (
    	//y_sqr*pull
    	y_d * pull
    );
    this.x += this.velocity.dx * delta;
    this.y += this.velocity.dy * delta;
    this.shipRotation += this.velocity.rotation * delta;
    if (this.shipRotation > 360) {
      this.shipRotation -= 360;
    } else if (this.shipRotation < 0) {
      this.shipRotation += 360;
    }
};

Entity.prototype.checkCollision = function(other) {
	if (!other.visible || this == other || this.collidesWith.indexOf(other.type)) {
		return;
	}
};

Entity.prototype.checkCollisionAgainst = function (candidates) {
	for (var i = 0; i < candidates.length; i++) {
		var curr = candidates[i];
		do {
			this.checkCollision(curr);
		} while(curr)
	}
};

Entity.prototype.collision = function() {};

// to update in a bit
Entity.prototype.draw = function() {
	this.el.point.style.left = this.x + 'px';
	this.el.point.style.top = this.y + 'px';
};

// After collision calls this to remove entity from DOM element
Entity.prototype.kill = function () {
	this.visible = false;
	this.dead = true;
	if(ID) {
		this.ID.leave(this);
		this.ID = null;
	}
};



