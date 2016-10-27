function pr(x) {
	console.log(x);
}

var totalHeight = window.screen.availHeight;
var totalWidth = window.screen.availWidth;
pr(totalHeight);pr(totalWidth);
var canvas_3d = ['xy_canvas'];
var canvas_2d = ['xy_plane_canvas', 'yz_plane_canvas', 'zx_plane_canvas'];
for (index in canvas_3d) {
	elem = document.getElementById(canvas_3d[index]);
	var dimension = Math.floor(totalWidth * 0.4);
	elem.width = dimension;
	elem.height = dimension;
}
for (index in canvas_2d) {
	elem = document.getElementById(canvas_2d[index]);
	var dimension = Math.floor(totalWidth * 0.19);
	elem.width = dimension;
	elem.height = dimension;
}
