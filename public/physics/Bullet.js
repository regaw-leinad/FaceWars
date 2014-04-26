function Bullet () {
	this.init("bullet", ID);
	this.time = 0;

};

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet; 

Bullet.prototype.draw = function() {
	if(this.visible) {
		// update x and y
	}
};

Bullet.prototype.preMove = function(delta) {
	if(this.visible) {
		this.time += delta
	}
	if (this.time > 35) {
		this.visible = false;
		this.time = 0;
	}
};

Bullet.prototype.collision = function (other) {
	this.time = 0;
	this.visible = false;
};

