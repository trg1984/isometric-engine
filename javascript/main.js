// Copyright to all of the code Rolf Lindén (rolind@utu.fi) 2011-2013. All rights reserved.

IsoMap = function(readOnly, callback) {
	// Initialize.
	this.readOnly = readOnly || false;
	this.map;
	this.tileWidth = 100;
	this.tileHeight = 65;
	this.tileSpacingWidth = 100
	this.tileSpacingHeight = 65;
	this.tiles = true;
	this.toolTile = 2;
	this.toolSize = 0;
	this.t =  0; 
	this.currentTile =  0; 
	this.timer_is_on = 0;
	this.offsetX;
	this.offsetY;
	this.sprites;
	this.animate = false;
	this.eys = new Array(255);

	this.layers = [];
	this.layerNumToID = {};

	this.mRight = false;
	this.mLeft = false;
	this.mouseX = 0;
	this.mouseY = 0;
	this.mTileX = 0;
	this.mTileY = 0;
	this.ux = 0;
	this.uy = 0;
	this.dx = 0;
	this.dy = 0;
	this.keys = [];

	this.player;

	this.loadImages();
	this.init();
}



IsoMap.prototype.isoConvert = function(x0, y0) {

	if (Array.isArray(x0)) {
		var y = x0[1]; 
		var x = x0[0];
	}

	else {
		var x = x0; 
		var y = y0;
	}

	var self = this;
	var i = (x - self.offsetX) / self.tileWidth + (y - self.offsetY) / (self.tileHeight - 15);
	var j = i - 2 * (x - self.offsetX) / self.tileWidth;
	/* How it's done
	x = (i - j) * tileWidth / 2 + offsetX
	(x - offsetX) * 2 / tileWidth = i - j
	
	y = (i + j) * (tileHeight - 15) / 2 + offsetY
	(y - offsetY) * 2 / (tileHeight - 15) = i + j
	
	(x - offsetX) * 2 / tileWidth + (y - offsetY) * 2 / (tileHeight - 15) = 2*i
	i = (x - offsetX) / tileWidth + (y - offsetY) / (tileHeight - 15)
	*/
	return [i, j];
}

IsoMap.prototype.xyToIso = function(i0, j0) {


	if (Array.isArray(i0)) {
		var j = i0[1]; 
		var i = i0[0];
	}

	else {
		var i = i0; 
		var j = j0;
	}


	var self = this; 
	var x = (i - j) * self.tileWidth / 2 + self.offsetX;
	var y = (i + j) * (self.tileHeight - 15) / 2 + self.offsetY;

	return [x, y];
}

// Draw the map.
IsoMap.prototype.drawMap = function(m) {
	var self = this;

	var canvas = self.layers[0].canvas;
	var ctx = canvas.getContext('2d');
	
	//ctx.fillStyle = "rgb(50,130,255)";
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//
	
	//if (bg.width > 0) ctx.drawImage(bg, canvas.width / 2 - bg.width / 2, canvas.height / 2 - bg.height / 2);
	//else ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//ctx.fillStyle    = '#fff';
	
	// Calculate the corner points.
	var floorArray = function(val, ind, arr) { arr[ind] = Math.floor(val) };
	var P1 = self.isoConvert(0, 0);                        P1.forEach(floorArray);
	var P2 = self.isoConvert(canvas.width, 0);             P2.forEach(floorArray);
	var P3 = self.isoConvert(0, canvas.height);            P3.forEach(floorArray);
	var P4 = self.isoConvert(canvas.width, canvas.height); P4.forEach(floorArray);
	
	// Just to make things pretty -- boundaries for y-interval.
	var y0 = Math.min(Math.max(y0 = P2[1], 0), m.height - 1);
	var y1 = Math.min(Math.max(y1 = P3[1] + 1, 0), m.height - 1);
	
	for (var j = y0; j <= y1; ++j) {
	
		// Calculate the positions relative to different boundary conditions.
		var r1 = (j - P2[1]) / (P1[1] - P2[1]); // Top
		var r2 = (j - P1[1]) / (P3[1] - P1[1]); // Left
		var r3 = (j - P2[1]) / (P4[1] - P2[1]); // Right
		var r4 = (j - P4[1]) / (P3[1] - P4[1]); // Bottom
		
		
		// TODO Include z-value of the item in the conciderations.
		// Calculate the x-interval boundaries x0 and x1.
		var x0 = Math.min(Math.max(Math.floor( (j <= P1[1]) ? r1 * (P1[0] - P2[0]) + P2[0] : r2 * (P3[0] - P1[0]) + P1[0] ) - 2, 0), m.width - 1);
		var x1 = Math.min(Math.max(Math.ceil( (j <= P4[1]) ? r3 * (P4[0] - P2[0]) + P2[0] : r4 * (P3[0] - P4[0]) + P4[0] ) + 1, 0), m.width - 1);
		
		for (var i = x0; i <= x1; ++i) {  
			var iso = self.xyToIso(i, j);
			var tile = m.cell[j * m.width + i];
			if (
				( typeof(self.mapConfig[tile].img) !== 'undefined' ) &&
				self.mapConfig[tile].img.isLoaded
				) {
				ctx.drawImage(self.mapConfig[tile].img , iso[0] || 0, iso[1] - m.z[j * m.width + i] || 0);
				// console.log("debug:",self.img[ m.cell[j * m.width + i] ], iso[0] || 0, iso[1] - m.z[j * m.width + i] || 0);
				//ctx.fillText  ('(' + i + ', ' + j + ')', (i - j + 0.6) * tileWidth / 2 + offsetX, (i + j + 0.75) * (tileHeight - 15) / 2 + offsetY - m.z[j * m.width + i]);
			}
		}
	}
}

