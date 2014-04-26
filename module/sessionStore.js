
function SessionStore() {
    this.sessions = {};
}

SessionStore.prototype.addSession = function(session) {
    this.sessions[session.id] = session;
    console.log('added game session with id: ' + session.id);
};

SessionStore.prototype.removeSession = function(session) {
    delete this.sessions[session.id];
    console.log('removed game session with id: ' + session.id);
};

SessionStore.prototype.getSessionByUser = function(user) {
    for (var key in this.sessions) {
        var session = this.sessions[key];
        if (session.getUsers().hasOwnProperty(user.id)) {
            return session;
        }
    }

    return false;
};

SessionStore.prototype.getNextOpenSession = function() {
    for (var key in this.sessions) {
        var session = this.sessions[key];
        if (session.canUserJoin) {
            return session;
        }
    }

    // Should never happen?!
    return false;
};

module.exports = SessionStore;
