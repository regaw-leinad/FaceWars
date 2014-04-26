function Ship() {
	this.init("ship", ID);

	this.bullets = 0;
	this.preMove = function(delta){
		if('this is rotating') {
			this.velocity.rotation = 6;
		} else if("key is to the right") {
			this.velocity.rotation += 6
		} else {
			this.velocity.rotation += 0;
		}
		if(this.bullets > 0) {
			this.bullets -= delta;
		}

		//if key is a space reload the bullets
		if (this.bullets <= 0) {
			this.bullets = 10;
			for (var i = 0; i < this.bullets.length; i++) {
			  	if (!this.bullets[i].visible) {
				    var v_init = 15;
				    var bullet = this.bullets[i];
				    var rad = ((this.shipRotation) * Math.PI)/180;
				    var vectorx = v_init*Math.cos(rad);
				    var vectory = v_init*Math.sin(rad);
				    // move to the nose of the ship
				    bullet.x = this.x + vectorx;
				    bullet.y = this.y + vectory;
				    bullet.velocity.dx = 2 * vectorx + this.velocity.dx;
				    bullet.velocity.dy = 2 * vectory + this.velocity.dy;
				    bullet.visible = true;
				    break;
			  }
			}
		}

	};

};

Ship.prototype.