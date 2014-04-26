function Projectile(data) {
	
	this.m = {};
	this.m.id = data.id;
	this.m.color = data.color;
	this.m.userName = data.userName;
	this.m.x = data.x;
	this.m.y = data.y;
	this.m.type = data.type;

	this.dx = data.dx;
	this.dy = data.dy;
	
	this.el = {};
	this.el.point = document.createElement('div');
	this.el.point.setAttribute('id', this.m.id);
	this.el.point.setAttribute('class', 'point');
	this.el.projectile = document.createElement('div');
	this.el.projectile.setAttribute('class', 'projectile');
	this.el.projectile.style.backgroundColor = this.m.color;
	
	this.el.point.appendChild(this.el.projectile);
	Board.$el.append(this.el.point);

	this.draw();

	var self = this;
	setTimeout(function() {
		if(entitiesByID[self.m.id]) {
			self.removeFromDOM();
			delete entitiesByID[self.m.id];
			delete ownProjectilesById[self.m.id];
			socket.emit(
				Packet.ENTITY_DIE, 
				{ entity: self.m }
			);
		}
	}, 4000);

	return this;

}

Projectile.createNewDataFromUser = function (user, shipModel, dx, dy) {
	var data = {};
	data.id = (new Date()).getTime() + '-' + salt();
	data.color = user.color;
	data.userName = user.name;
	data.x = shipModel.x;
	data.y = shipModel.y;
	data.type = EntityType.PROJECTILE;
	var rad = shipModel.shipRotation * Math.PI / 180;
	data.dx = 50 * Math.cos(rad) + dx; 
	data.dy = 50 * Math.sin(rad) + dy;
	return data;
};

Projectile.prototype.draw = function () {
	this.el.point.style.left = this.m.x + 'px';
	this.el.point.style.top = this.m.y + 'px';
};

Projectile.prototype.update = function (model) {
	this.m = model;
	this.m.x += this.dx;
	this.m.y += this.dy;
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

Projectile.prototype.setColor = function(color) {
	this.m.color = color;
};