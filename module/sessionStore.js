var Session = require('./session.js');

function SessionStore() {
    this.sessions = {};
}

SessionStore.prototype.addSession = function(session) {
    this.sessions[session.id] = session;
    console.log('Added game session with id: ' + session.id);
};

SessionStore.prototype.removeSession = function(session) {
    delete this.sessions[session.id];
    console.log('Removed game session with id: ' + session.id);
};

SessionStore.prototype.getSessionByUser = function(user) {
    for (var key in this.sessions) {
        var session = this.sessions[key];
        if (session.hasUser(user)) {
            return session;
        }
    }

    return false;
};

SessionStore.prototype.getNextOpenSession = function() {
    for (var key in this.sessions) {
        var session = this.sessions[key];
        if (session.canUserJoin()) {
            return session;
        }
    }

    console.log('All sessions full, creating new session');

    var session = new Session(5);
    this.addSession(session);
    return session;
};

SessionStore.prototype.getSessions = function() {
    return this.sessions;
}

module.exports = SessionStore;
