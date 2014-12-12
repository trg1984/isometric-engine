

IsoMap.prototype.addLayer = function(layer) {
	var self = this;
	self.layerNumToID[layer.id] = self.layers.length;
	self.layers.push( layer );
}

function Layer(parent, id, updateFunction, layers) {
	var self = this;

	console.log("layers: ", layers);

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

IsoMap.prototype.updateAllLayers = function() {
	var self = this;
	for (var item in self.layers) self.layers[item].update = true;
}