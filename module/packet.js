var packet = {
    USER_AUTH_NEW: 0,
    USER_AUTH_RESPONSE: 1,
    SPAWN_ENTITY: 2,
    GAME_START: 3
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