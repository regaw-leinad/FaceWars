
function SessionStore() {
    this.sessions = {};
    this.sessionNames = [];
}

SessionStore.prototype.addSession = function(session) {
    this.sessions[room.id] = room;
    this.sessionNames.push(room.displayName);
};

SessionStore.prototype.removeSession = function(session) {
    delete this.sessions[room.id];

    var index = this.sessionNames.indexOf(session.displayName);
    if (index > -1) {
        this.sessionNames.splice(index, 1);
    }
};

SessionStore.prototype.getSessionByName = function(sessionName) {
    sessionName = sessionName.toLowerCase();

    for (var key in this.sessions) {
        var session = this.sessions[key];
        if (session.name === sessionName.toLowerCase()) {
            return room;
        }
    }

    return false;
};

SessionStore.prototype.getSessionByUser = function(user) {
    for (var key in this.sessions) {
        var room = this.sessions[key];
        if (room.getUsers().hasOwnProperty(user.id)) {
            return room;
        }
    }

    return false;
};

module.exports = SessionStore;
