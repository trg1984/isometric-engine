var layers = [];
var layerNumToID = {};

function addLayer(layer) {
	layerNumToID[layer.id] = layers.length;
	layers.push( layer );
}

function Layer(parent, id, updateFunction) {
	var self = this;
	this.id = id;
	this.parent = parent;
	this.update = true;
	this.updateFunction = updateFunction;
	this.canvas = $(
		'<canvas\
			id = "' + id + '"\
			style="z-index: ' + layers.length + ';"\
			tabindex = "0"\
			oncontextmenu = "return false;"\
			class="layer"\
		>\
			HTML5 Canvas doesn\'t work in your browser. It is time to upgrade.\
		</canvas>'
	)[0];
	var ctx = this.canvas.getContext('2d'); 
	ctx.mozImageSmoothingEnabled = false;
	
	parent.append(this.canvas);
}

Layer.prototype.resize = function(wid, hei) {
	if ((this.canvas.width !== wid) || (this.canvas.height !== hei)) {
		this.canvas.width = wid;
		this.canvas.height = hei;
		this.canvas.attributes['width'] = wid;
		this.canvas.attributes['height'] = hei;
		this.update = true;
	}
}

function updateAllLayers() {
	for (var item in layers) layers[item].update = true;
}