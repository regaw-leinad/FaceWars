
function RoomStore() {
    this.rooms = {};
    this.roomNames = [];
}

RoomStore.prototype.addRoom = function(room) {
    this.rooms[room.id] = room;
    this.roomNames.push(room.displayName);
};

RoomStore.prototype.removeRoom = function(room) {
    delete this.rooms[room.id];

    var index = this.roomNames.indexOf(room.displayName);
    if (index > -1) {
        this.roomNames.splice(index, 1);
    }
};

RoomStore.prototype.getRoomByName = function(roomName) {
    roomName = roomName.toLowerCase();

    for (var key in this.rooms) {
        var room = this.rooms[key];
        if (room.name === roomName.toLowerCase()) {
            return room;
        }
    }

    return false;
};

RoomStore.prototype.getRoomByUser = function(user) {
    for (var key in this.rooms) {
        var room = this.rooms[key];
        if (room.getUsers().hasOwnProperty(user.id)) {
            return room;
        }
    }

    return false;
};