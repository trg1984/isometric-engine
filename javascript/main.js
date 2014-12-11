// Copyright to all of the code Rolf Lindén (rolind@utu.fi) 2011-2013. All rights reserved.

// Initialize.
var map;
var tileWidth = 100;
var tileHeight = 65;
var tileSpacingWidth = 100
var tileSpacingHeight = 65;
var tiles = true;
var toolTile = 2;
var toolSize = 0;
var t =  0; 
var currentTile =  0; 
var timer_is_on = 0;
var offsetX;
var offsetY;
var sprites;
var animate = false;
var keys = new Array(255);

function isoConvert (x, y) {
	var i = (x - offsetX) / tileWidth + (y - offsetY) / (tileHeight - 15);
	var j = i - 2 * (x - offsetX) / tileWidth;
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

function xyToIso(i, j) {
	var x = (i - j) * tileWidth / 2 + offsetX;
	var y = (i + j) * (tileHeight - 15) / 2 + offsetY;
	return [x, y];
}

// Draw the map.
function drawMap(m) {
	var canvas = layers[0].canvas;
	var ctx = canvas.getContext('2d');
	
	//ctx.fillStyle = "rgb(50,130,255)";
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//
	
	//if (bg.width > 0) ctx.drawImage(bg, canvas.width / 2 - bg.width / 2, canvas.height / 2 - bg.height / 2);
	//else ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//ctx.fillStyle    = '#fff';
	
	// Calculate the corner points.
	var floorArray = function(val, ind, arr) { arr[ind] = Math.floor(val) };
	var P1 = isoConvert(0, 0);                        P1.forEach(floorArray);
	var P2 = isoConvert(canvas.width, 0);             P2.forEach(floorArray);
	var P3 = isoConvert(0, canvas.height);            P3.forEach(floorArray);
	var P4 = isoConvert(canvas.width, canvas.height); P4.forEach(floorArray);
	
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
			var iso = xyToIso(i, j);
			if (
				( typeof(img[ m.cell[j * m.width + i] ]) !== 'undefined' ) &&
				img[ m.cell[j * m.width + i] ].isLoaded
				) {
				ctx.drawImage(img[ m.cell[j * m.width + i] ], iso[0] || 0, iso[1] - m.z[j * m.width + i] || 0);
				//ctx.fillText  ('(' + i + ', ' + j + ')', (i - j + 0.6) * tileWidth / 2 + offsetX, (i + j + 0.75) * (tileHeight - 15) / 2 + offsetY - m.z[j * m.width + i]);
			}
		}
	}
}

function drawUI(m) {
	
	var canvas = layers[2].canvas;
	var ctx = canvas.getContext('2d');
	
	// This clearing can be optimized by tracking drawn elements.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.beginPath();
	ctx.strokeStyle = '#2f2';
	
	var coords = [mTileX + 0.5, mTileY - 0.5];
	ctx.moveTo(((coords[0] - coords[1]) * tileWidth / 2 + offsetX) || 0, ((coords[0] + coords[1]) * (tileHeight - 15 /* ground height */) / 2 + offsetY) || 0); ++coords[0];
	ctx.lineTo(((coords[0] - coords[1]) * tileWidth / 2 + offsetX) || 0, ((coords[0] + coords[1]) * (tileHeight - 15 /* ground height */) / 2 + offsetY) || 0); ++coords[1];
	ctx.lineTo(((coords[0] - coords[1]) * tileWidth / 2 + offsetX) || 0, ((coords[0] + coords[1]) * (tileHeight - 15 /* ground height */) / 2 + offsetY) || 0); --coords[0];
	ctx.lineTo(((coords[0] - coords[1]) * tileWidth / 2 + offsetX) || 0, ((coords[0] + coords[1]) * (tileHeight - 15 /* ground height */) / 2 + offsetY) || 0); --coords[1];
	ctx.lineTo(((coords[0] - coords[1]) * tileWidth / 2 + offsetX) || 0, ((coords[0] + coords[1]) * (tileHeight - 15 /* ground height */) / 2 + offsetY) || 0);
	ctx.stroke();
	
	ctx.drawImage(cursor, mouseX, mouseY);
	
	ctx.fillStyle    = '#fff';
	ctx.font         = '12px sans-serif';
	ctx.textBaseline = 'top';
	// Indicate that the mouse button is down.
	if (mRight) {
		ctx.fillText  ('Mouse down.', 20, 50);
		ctx.fillText  ('Down (x, y): (' + dx + ', '+ dy + ').', 20, 65);
	}
	else ctx.fillText  ('Mouse up.', 20, 50);
	
	ctx.fillText  ('Coordinates (x, y): (' + mouseX + ', '+ mouseY + ').', 20, 20);
	ctx.fillText  ('Offset (x, y): (' + offsetX + ', '+ offsetY + ').', 20, 35);
	ctx.fillText  ('Tile (x, y, ind): (' + (mTileX) + ', '+ (mTileY) + ', ' + ((mTileX >= 0) && (mTileX < m.width) && (mTileY >= 0) && (mTileY < m.height) ? m.cell[mTileY * m.width + mTileX] : 'NaN') + ').', 20, 80);
}

