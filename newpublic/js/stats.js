// statistics
var killBoxEl = document.createElement('div');
killBoxEl.setAttribute('id', 'killBox');
Board.$el.appendChild(killBoxEl);
function setKills(kills) {
	var html = '<b>Kills:</b>&nbsp;';
	killBoxEl.innerHTML = html + kills;
}

// players
var userBoxEl = document.createElement('div');
userBoxEl.setAttribute('id', 'userBox');
Board.$el.appendChild(userBoxEl);
function setKills(users) {
	var html = '';
	users.forEach(function (user) {
		html += '<strong style="color:' + user.color + '">';
		html += user.name;
		html += '</strong>';
	});
	userBox.innerHTML = html;
}