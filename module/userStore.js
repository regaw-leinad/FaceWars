
function UserStore() {
    this.users = {};
    this.userSockets = {};
}

UserStore.prototype.addUser = function(user) {
    this.users[user.name] = user;
    this.userSockets[user.socketId] = user.id;
};

UserStore.prototype.removeUser = function(user) {
    delete this.users[user.name];
    delete this.userSockets[user.socketId];
};

UserStore.prototype.getUserByUserName = function(userName) {
    return this.users[userName.toLowerCase()];
};

UserStore.prototype.getUserIdBySocketId = function(socketId) {
    return this.userSockets[socketId];
};

UserStore.prototype.hasUser = function(userName) {
    return this.users.hasOwnProperty(userName.toLowerCase());
};

module.exports = UserStore;
