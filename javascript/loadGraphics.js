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
			$(self.img[current]).click(function() {self.currentTile = self.imgList.indexOf(img[current].src.substring(img[current].src.lastIndexOf('/') + 1)); });
			$('.palette .tiles').append(self.img[current]);
		}})(item);
		
		self.img[item].src = 'images/roadTiles_v2/png/' + self.imgList[item];
		// console.debug(img[item].src + ' added.');
	}
	self.cursor = new Image();
	self.bg = new Image();

	self.cursor.src = 'images/cursor.png';
	self.bg.src = 'images/clouds.jpg';
}
