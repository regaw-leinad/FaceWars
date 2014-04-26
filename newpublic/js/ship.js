function Ship(data) {
	
	this.m = {};
	this.m.id = data.id;
	this.m.color = data.color;
	this.m.userName = data.userName;
	this.m.x = data.x;
	this.m.y = data.y;
	this.m.type = data.type;
	this.m.shipRotation = data.shipRotation;
	this.m.moveRotation = data.moveRotation;

	this.dx = 0;
	this.dy = 0;
	
	this.el = {};
	this.el.point = document.createElement('div');
	this.el.point.setAttribute('id', this.m.id);
	this.el.point.setAttribute('class', 'point');
	this.el.ship = document.createElement('div');
	this.el.ship.setAttribute('class', 'ship');
	this.el.ship.style.backgroundColor = this.m.color;
	
	this.el.point.appendChild(this.el.ship);
	Board.$el.append(this.el.point);

	this.draw();

}

Ship.createNewDataFromUser = function (user) {
	var data = {};
	data.id = (new Date()).getTime() + '-' + salt();
	data.color = user.color;
	data.userName = user.name;
	data.x = 10;
	data.y = 10;
	data.type = EntityType.SHIP;
	data.shipRotation = 70;
	data.moveRotation = 70;
	return data;
};

Ship.prototype.draw = function () {
	this.el.point.style.left = this.m.x + 'px';
	this.el.point.style.top = this.m.y + 'px';
};

Ship.prototype.update = function (model) {
	this.m = model;
	this.draw();
};

Ship.prototype.removeFromDOM = function () {
	this.el.point.parentNode.removeChild(this.el.point);
};

Ship.prototype.getModel = function () {
	return this.m;
};

Ship.prototype.getType = function () {
	return this.m.type;
};

Ship.prototype.getId = function () {
	return this.m.id;
};

Ship.prototype.thrust = function(amount) {
	var rad = this.shipRotation * Math.PI / 180;
	this.dx += amount * Math.cos(rad);
	this.dy += amount * Math.sin(rad);
};

Ship.prototype.rotateCCW = function(deg) {
	this.m.shipRotation += deg;
};

Ship.prototype.rotateCW = function(deg) {
	this.m.shipRotation -= deg;
};

Ship.prototype.setColor = function(color) {
	this.m.color = color;
};