var sliderAX = new Slider('#ax', {
	formatter: function(value) {
		return value;
	}
});

var slideraLX = new Slider('#lx', {
	formatter: function(value) {
		return value;
	}
});

var sliderAY = new Slider('#ay', {
	formatter: function(value) {
		return value;
	}
});

var slideraLX = new Slider('#ly', {
	formatter: function(value) {
		return value;
	}
});

var sliderAZ = new Slider('#az', {
	formatter: function(value) {
		return value;
	}
});

var slideraLZ = new Slider('#lz', {
	formatter: function(value) {
		return value;
	}
});

function setCanvasHnW(canvasId) {
	elem = document.getElementById(canvasId);
	dimension = elem.parentElement.clientWidth;
	//dimention = Math.min(calculateAvailableheight(offsetSectionClass), dimension);
	elem.width = dimension;
	elem.height = dimension;
}

setCanvasHnW("xyz_canvas");