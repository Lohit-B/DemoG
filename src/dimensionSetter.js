function pr(x) {
	console.log(x);
}

var totalHeight = window.screen.availHeight;
var totalWidth = window.screen.availWidth;
var first_half = 0.4;
var second_half = 0.195;
var canvas_3d = ['xy_canvas'];
var canvas_2d = ['xy_plane_canvas', 'yz_plane_canvas', 'zx_plane_canvas'];
var canvas_div_class = 'canvas_div'; 
for (index in canvas_3d) {
	elem = document.getElementById(canvas_3d[index]);
	var dimension = Math.floor(totalWidth * first_half);
	elem.width = dimension;
	elem.height = dimension;
}
for (index in canvas_2d) {
	elem = document.getElementById(canvas_2d[index]);
	var dimension = Math.floor(totalWidth * second_half);
	elem.width = dimension;
	elem.height = dimension;
}

// elems = document.getElementsByClassName(canvas_div_class);
// pr(elem);
// for (i in elems) {
// 	elem = elems[i];
// 	elem.width = Math.floor(totalWidth * second_half);
// 	elem.display='inline';
// }


