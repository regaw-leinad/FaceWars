var salt = require('./salt');

function Session(maxUsers) {
    this.maxUsers = maxUsers || 5;
    this.id = (new Date()).getTime() + '-' + salt();
    this.users = {};
    this.userCount = 0;
    console.log('Creating new session with id: ' + this.id + ', max users: ' + this.maxUsers);
}

Session.prototype.addUser = function(user, socket) {
    this.users[user.id] = user;
    this.userCount++;
    socket.join(this.id);
    console.log('Adding user ' + user.displayName + ' to session ' + this.id);
};

Session.prototype.removeUser = function(user, socket) {
    delete this.users[user.id];
    this.userCount--;
    socket.leave(this.id);
    console.log('Removing user ' + user.displayName + ' from session ' + this.id);
};

Session.prototype.hasUser = function(user) {
    return this.users.hasOwnProperty(user.id);
};

Session.prototype.getMaxUsers = function() {
    return this.maxUsers;
}

Session.prototype.getUserCount = function() {
    return this.userCount;
}

Session.prototype.canUserJoin = function() {
    return this.userCount < this.maxUsers;
};

module.exports = Session;
