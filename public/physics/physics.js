var width = 750
   , height = 750
   , gravity = 10;

var center = {
	x: width / 2,
	y: height / 2
};

$(document).ready(function() {
	update("Running correctly");

    enterMsg = $("#enterMsg");
    submitMsg = $("#submitMsg");
    submitMsg.on("click", function() {
        var time = new Date();
        update(time);
    	enterMsg.val('');
    });
    var object = new Entity();

    console.log(object.centerX);
    console.log(object.centerY);

    object.move(1);

    update("New x: " + object.x);

});

function update(msg) {
    var container = document.createElement("div");
    container.innerHTML = msg;
    document.getElementById("test").appendChild(container);
}

function onFrame(time) {
	var delta = time - onFrame.oldTime;

}