IsoMap.prototype.drawUI = function(m) {
	var self = this;

	var canvas = self.layers[2].canvas;
	var ctx = canvas.getContext('2d');
	
	// This clearing can be optimized by tracking drawn elements.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.beginPath();
	// color of the square
	ctx.strokeStyle = '#2f2';
	
	var coords = [self.mTileX + 0.5, self.mTileY - 0.5];
	ctx.moveTo(((coords[0] - coords[1]) * self.tileWidth / 2 + self.offsetX) || 0, ((coords[0] + coords[1]) * (self.tileHeight - 15 /* ground height */) / 2 + self.offsetY) || 0); ++coords[0];
	ctx.lineTo(((coords[0] - coords[1]) * self.tileWidth / 2 + self.offsetX) || 0, ((coords[0] + coords[1]) * (self.tileHeight - 15 /* ground height */) / 2 + self.offsetY) || 0); ++coords[1];
	ctx.lineTo(((coords[0] - coords[1]) * self.tileWidth / 2 + self.offsetX) || 0, ((coords[0] + coords[1]) * (self.tileHeight - 15 /* ground height */) / 2 + self.offsetY) || 0); --coords[0];
	ctx.lineTo(((coords[0] - coords[1]) * self.tileWidth / 2 + self.offsetX) || 0, ((coords[0] + coords[1]) * (self.tileHeight - 15 /* ground height */) / 2 + self.offsetY) || 0); --coords[1];
	ctx.lineTo(((coords[0] - coords[1]) * self.tileWidth / 2 + self.offsetX) || 0, ((coords[0] + coords[1]) * (self.tileHeight - 15 /* ground height */) / 2 + self.offsetY) || 0);
	ctx.stroke();
	
	ctx.drawImage(self.cursor, self.mouseX, self.mouseY);
	
	ctx.fillStyle    = '#fff';
	ctx.font         = '12px sans-serif';
	ctx.textBaseline = 'top';
	// Indicate that the mouse button is down.
	if (self.mRight) {
		ctx.fillText  ('Mouse down.', 20, 50);
		ctx.fillText  ('Down (x, y): (' + self.dx + ', '+ self.dy + ').', 20, 65);
	}
	else ctx.fillText  ('Mouse up.', 20, 50);
	
	ctx.fillText  ('Coordinates (x, y): (' + self.mouseX + ', '+ self.mouseY + ').', 20, 20);
	ctx.fillText  ('Offset (x, y): (' + self.offsetX + ', '+ self.offsetY + ').', 20, 35);
	ctx.fillText  ('Tile (x, y, ind): (' + (self.mTileX) + ', '+ (self.mTileY) + ', ' + ((self.mTileX >= 0) && (self.mTileX < m.width) && (self.mTileY >= 0) && (self.mTileY < m.height) ? m.cell[self.mTileY * m.width + self.mTileX] : 'NaN') + ').', 20, 80);
}

IsoMap.prototype.drawSprites = function(m) {
	// Nothing yet.
}

IsoMap.prototype.setToolTile = function(n) { toolTile = n; }

IsoMap.prototype.setToolSize = function(n) { toolSize = n; }

IsoMap.prototype.initMap = function(m) {

	var self = this;

	for (var i = 0; i < m.width; i++) {  
		for (var j = 0; j < m.height; j++) {
			var x0 = Math.round(Math.random() * 18);
			var y0 = Math.round(Math.random() * 18);
			m.cellType[j * m.width + i] = 0;
		}  
	}  
	for (var i = 0; i < m.width; i++)   
		for (var j = 0; j < m.height; j++) {
						// map, x, y, type
			self.setGraphics(m, i, j, 15);
			m.z[j * m.width + i] = 0;
	}
	/*
	temp = JSON.parse("{\"width\":14,\"height\":14,\"cell\":[15,15,15,15,15,15,39,39,39,39,34,15,38,62,15,15,15,15,15,37,55,42,42,42,31,15,20,62,15,15,15,15,27,45,21,15,15,15,15,15,15,38,15,15,15,52,48,40,33,37,55,34,50,68,53,38,15,60,63,64,42,31,33,40,15,40,65,62,59,20,15,13,7,61,24,30,18,40,15,40,44,56,47,15,15,13,7,6,55,55,55,31,15,64,55,55,34,15,15,13,7,31,15,15,15,15,60,1,63,15,40,15,15,54,57,15,15,15,15,-2,54,25,57,15,40,15,15,15,60,66,66,63,27,21,15,15,15,15,40,15,15,15,13,16,16,7,42,39,55,55,55,55,31,15,15,15,54,25,25,57,24,18,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,39,null,null,null,null,null,null,null,null,null],\"z\":[0,0,0,0,0,0,106,91,76,61,46,0,0,-2,0,0,0,0,0,0,0,1,16,31,46,0,0,-2,0,0,0,0,-1,0,0,-1,-1,-1,-1,0,0,0,0,0,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,15,15,0,0,0,0,-2,-2,0,0,0,0,0,0,15,15,0,0,0,0,-2,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"cellType\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}");
	console.debug(temp);
	m.cell = temp.cell;
	m.z = temp.z;
	*/
	//var canvas = document.getElementById('map');
	
	self.offsetX = window.innerWidth / 2 - self.tileWidth / 2;
	self.offsetY = window.innerHeight / 2 - m.height / 2 * self.tileHeight;
}