function drawSprites(m) {
	// Nothing yet.
}

function setToolTile(n) { toolTile = n; }

function setToolSize(n) { toolSize = n; }

function initMap(m) {
	for (var i = 0; i < m.width; i++) {  
		for (var j = 0; j < m.height; j++) {
			var x0 = Math.round(Math.random() * 18);
			var y0 = Math.round(Math.random() * 18);
			m.cellType[j * m.width + i] = 0;
		}  
	}  
	for (var i = 0; i < m.width; i++)   
		for (var j = 0; j < m.height; j++) {
			setGraphics(m, i, j, 15);
			m.z[j * m.width + i] = 0;
	}
	/*
	temp = JSON.parse("{\"width\":14,\"height\":14,\"cell\":[15,15,15,15,15,15,39,39,39,39,34,15,38,62,15,15,15,15,15,37,55,42,42,42,31,15,20,62,15,15,15,15,27,45,21,15,15,15,15,15,15,38,15,15,15,52,48,40,33,37,55,34,50,68,53,38,15,60,63,64,42,31,33,40,15,40,65,62,59,20,15,13,7,61,24,30,18,40,15,40,44,56,47,15,15,13,7,6,55,55,55,31,15,64,55,55,34,15,15,13,7,31,15,15,15,15,60,1,63,15,40,15,15,54,57,15,15,15,15,-2,54,25,57,15,40,15,15,15,60,66,66,63,27,21,15,15,15,15,40,15,15,15,13,16,16,7,42,39,55,55,55,55,31,15,15,15,54,25,25,57,24,18,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,39,null,null,null,null,null,null,null,null,null],\"z\":[0,0,0,0,0,0,106,91,76,61,46,0,0,-2,0,0,0,0,0,0,0,1,16,31,46,0,0,-2,0,0,0,0,-1,0,0,-1,-1,-1,-1,0,0,0,0,0,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,15,15,0,0,0,0,-2,-2,0,0,0,0,0,0,15,15,0,0,0,0,-2,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"cellType\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}");
	console.debug(temp);
	m.cell = temp.cell;
	m.z = temp.z;
	*/
	//var canvas = document.getElementById('map');
	
	offsetX = screen.width / 2 - tileWidth / 2;
	offsetY = screen.height / 2 - m.height / 2 * tileHeight;
}

function Map(w, h) {
	this.width = w;
	this.height = h;
	this.cell = new Array(this.width * this.height);
	this.z = new Array(this.width * this.height);
	this.cellType = new Array(this.width * this.height);
}
	
function setGraphics(map, x, y, value) {
	if (y * map.width + x < 0) return;
	if (y * map.width + x >= map.cell.length) return;
	
	map.cell[y * map.width + x] = value;
}

function isIn(item, list) {
	var it = list.length;
	while (it--) if (item == list[it]) return true;
	return false;
}

function resizeWindow() {
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
	
	for (var item in layers) {
		layers[item].resize(winW, winH);
	}
	
	$('.palette').height(winH - 10);
}

function init() {
	$('body').on('click', '.exportMap', function(e) {

		$('body').append('<div class="mapExport"><div class="close">Close</div><textarea type="textarea" rows="50" cols="100"/></div>');
		$('.mapExport textarea').val('[' + map.cell + ']');
		$('.mapExport').css( {
						top: $(window).height()/2 - $('.mapExport').height()/2 + 'px',
						left: $(window).width()/2 - $('.mapExport').width()/2 + 'px'
 					});
 
		$('body').on('click', '.mapExport .close', function(e) {
			$('.mapExport').remove();
		});

	});

	map = new Map(50, 50);
	initMap(map);
	
	addLayer( new Layer($('body'), 'map', function(map) { drawMap(map) } ) );
	addLayer( new Layer($('body'), 'sprites', function(map) { drawSprites(map) } ) );
	addLayer( new Layer($('body'), 'ui', function(map) { drawUI(map) } ) );
	
	// Attach controls to the topmost layer.
	var canvas = layers[layers.length - 1].canvas;
	
	initControls(canvas);
	$(canvas).focus();
	
	$('body').resize(resizeWindow);
	
	resizeWindow();
	doTimer();
}

function timedCount() {
	animate = true;
	for (var item in layers) if (layers[item].update) {
		layers[item].updateFunction(map);
		layers[item].update = false;
	}
	
	animate = false;
	t = setTimeout("timedCount()", 20);
}

function doTimer() {
	if (!timer_is_on) {
		timer_is_on = 1;
		timedCount();
	}
}
