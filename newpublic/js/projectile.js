function Projectile(data) {
	
	this.m = {};
	this.m.id = data.id;
	this.m.color = data.color;
	this.m.userName = data.userName;
	this.m.x = data.x;
	this.m.y = data.y;
	this.m.type = data.type;

	this.dx = 0;
	this.dy = 0;
	
	this.el = {};
	this.el.point = document.createElement('div');
	this.el.point.setAttribute('id', this.m.id);
	this.el.point.setAttribute('class', 'point');
	this.el.Projectile = document.createElement('div');
	this.el.Projectile.setAttribute('class', 'projectile');
	this.el.Projectile.style.backgroundColor = this.m.color;
	
	this.el.point.appendChild(this.el.Projectile);
	document.body.appendChild(this.el.point);

	this.draw();

}

Projectile.createNewDataFromUser = function (user) {
	var data = {};
	data.id = (new Date()).getTime() + '-' + salt();
	data.color = user.color;
	data.userName = user.name;
	data.x = 10;
	data.y = 10;
	data.type = EntityType.PROJECTILE;
	return data;
};

Projectile.prototype.draw = function () {
	this.el.point.style.left = this.m.x + 'px';
	this.el.point.style.top = this.m.y + 'px';
};

Projectile.prototype.update = function (model) {
	this.m = model;
	this.draw();
};

Projectile.prototype.removeFromDOM = function () {
	this.el.point.parentNode.removeChild(this.el.point);
};

Projectile.prototype.getModel = function () {
	return this.m;
};

Projectile.prototype.getType = function () {
	return this.m.type;
};

Projectile.prototype.getId = function () {
	return this.m.id;
};

Projectile.prototype.moveX = function(dx) {
	this.m.x += dx;
};

Projectile.prototype.moveY = function(dy) {
	this.m.y += dy;
};

Projectile.prototype.setColor = function(color) {
	this.m.color = color;
};