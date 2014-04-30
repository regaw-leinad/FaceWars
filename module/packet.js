var packet = {
    USER_AUTH_NEW: 0,
    USER_AUTH_RESPONSE: 1,
    USER_JOIN_SESSION: 2,
    USER_LEAVE_SESSION: 3,
    USER_DISCONNECTING: 4,
    UPDATE_ENTITY: 5,
    CHAT_MESSAGE: 6,
    ENTITY_DIE: 7
}

module.exports = packet;

/*
    ============
    | Protocol | 
    ============
    
    // Sent from client to server when a new user wants to join
    // Client -> Server
    USER_AUTH_NEW:
        data { userName: '', color: '' }

    // Sent from server to client in response to USER_AUTH_NEW
    // Server -> Client
    USER_AUTH_RESPONSE:
        if error
            data { err: 'description of error', errCode: # }
        else 
            data { user: newUserObject, session: session }

    // Sent from server to client when a user joins a session
    // Server -> Client
    USER_JOIN_SESSION:
        data { user: userObject }
    
    // Sent from server to client when a user leaves a session
    // Server -> Client
    USER_LEAVE_SESSION:
        data { user: userObject }
    
    // Sent from client to server to let it know the user is about to disconnect
    // Client -> Server
    USER_DISCONNECTING:
        data { user: userObject }

    // Sent from both server and client. 
    // From client to let server know about an update
    // From server as a broadcast to all clients in session
    // Client -> Server, Server -> Clients in session
    UPDATE_ENTITY:
        data { entity: entityObject }

    // Sent from both server and client, represents a chat message
    // Client -> Server, Server -> Clients in current session
    CHAT_MESSAGE:
        data { user: userObject, msg: messageText, time: timeStamp }

    // Sent from both server and client. 
    // From client to let server know about an entity death
    // From server as a broadcast to all clients in session
    // Client -> Server, Server -> Clients in session
    ENTITY_DIE:
        data { entity: entityObject }
*/ 