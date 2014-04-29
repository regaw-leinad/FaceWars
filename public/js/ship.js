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
	this.el.ship.style.borderColor = 'transparent transparent transparent ' + this.m.color;
	this.el.label = document.createElement('div');
	this.el.label.setAttribute('class', 'label');
	this.el.label.innerHTML = this.m.userName;
	this.el.label.style.color = this.m.color;
	
	this.el.point.appendChild(this.el.ship);
	this.el.point.appendChild(this.el.label);
	Board.$el.append(this.el.point);

	this.draw();
}

Ship.createNewDataFromUser = function (user) {
	var data = {};
	data.id = (new Date()).getTime() + '-' + salt();
	data.color = user.color;
	data.userName = user.name;
	switch (randomIntBetween(1, 4)) {
		case 1:
			data.x = 40;
			data.y = 40;
			break;
		case 2:
			data.x = Board.width - 40;
			data.y = 40;
			break;
		case 3:
			data.x = Board.width - 40;
			data.y = Board.height - 40;
			break;
		case 4:
			data.x = 40;
			data.y = Board.height - 40;
			break;
	}
	data.type = EntityType.SHIP;
	data.shipRotation = 70;
	data.moveRotation = 70;
	return data;
};

Ship.prototype.draw = function () {
	this.el.point.style.left = this.m.x + 'px';
	this.el.point.style.top = this.m.y + 'px';
	this.el.ship.style.webkitTransform = 'rotate('+this.m.shipRotation+'deg)';
    this.el.ship.style.mozTransform    = 'rotate('+this.m.shipRotation+'deg)';
    this.el.ship.style.msTransform     = 'rotate('+this.m.shipRotation+'deg)';
    this.el.ship.style.oTransform      = 'rotate('+this.m.shipRotation+'deg)';
    this.el.ship.style.transform       = 'rotate('+this.m.shipRotation+'deg)';
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
	var rad = this.m.shipRotation * Math.PI / 180;
	var newDx = this.dx + amount * Math.cos(rad);
	var newDy = this.dy + amount * Math.sin(rad);
	if (Math.sqrt(newDx * newDx + newDy * newDy) < 0.5) {
		this.dx = newDx;
		this.dy = newDy;
	}
};

Ship.prototype.rotateCCW = function(deg) {
	this.m.shipRotation -= deg;
};

Ship.prototype.rotateCW = function(deg) {
	this.m.shipRotation += deg;
};

Ship.prototype.setColor = function(color) {
	this.m.color = color;
};