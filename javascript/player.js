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

    this.speed = 2.5;
    this.walk = false;

    this.target = {};
    this.target.x = pos[0]; //i 
    this.target.y = pos[1]; //j

    this.facingTo = 'north';

    // image sprite coords
	this.sx = 0;
	this.sy = 0;


	this.endEventFired = true;
}

Player.prototype.moveTo = function (pos, dir) {
	this.walk = true;
	this.direction = dir;
	this.target.x = pos[0]; 
	this.target.y = pos[1];

	this.endEventFired = false;
}

Player.prototype.moveNorth = function() {
	var y = Math.floor(this.tile[1]); 
	if (y > 0) {

		var map = this.gameWorld.map;

		var next = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1])-1 ) * map.width+(Math.floor(this.tile[0])) ] ];
		var current = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1]) ) * map.width+(Math.floor(this.tile[0])) ] ];

		if(next.walkable && next.enterFromSouth && current.exitToNorth ) {
			this.moveTo([this.tile[0], this.tile[1] - 1], 'north');		
			this.facingTo = 'north';
		}
		else {
			this.canNotWalk();
		}

	} 
}


Player.prototype.moveSouth = function() {
	var y = Math.floor(this.tile[1]); 
	if ( y < this.gameWorld.map.height) {

		var map = this.gameWorld.map;

		var next = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1])+1 ) * map.width+(Math.floor(this.tile[0])) ] ];
		var current = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1]) ) * map.width+(Math.floor(this.tile[0])) ] ];

		if(next.walkable && next.enterFromNorth && current.exitToSouth) {
			this.moveTo([this.tile[0], this.tile[1] + 1], 'south');		
			this.facingTo = 'south';
		}
		else {
			this.canNotWalk();
		}
	} 
}


Player.prototype.moveWest = function() {
	var x = Math.floor(this.tile[0]); 
	if (x > 0 ) {

		var map = this.gameWorld.map;

		var next = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1]) ) * map.width+(Math.floor(this.tile[0] -1)) ] ];
		var current = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1]) ) * map.width+(Math.floor(this.tile[0])) ] ];

		if(next.walkable && next.enterFromEast && current.exitToWest) {

			this.moveTo([this.tile[0] - 1, this.tile[1]], 'west');		
			this.facingTo = 'west';
		}
		else {
			this.canNotWalk();
		}
	} 
}

Player.prototype.moveEast = function() {
	var x = Math.floor(this.tile[0]); 
	if (x < this.gameWorld.map.width) {

		var map = this.gameWorld.map;

		var next = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1]) ) * map.width+(Math.floor(this.tile[0] +1)) ] ];
		var current = this.gameWorld.mapConfig[ map.cell[ (Math.floor(this.tile[1]) ) * map.width+(Math.floor(this.tile[0])) ] ];

		if(next.walkable && next.enterFromWest && current.exitToEast) {
			this.moveTo([this.tile[0] + 1, this.tile[1]], 'east');	
			this.facingTo = 'east';	
		}
		else {
			this.canNotWalk();
		}
	} 
}

Player.prototype.canNotWalk = function() {
	console.log("Cannot walk here!");
}



Player.prototype.isType = function(targetType) {
	var map = this.gameWorld.map;
	// console.log("================== Debug ==================");
	// console.log("north:",  map.cell[ (this.tile[1]-1 ) * map.width+(this.tile[0]) ]);
	// console.log("south:",  map.cell[ (this.tile[1]+1 ) * map.width+(this.tile[0]) ]);
	// console.log("east:", map.cell[ (this.tile[1] ) * map.width+(this.tile[0]+1)  ]);
	// console.log("west:", map.cell[ (this.tile[1]) * map.width+(this.tile[0]-1)  ] );
	// console.log("===========================================");


	switch(this.facingTo) {
		case 'north':  return map.cell[ (Math.floor(this.tile[1])-1 ) * map.width+(Math.floor(this.tile[0])) ] == targetType;
						break;
		case 'south':  return map.cell[ (Math.floor(this.tile[1])+1 ) * map.width+(Math.floor(this.tile[0])) ] == targetType;
						break;
		case 'east':  return map.cell[ (Math.floor(this.tile[1]) ) * map.width+(Math.floor(this.tile[0])+1) ] == targetType;
						break;
		case 'west':  return map.cell[ (Math.floor(this.tile[1])) * map.width+(Math.floor(this.tile[0])-1)  ] == targetType;
						break;
		default: return false;
	}
}

Player.prototype.update = function(dt) {

	if( (Math.abs(this.target.x - this.tile[0]) > 0.05) || (Math.abs(this.target.y - this.tile[1]) > 0.05  )) {

		if(this.tile[0] > this.target.x) {
			this.tile[0] = this.tile[0] - this.speed * dt; 
		}

		if(this.tile[0] < this.target.x) {
			this.tile[0] = this.tile[0] + this.speed * dt; 
		}		

		if(this.tile[1] > this.target.y) {
			this.tile[1] = this.tile[1] - this.speed * dt; 
		}

		if(this.tile[1] < this.target.y) {
			this.tile[1] = this.tile[1] + this.speed * dt; 
		}	
	}

	else {
		if(!this.endEventFired) {
			this.tile[0] = this.target.x;
			this.tile[1] = this.target.y;
			this.walk = false;
			this.endEventFired = true;
			$('body').trigger('walkEnd', [this.direction]);
			
		} 
	}

}

Player.prototype.runCommands = function(commands) {
	var self = this;

	// remove other walkEnd listeners
	//$('body').unbind('walkEnd');

	if(commands.length > 0) {
		// remove first item from commands
		var command = commands.shift();
		// run command
		self.stringToAction(command);		

		// call runCommands again after walkEnd event
		$('body').off('walkEnd').on('walkEnd', function(event, direction) {
			self.runCommands(commands);
		});

	}

	// handle quitting recursion
	else {
		return;
	}

}

Player.prototype.stringToAction = function(command) {
	var self = this;
	switch(command) {
		case 'moveNorth': self.moveNorth(); 
						break; 

		case 'moveSouth': self.moveSouth(); 
						break; 

		case 'moveEast': self.moveEast(); 
						break; 

		case 'moveWest': self.moveWest(); 
						break; 	
	
		// case 'isType': self.isType(15); 
		// 				break;

		default: return console.log("error"); 
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
	   		this.sx = 3 * this.size[0];    	
	    }
	    else if(this.direction =='west') {
	   		this.sx = 1 * this.size[0];    	
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
	   		this.sx = 3 * this.size[0];    	
	    }
	    else if(this.direction =='west') {
	   		this.sx = 1 * this.size[0];    	
	    }
	}

    // ctx.clearRect( this.x + this.gameWorld.offsetX, this.y + this.gameWorld.offsetY, this.size[0], this.size[1]);
    ctx.clearRect( 0, 0, $('#map').attr('width')|0, $('#map').attr('height')|0);

   	// console.log(this.img, this.sx, this.sy);
   	var coords =  this.gameWorld.xyToIso(this.tile[0], this.tile[1]);
    ctx.drawImage(this.img,
                  this.sx, this.sy,
                  this.size[0], this.size[1],
                  coords[0] - this.pivot[0], coords[1] - this.pivot[1],
                  this.size[0], this.size[1]);
}