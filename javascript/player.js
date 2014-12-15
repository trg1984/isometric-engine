Player = function(pos, img, gameWorld, pivot) {

	this.tile = pos; 

	this.gameWorld = gameWorld;
	this.direction = 'north';
	this.status = '';
	this.lastFrame = (new Date()).getTime() / 1000.0;
	// this.sprite = spriteIndex;
	this.size = [128, 192];
	this.frames = [0,1,2,3];
    this.frame = 0;
    this.frameStep = 1.0 / 8.0;
    this.img = img;
    this.pivot = pivot;

    this.speed = 10.0;
    this.walk = false;

    this.target = {};
    this.target.x = pos[0]; //i 
    this.target.y = pos[1]; //j


    // image sprite coords
	this.sx = 0;
	this.sy = 0;

}

Player.prototype.moveTo = function (pos, dir) {
	this.walk = true;
	this.direction = dir;
	this.target.x = pos[0]; 
	this.target.y = pos[1];
}

Player.prototype.moveNorth = function() {
	var y = this.tile[1]; 
	if (y > 0 && y < this.gameWorld.map.cell.length) {
		this.moveTo([this.tile[0], this.tile[1] - 1], 'north');		
	} 
}


Player.prototype.moveSouth = function() {
	var y = this.tile[1]; 
	if (y > 0 && y < this.gameWorld.map.cell.length) {
		this.moveTo([this.tile[0], this.tile[1] + 1], 'south');		} 
}


Player.prototype.moveWest = function() {
	var x = this.tile[0]; 
	if (x > 0 && x < this.gameWorld.map.cell.length) {
		this.moveTo([this.tile[0] - 1, this.tile[1]], 'west');		} 
}

Player.prototype.moveEast = function() {
	var x = this.tile[0]; 
	if (x > 0 && x < this.gameWorld.map.cell.length) {
		this.moveTo([this.tile[0] + 1, this.tile[1]], 'east');		
	} 
}

Player.prototype.update = function(dt) {
	// console.log(this.target.x, this.target.y, this.x , this.y);
	if( (Math.abs(this.target.x - this.tile[0]) > 0.1) || (Math.abs(this.target.y - this.tile[1]) > 0.1 )) {
		if(this.tile[0] > this.target.x) {
			this.tile[0] = this.tile[0] - 0.5 * this.speed * dt; 
		}

		if(this.tile[0] < this.target.x) {
			this.tile[0] = this.tile[0] + 0.5 * this.speed * dt; 
		}		

		if(this.tile[1] > this.target.y) {
			this.tile[1] = this.tile[1] - 0.5 * this.speed * dt; 
		}

		if(this.tile[1] < this.target.y) {
			this.tile[1] = this.tile[1] + 0.5 * this.speed * dt; 
		}	
	}

	else {
		this.walk = false;
	}

}

Player.prototype.render = function(ctx) {

	var dt = (new Date()).getTime() / 1000.0 - this.lastFrame;


	//if (this.walk) console.log(this.lastFrame, (new Date()).getTime() / 1000.0, dt, this.frameStep);
	if (dt > this.frameStep) {
		if(this.frame < this.frames.length-1) {
			this.frame++;
		}
		else {
			this.frame = 0;
		}
		this.lastFrame = (new Date()).getTime() / 1000.0;
	}

	if(this.walk) {
	    this.sx = 0;
	    this.sy = 0;

        this.sy = this.frame * this.size[1];

	    if(this.direction == 'north') {
	   		this.sx = 0 * this.size[0];    	
	    }
	    else if(this.direction == 'south') {
	   		this.sx = 2 * this.size[0];    	
	    }
	    else if(this.direction == 'east') {
	   		this.sx = 1 * this.size[0];    	
	    }
	    else if(this.direction =='west') {
	   		this.sx = 3 * this.size[0];    	
	    }

	}
	else {

		this.sy = 0;

	    if(this.direction == 'north') {
	   		this.sx = 0 * this.size[0];    	
	    }
	    else if(this.direction == 'south') {
	   		this.sx = 2 * this.size[0];    	
	    }
	    else if(this.direction == 'east') {
	   		this.sx = 1 * this.size[0];    	
	    }
	    else if(this.direction =='west') {
	   		this.sx = 3 * this.size[0];    	
	    }
	}

    // ctx.clearRect( this.x + this.gameWorld.offsetX, this.y + this.gameWorld.offsetY, this.size[0], this.size[1]);
    ctx.clearRect( 0, 0, $(window).width(), $(window).height());

   	// console.log(this.img, this.sx, this.sy);
   	var coords =  this.gameWorld.xyToIso(this.tile[0], this.tile[1]);
    ctx.drawImage(this.img,
                  this.sx, this.sy,
                  this.size[0], this.size[1],
                  coords[0] - this.pivot[0], coords[1] - this.pivot[1],
                  this.size[0], this.size[1]);
}