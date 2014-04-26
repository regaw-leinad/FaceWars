var packet = {
    SPAWN_ENTITY: '0',
    GAME_START: '1'
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