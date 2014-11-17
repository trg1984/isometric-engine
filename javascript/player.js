Player = function(x, y, z, spriteIndex) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.direction = 0;
	this.target = null;
	this.status = '';
	this.sprite = spriteIndex;
}