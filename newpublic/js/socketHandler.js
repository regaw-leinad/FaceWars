var Packet = {
    USER_AUTH_NEW: 0,
    USER_AUTH_RESPONSE: 1,
    USER_JOIN_SESSION: 2,
    USER_LEAVE_SESSION: 3,
    USER_DISCONNECTING: 4,
    UPDATE_ENTITY: 5,
    CHAT_MESSAGE: 6,
    ENTITY_DIE: 7
};

//var socket = io.connect('http://localhost:1234');
var socket = io.connect('http://iuga.ischool.uw.edu:1234');

socket.on(Packet.USER_AUTH_RESPONSE, function (data) {
	if (data.err) {
		console.error(data.err);
		return;
	}

	fadeGameIn();

	currentUser = data.user;
	currentSession = data.session;

	console.log('auth success');
	console.log(currentUser);
	console.log(currentSession);

	ownShipEntity = new Ship(Ship.createNewDataFromUser(currentUser));
	entitiesByID[ownShipEntity.getId()] = ownShipEntity;

	// begin packet loop
	onFrame.oldTime = (new Date()).getTime();
	onFrame((new Date()).getTime());

});

// socket.emit(Packet.USER_AUTH_NEW, {
// 	userName: salt(10),
// 	color: '#' + Math.floor(Math.random() * 16777215).toString(16)
// });

socket.on(Packet.USER_JOIN_SESSION, function (data) {
	// add user to current session
	currentSession.users[data.user.id] = data.user;
});

socket.on(Packet.USER_LEAVE_SESSION, function (data) {
	// remove entities from DOM and reference
	Object.keys(entitiesByID).forEach(function (entityID) {
		if (entitiesByID[entityID].m.userName === data.user.name) {
			entitiesByID[entityID].removeFromDOM();
			delete entitiesByID[entityID];
		}
	});
	// remove user from reference
	delete currentSession.users[data.user.id];
});

socket.on(Packet.CHAT_MESSAGE, function(data) {
	// Display the chat message here
	// data { user: userObj, msg: '', time: timeStamp }
});

socket.on(Packet.UPDATE_ENTITY, function (data) {
	if (entitiesByID[data.entity.id]) {
		if (data.entity.type === EntityType.SHIP) {
			entitiesByID[data.entity.id].update(data.entity);
			if (data.entity.userName === currentUser.name) {
				// packet loop lols
				onFrame((new Date()).getTime());
			}
		}
	} else {
		entitiesByID[data.entity.id] = new Ship(data.entity);
	}
});
