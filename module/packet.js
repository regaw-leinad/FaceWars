var packet = {
    USER_POSITION_UPDATE: '0',

}

/*
    ============
    | Protocol | 
    ============

    // Sent from the client to the server to notify the new position of the user
    // Also, broadcasted to all clients when received by the server
    // Client -> Server
    // Server -> Client
    USER_POSITION:
        data {  }
*/