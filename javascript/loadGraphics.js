var imgList = [
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

var img = new Array();
for (var item in imgList) {
	img[item] = new Image();
	img[item].isLoaded = false;
	img[item].onload = (function(current) { return function(ev) {
		img[current].isLoaded = true;
		//window.console.debug(img[current].src + ' is loaded.');
		$(img[current]).click(function() {currentTile = imgList.indexOf(img[current].src.substring(img[current].src.lastIndexOf('/') + 1)); });
		$('.palette .tiles').append(img[current]);
	}})(item);
	
	img[item].src = 'images/roadTiles_v2/png/' + imgList[item];
	//console.debug(img[item].src + ' added.');
}
var cursor = new Image();
var bg = new Image();

cursor.src = 'images/cursor.png';
bg.src = 'images/clouds.jpg';