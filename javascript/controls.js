
IsoMap.prototype.mdown = function(ev) {
	var self = this;

	var l = false;
	var r = false;
	
	if (ev.which) l = ev.which == 1;
	else if (ev.button) l = ev.button == 1;
	
	if (ev.which) r = ev.which == 3;
	else if (ev.button) r = ev.button == 2;
	
	if (r && (r != self.mRight)) {
		dx = self.mouseX;
		dy = self.mouseY;
	}
	
	if (r) self.mRight = r;
	if (l) self.mLeft = l;
	
	if (self.mLeft) {
		if (self.keys[67]) self.currentTile = self.map.cell[mTileY * self.map.width + self.mTileX];
		else self.map.cell[self.mTileY * self.map.width + self.mTileX] = self.currentTile;
	}
	
	self.updateAllLayers();
}

IsoMap.prototype.mup =function(ev) {

	var self = this;

	var l = false;
	var r = false;
	
	if (ev.which) l = ev.which == 1;
	else if (ev.button) l = ev.button == 1;
	
	if (ev.which) r = ev.which == 3;
	else if (ev.button) r = ev.button == 2;
	
	if (r && (r != self.mRight)) {
		ux = mouseX;
		uy = mouseY;
	} 
	
	if (r) self.mRight = !r;
	if (l) self.mLeft = !l;
	self.updateAllLayers();
}

IsoMap.prototype.mwheel = function(ev) {

	var self = this;

	ev = window.event || ev; // old IE support
	var delta = Math.max(-1, Math.min(1, (ev.wheelDelta || -ev.detail)));
	if (self.keys[90]) self.map.z[self.mTileY * self.map.width + self.mTileX] += delta;
	else self.map.cell[self.mTileY * self.map.width + self.mTileX] += delta;
	self.updateAllLayers();
}

IsoMap.prototype.mmove = function(ev) {
	var self = this;
	var canvas = ev.target;
	if (ev.layerX || ev.layerX == 0) { // Firefox
		ev._x = ev.layerX - canvas.offsetLeft;
		ev._y = ev.layerY - canvas.offsetTop - 1;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		ev._x = ev.offsetX - canvas.offsetLeft;
		ev._y = ev.offsetY - canvas.offsetTop - 1;
	}				
		
	if (self.mRight) {
		offsetX += ev._x - mouseX;
		offsetY += ev._y - mouseY; 
	}
	self.mouseX = ev._x;
	self.mouseY = ev._y;
	
	var coords = self.isoConvert(self.mouseX, self.mouseY - self.tileHeight / 2);
	coords[0] = Math.floor(coords[0]) + 0.5;
	coords[1] = Math.floor(coords[1]) + 0.5;
	self.mTileX = Math.floor(coords[0]);
	self.mTileY = Math.floor(coords[1] + 1);
	
	if (self.mLeft && !self.readOnly) {
		if (self.keys[67]) self.currentTile = self.map.cell[self.mTileY * self.map.width + self.mTileX];
		else self.map.cell[self.mTileY * self.map.width + self.mTileX] = self.currentTile;
	}
	
	self.updateAllLayers();
}

IsoMap.prototype.kDown = function(key) {
	var self = this;
	/* key down events here */
	key = key.keyCode || key;
	console.debug(key + ' down,');
	self.keys[key] = true;
}

IsoMap.prototype.kUp = function(key) {
	var self = this;
	/* key down events here */
	key = key.keyCode || key;
	console.debug(key + ' up,');
	self.keys[key] = false;
}

IsoMap.prototype.initControls = function(parent) {
	var self = this;
	// Attach the mousedown, mousemove and mouseup event listeners.
	parent.addEventListener('mousedown', self.mdown.bind(self), false);
	parent.addEventListener('mousemove', self.mmove.bind(self), false);
	parent.addEventListener('mouseup',   self.mup.bind(self), false);
	parent.addEventListener("mouseout", self.buttonsUp.bind(self), false);
	parent.addEventListener("mousewheel", self.mwheel.bind(self), false);
	parent.addEventListener("DOMMouseScroll", self.mwheel.bind(self), false);
	
	parent.addEventListener('keydown',  self.kDown, false);
	parent.addEventListener('keyup',  self.kUp, false);
}

IsoMap.prototype.buttonsUp = function() {
	var self = this; 
	
	self.mLeft = self.mRight = false;
	self.layers[self.layerNumToID['ui']].update = true; // update ui layer. // fix this by creating a map between layer ids and their respective numbers.
}
