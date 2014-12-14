function Sprite(img, pos, size, speed, frames, dir, once) {
	this.playerX; 
	this.playerY;

	this.targetX = 0;
	this.targetY = 0;

    this.pos = pos;
    this.offsetX = 0; 
    this.offsetY = 0;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.img = img;
    this.dir = dir || 'north';
    this.once = once || false;
};

Sprite.prototype.update = function(dt) {

	if(this.playerX != this.targetX || this.playerY != this.targetY) {

			if(this.playerX < this.targetX) {
				this.playerX += this.speed*dt*10;
			}
			else if(this.playerX > this.targetX) {
				this.playerX -= this.speed*dt*10;				
			}

			if(this.playerY < this.targetY) {
				this.playerY += this.speed*dt*10;
			}
			else if(this.playerY > this.targetY) {
				this.playerY -= this.speed*dt*10;				
			}
		    this._index += this.speed*dt;		

	}

}

Sprite.prototype.render = function(ctx) {
    var frame;

    if(this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if(this.once && idx >= max) {
            this.done = true;
            return;
        }
    }
    else {
        frame = 0;
    }


    var x = this.pos[0];
    var y = this.pos[1];

    if(this.dir == 'north') {
        y += frame * this.size[1];
    }
    else if(this.dir == 'south') {
        y += frame * this.size[1]*3;    	
    }
    else if(this.dir == 'east') {
        y += frame * this.size[1]*4;    	    	
    }
    else if(this.dir =='west') {
 	    y += frame * this.size[1]*2;    	
    }
    else {
        x += frame * this.size[0];
    }


    ctx.clearRect(0,0,$(window).width(), $(window).height());
   	// console.log(this.playerX, this.playerY);
    ctx.drawImage(this.img,
                  x, y,
                  this.size[0], this.size[1],
                  this.playerX, this.playerY,
                  this.size[0], this.size[1]);


}