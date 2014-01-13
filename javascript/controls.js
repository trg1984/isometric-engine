var mRight = false;
var mLeft = false;
var mouseX = 0;
var mouseY = 0;
var mTileX = 0;
var mTileY = 0;
var ux = 0;
var uy = 0;
var dx = 0;
var dy = 0;

function mdown(ev) {
	var l = false;
	var r = false;
	if (ev.which) l = ev.which == 1;
	else if (ev.button) l = ev.button == 1;
	
	if (ev.which) r = ev.which == 3;
	else if (ev.button) r = ev.button == 2;
	
	if (r && (r != mRight)) {
		dx = mouseX;
		dy = mouseY;
	}
	
	if (r) mRight = r;
	if (l) mLeft = l;
	
	if (mLeft) {
		if (keys[67]) currentTile = map.cell[mTileY * map.width + mTileX];
		else map.cell[mTileY * map.width + mTileX] = currentTile;
	}
	
	updateAllLayers();
}

function mup(ev) {
	var l = false;
	var r = false;
	
	if (ev.which) l = ev.which == 1;
	else if (ev.button) l = ev.button == 1;
	
	if (ev.which) r = ev.which == 3;
	else if (ev.button) r = ev.button == 2;
	
	if (r && (r != mRight)) {
		ux = mouseX;
		uy = mouseY;
	} 
	
	if (r) mRight = !r;
	if (l) mLeft = !l;
	updateAllLayers();
}

function mwheel(ev) {
	ev = window.event || ev; // old IE support
	var delta = Math.max(-1, Math.min(1, (ev.wheelDelta || -ev.detail)));
	if (keys[90]) map.z[mTileY * map.width + mTileX] += delta;
	else map.cell[mTileY * map.width + mTileX] += delta;
	updateAllLayers();
}

function mmove(ev) {
	var canvas = ev.target;
	if (ev.layerX || ev.layerX == 0) { // Firefox
		ev._x = ev.layerX - canvas.offsetLeft;
		ev._y = ev.layerY - canvas.offsetTop - 1;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		ev._x = ev.offsetX - canvas.offsetLeft;
		ev._y = ev.offsetY - canvas.offsetTop - 1;
	}				
		
	if (mRight) {
		offsetX += ev._x - mouseX;
		offsetY += ev._y - mouseY; 
	}
	mouseX = ev._x;
	mouseY = ev._y;
	
	var coords = isoConvert(mouseX, mouseY - tileHeight / 2);
	coords[0] = Math.floor(coords[0]) + 0.5;
	coords[1] = Math.floor(coords[1]) + 0.5;
	mTileX = Math.floor(coords[0]);
	mTileY = Math.floor(coords[1] + 1);
	
	if (mLeft) {
		if (keys[67]) currentTile = map.cell[mTileY * map.width + mTileX];
		else map.cell[mTileY * map.width + mTileX] = currentTile;
	}
	
	updateAllLayers();
}

function kDown(key) {
	/* key down events here */
	key = key.keyCode || key;
	console.debug(key + ' down,');
	keys[key] = true;
}

function kUp(key) {
	/* key down events here */
	key = key.keyCode || key;
	console.debug(key + ' up,');
	keys[key] = false;
}

function initControls(parent) {
	
	// Attach the mousedown, mousemove and mouseup event listeners.
	parent.addEventListener('mousedown', mdown, false);
	parent.addEventListener('mousemove', mmove, false);
	parent.addEventListener('mouseup',   mup, false);
	parent.addEventListener("mouseout", buttonsUp, false);
	parent.addEventListener("mousewheel", mwheel, false);
	parent.addEventListener("DOMMouseScroll", mwheel, false);
	
	parent.addEventListener('keydown',  kDown, false);
	parent.addEventListener('keyup',  kUp, false);
}

function buttonsUp() {
	mLeft = mRight = false;
	layers[layerNumToID['ui']].update = true; // update ui layer. // fix this by creating a map between layer ids and their respective numbers.
}
