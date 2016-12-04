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

var slideraLX = new Slider('#ltx', {
	formatter: function(value) {
		return value;
	}
});

var slideraLX = new Slider('#lty', {
	formatter: function(value) {
		return value;
	}
});

var slideraLZ = new Slider('#ltz', {
	formatter: function(value) {
		return value;
	}
});



function setCanvasDimension(copyTo, copyFrom) {
	dimension = copyFrom.clientWidth;
	copyTo.width = dimension;
	copyTo.height = dimension;
}

elemXYZ_t = document.getElementById("xyz_canvas");
elemXYZ_f = elemXYZ_t.parentElement;
setCanvasDimension(elemXYZ_t, elemXYZ_f);



elemXY_t = document.getElementById("xy_canvas");
elemXY_F = elemXY_t.parentElement;
setCanvasDimension(elemXY_t, elemXY_F);

elemYZ_t = document.getElementById("yz_canvas");
elemYZ_F = elemYZ_t.parentElement;
setCanvasDimension(elemYZ_t, elemYZ_F);

elemZX_t = document.getElementById("zx_canvas");
elemZX_F = elemZX_t.parentElement;
setCanvasDimension(elemZX_t, elemZX_F);

w3IncludeHTML();