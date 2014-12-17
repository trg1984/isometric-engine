IsoMap.prototype.imgList = [
	'bridgeEast.png'      ,'lotExitEast.png'   ,'treeConiferShort.png',
	'bridgeNorth.png'     ,'lotExitNorth.png'  ,'treeConiferTall.png',
	'crossroad.png'       ,'lotExitSouth.png'  ,'treeShort_autumn.png',
	'dirtHigh.png'        ,'lotExitWest.png'   ,'treeShort.png',
	'dirt.png'            ,'lotNorth.png'      ,'treeTall_autumn.png',
	'grass.png'           ,'lotPark.png'       ,'treeTall.png',
	'hillCornerEast.png'  ,'lot.png'           ,'waterBeachCornerEast.png',
	'hillCornerNW.png'    ,'lotSouth.png'      ,'waterBeachCornerNorth.png',
	'hillCornerSE.png'    ,'lotWest.png'       ,'waterBeachCornerSouth.png',
	'hillCornerWest.png'  ,'roadCornerES.png'  ,'waterBeachCornerWest.png',
	'hillEast.png'        ,'roadCornerNE.png'  ,'waterBeachEast.png',
	'hillNorth.png'       ,'roadCornerNW.png'  ,'waterBeachNorth.png',
	'hillRoadEast.png'    ,'roadCornerWS.png'  ,'waterBeachSouth.png',
	'hillRoadNorth.png'   ,'roadEast.png'      ,'waterBeachWest.png',
	'hillRoadSouth.png'   ,'roadEndEast.png'   ,'waterCornerEast.png',
	'hillRoadWest.png'    ,'roadEndNorth.png'  ,'waterCornerNorth.png',
	'hillSouth.png'       ,'roadEndSouth.png'  ,'waterCornerSouth.png',
	'hillWest.png'        ,'roadEndWest.png'   ,'waterCornerWest.png',
	'lotCornerEast.png'   ,'roadNorth.png'     ,'waterEast.png',
	'lotCornerNorth.png'  ,'roadTEast.png'     ,'waterNorth.png',
	'lotCornerSouth.png'  ,'roadTNorth.png'    ,'water.png',
	'lotCornerWest.png'   ,'roadTSouth.png'    ,'waterSouth.png',
	'lotEast.png'         ,'roadTWest.png'     ,'waterWest.png'
];


IsoMap.prototype.loadImages = function() {
	var self = this; 

	self.img = new Array();

	for (var item in self.imgList) {
		self.img[item] = new Image();
		self.img[item].isLoaded = false;
		self.img[item].onload = (function(current) { return function(ev) {
			self.img[current].isLoaded = true;
			//window.console.debug(img[current].src + ' is loaded.');
			$(self.img[current]).click(function() {self.currentTile = self.imgList.indexOf(self.img[current].src.substring(self.img[current].src.lastIndexOf('/') + 1)); });
			$('.palette .tiles').append(self.img[current]);
		}})(item);
		
		self.img[item].src = 'images/roadTiles_v2/png/' + self.imgList[item];
		// console.debug(img[item].src + ' added.');
	}
	self.cursor = new Image();
	self.bg = new Image();
	self.character = new Image(); 

	self.cursor.src = 'images/cursor.png';
	self.bg.src = 'images/clouds.jpg';

	self.character.src ='images/character.png'; //128x240 vertical
}

IsoMap.prototype.loadMapConfig = function() {

	var self = this;
 	self.mapConfig = {

 	0: { 
 		'img': this.img[0],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': false,
 		'exitToWest': false,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': false,
 		'enterFromWest': false
 	},
 	1: { 
 		'img': this.img[1],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	},

 	2: { 
 		'img': this.img[2],
 		'walkable': true,
 		'exitToNorth': false,
 		'exitToSouth': false,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': false,
 		'enterFromSouth': false,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	3: { 
 		'img': this.img[3],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	4: { 
 		'img': this.img[4],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	5: { 
 		'img': this.img[5],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	6: { 
 		'img': this.img[6],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	7: { 
 		'img': this.img[7],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	8: { 
 		'img': this.img[8],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	9: { 
 		'img': this.img[9],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	10: { 
 		'img': this.img[10],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	11: { 
 		'img': this.img[11],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	12: { 
 		'img': this.img[12],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	13: { 
 		'img': this.img[13],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	14: { 
 		'img': this.img[14],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	15: { 
 		'img': this.img[15],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	16: { 
 		'img': this.img[16],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	17: { 
 		'img': this.img[17],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	18: { 
 		'img': this.img[18],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	19: { 
 		'img': this.img[19],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	20: { 
 		'img': this.img[20],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	21: { 
 		'img': this.img[21],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	22: { 
 		'img': this.img[22],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	23: { 
 		'img': this.img[23],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	24: { 
 		'img': this.img[24],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	25: { 
 		'img': this.img[25],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	26: { 
 		'img': this.img[26],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	27: { 
 		'img': this.img[27],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 

 	28: { 
 		'img': this.img[28],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	29: { 
 		'img': this.img[29],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	30: { 
 		'img': this.img[30],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 	

 	31: { 
 		'img': this.img[31],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 

 	32: { 
 		'img': this.img[32],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	33: { 
 		'img': this.img[33],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	34: { 
 		'img': this.img[34],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	35: { 
 		'img': this.img[35],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': false,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': false
 	}, 
 	36: { 
 		'img': this.img[36],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	37: { 
 		'img': this.img[37],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	37: { 
 		'img': this.img[37],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	38: { 
 		'img': this.img[38],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': false,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': false,
 		'enterFromWest': true
 	}, 
 	39: { 
 		'img': this.img[39],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	40: { 
 		'img': this.img[40],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	41: { 
 		'img': this.img[41],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	42: { 
 		'img': this.img[42],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	43: { 
 		'img': this.img[43],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	44: { 
 		'img': this.img[44],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	45: { 
 		'img': this.img[45],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	45: { 
 		'img': this.img[45],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	46: { 
 		'img': this.img[46],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	47: { 
 		'img': this.img[47],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	48: { 
 		'img': this.img[48],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	49: { 
 		'img': this.img[49],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	50: { 
 		'img': this.img[50],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	51: { 
 		'img': this.img[51],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	52: { 
 		'img': this.img[52],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	53: { 
 		'img': this.img[53],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	54: { 
 		'img': this.img[54],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	55: { 
 		'img': this.img[55],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	56: { 
 		'img': this.img[56],
 		'walkable': true,
 		'exitToNorth': false,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': false,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	57: { 
 		'img': this.img[57],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	58: { 
 		'img': this.img[58],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	59: { 
 		'img': this.img[59],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': false,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': false
 	}, 

 	60: { 
 		'img': this.img[60],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 
 	61: { 
 		'img': this.img[61],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	},  	
 	62: { 
 		'img': this.img[62],
 		'walkable': false,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	},  	
 	63: { 
 		'img': this.img[63],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	},  	
 	64: { 
 		'img': this.img[64],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	},  	
 	65: { 
 		'img': this.img[65],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': false,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': false,
 		'enterFromWest': true
 	}, 
 
 	66: { 
 		'img': this.img[66],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 


 	67: { 
 		'img': this.img[67],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}, 

  	68: { 
 		'img': this.img[68],
 		'walkable': true,
 		'exitToNorth': true,
 		'exitToSouth': true,
 		'exitToEast': true,
 		'exitToWest': true,
 		'enterFromNorth': true,
 		'enterFromSouth': true,
 		'enterFromEast': true,
 		'enterFromWest': true
 	}
 };
}
