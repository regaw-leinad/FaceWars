
function Session() {
    this.id = (new Date()).getTime();
    this.users = {};
}

Session.prototype.getId = function() {
    return this.id;
};

Session.prototype.addUser = function(user) {
    this.users[user.id] = user;
};

Session.prototype.removeUser = function(user) {
    delete this.users[user.id];
};

Session.prototype.hasUser = function(user) {
    return this.users.hasOwnProperty(user.id);
};
