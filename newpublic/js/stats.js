// statistics
var killBoxEl = document.createElement('div');
killBoxEl.setAttribute('id', 'killBox');
Board.$el.append(killBoxEl);
function setKillBox(kills) {
	var html = '<b>Kills:</b>&nbsp;';
	killBoxEl.innerHTML = html + kills;
}

// players
var userBoxEl = document.createElement('div');
userBoxEl.setAttribute('id', 'userBox');
Board.$el.append(userBoxEl);
function setUserBox(users) {
	var html = '';
	Object.keys(users).forEach(function (key) {
		var user = users[key];
		html += '<strong style="color:' + user.color + '">';
		html += user.name;
		html += '</strong><br>';
	});
	userBoxEl.innerHTML = html;
}