function Map(w, h) {
	this.width = w;
	this.height = h;
	this.cell = new Array(this.width * this.height);
	this.z = new Array(this.width * this.height);
	this.cellType = new Array(this.width * this.height);
}

Map.prototype.getTileIndex = function(i, j) {
	var self = this;
	
	return j * self.width + i

}
	
IsoMap.prototype.setGraphics = function(map, x, y, value) {
	// console.log(map);
	if (y * map.width + x < 0) return;
	if (y * map.width + x >= map.cell.length) return;
	
	map.cell[y * map.width + x] = value;
}

IsoMap.prototype.isIn = function(item, list) {
	var it = list.length;
	while (it--) if (item == list[it]) return true;
	return false;
}

IsoMap.prototype.resizeWindow = function() {
	var self = this;

	// Set window size.
	var winW = 630, winH = 460;
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
		winW = document.documentElement.offsetWidth;
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}
	
	for (var item in self.layers) {
		self.layers[item].resize(winW, winH);
	}
	
	if(!self.readOnly) {
		$('.palette').height(winH - 10);
	}
}

IsoMap.prototype.init = function() {
	var self = this;

	self.loadMapConfig();

	if(self.readOnly) {
		$('.palette').remove();
	}

	if(!self.readOnly) {
		$('body').on('click', '.exportMap', function(e) {

			$('body').append('<div class="mapExport"><div class="close">xClose</div><textarea type="textarea" rows="50" cols="100"/></div>');
			$('.mapExport textarea').val('[' + map.cell + ']');
			$('.mapExport').css( {
							top: $(window).height()/2 - $('.mapExport').height()/2 + 'px',
							left: $(window).width()/2 - $('.mapExport').width()/2 + 'px'
	 					});
	 
			$('body').on('click', '.mapExport .close', function(e) {
				$('.mapExport').remove();
			});

		});
	}

	self.map = new Map(50, 50);
	self.initMap(self.map);

	// self.player = new Sprite(self.character, [0,0], [128,192], .25, [0,1,2,3]);
	// self.player.gameWorld = self;
	// self.player.playerX = 940; 
	// self.player.playerY = 349;
	// self.player.targetX = 940; 
	// self.player.targetY = 349;

	self.player = new Player([33,33], self.character, self, [12, 130]);
	var mapArr = self.map;
	
	self.addLayer( new Layer($('body'), 'map', function(mapArr) { self.drawMap(mapArr)}, self.layers ) );
	self.addLayer( new Layer($('body'), 'player', function() { self.player.update }, self.layers ) );
	self.addLayer( new Layer($('body'), 'sprites', function(mapArr) { self.drawSprites(mapArr)}, self.layers ) );
	self.addLayer( new Layer($('body'), 'ui', function(mapArr) { self.drawUI(mapArr) }, self.layers ) );

	// self.addLayer( new Layer($('body'), 'ui', function(mapArr) { console.log("ehp") }, self.layers ) );
	
	// Attach controls to the topmost layer.
	var canvas = self.layers[self.layers.length - 1].canvas;
	
	self.initControls(canvas);
	$(canvas).focus();
	
	$('body').resize(self.resizeWindow);
	
	self.resizeWindow();
	self.doTimer();
}

IsoMap.prototype.timedCount = function() {
	var self = this;
	self.animate = true;
	for (var item in self.layers) if (self.layers[item].update) {
		self.layers[item].updateFunction(self.map);
		self.layers[item].update = false;
	}

	// console.log("player layer", self.layers[self.layerNumToID['player']].ctx);
	var dt = (new Date()).getTime() / 1000 - self.lastFrame;
	self.lastFrame = self.lastFrame = (new Date()).getTime() / 1000;
	self.player.render(self.layers[self.layerNumToID['player']].ctx);
	self.player.update(dt);	
	
	self.animate = false;
	self.t = setTimeout(function() { self.timedCount() }, 20);
}

IsoMap.prototype.doTimer = function() {
	var self = this;
	self.lastFrame = (new Date()).getTime() / 1000;
	if (!self.timer_is_on) {
		self.timer_is_on = 1;
		self.timedCount();
	}
}
