var packet = {
    USER_AUTH_NEW: 0,
    USER_AUTH_RESPONSE: 1,
    USER_JOIN_SESSION: 2,
    USER_LEAVE_SESSION: 3,
    USER_DISCONNECTING: 4,
    UPDATE_ENTITY: 5,
    CHAT_MESSAGE: 6
}

module.exports = packet;

/*
    ============
    | Protocol | 
    ============
    
    // Sent from client to server
    SPAWN_ENTITY:
        data { type: '', id: timeStamp, x: #, y: #, dx: #, dy: # }

    GAME_START:


*/ 