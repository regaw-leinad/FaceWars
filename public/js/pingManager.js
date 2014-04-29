function PingManager() {
    this.pings = [];
    return this;
}

PingManager.prototype.addPing = function(ping) {
    if (this.pings.length >= 20) {
        this.pings = [];
    }

    this.pings.push(ping);
};

// Basically calculates average ping over last 20 updates
PingManager.prototype.getCalculatedPing = function() {
    var result = 0;

    this.pings.forEach(function(ping) {
        result += ping;
    });

    if (result === 0) {
        result = 1;
    }

    return Math.round(result / this.pings.length);
};
