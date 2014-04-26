var crypto = require('crypto');

function User(name, color, socketId) {
    this.displayName = name;
    this.name = name.toLowerCase();
    this.color = color;
    this.id = crypto.createHash('md5').update(this.name).digest('hex');
    this.socketId = socketId;
}

User.prototype.getDisplayName = function() {
    return this.name;
};

User.prototype.getSocketId = function() {
    return this.socketId;
};

User.prototype.getColor = function() {
    return this.color;
};

User.prototype.setDisplayName = function(name) {
    this.displayName = name;
    this.name = name.toLowerCase();
};

User.prototype.getName = function() {
    return this.name;
};

User.prototype.getId = function() {
    return this.id;
};

module.exports = User;
