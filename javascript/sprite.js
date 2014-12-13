function Sprite(img, pos, size, speed, frames, dir, once) {
    this.pos = pos;
    this.offsetX = 0; 
    this.offsetY = 0;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.img = img;
    this.dir = dir || 'vertical';
    this.once = once;
};

Sprite.prototype.update = function(dt) {
    this._index += this.speed*dt;
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


    var x = this.pos[0] - this.gameWorld.offsetX;
    var y = this.pos[1] - this.gameWorld.offsetY;

    if(this.dir == 'vertical') {
        y += frame * this.size[1];
    }
    else {
        x += frame * this.size[0];
    }

    ctx.drawImage(this.img,
                  x, y,
                  this.size[0], this.size[1],
                  0, 0,
                  this.size[0], this.size[1]);
}