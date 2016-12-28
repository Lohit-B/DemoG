function setCanvasDimension(copyTo, copyFrom) {
  var totalWidth = copyFrom.clientWidth;
  var totalHeight = window.innerHeight*0.9;
  var ratio = totalHeight/totalWidth;
  copyTo.height = ratio > 1 ? totalWidth : totalHeight
  copyTo.width = totalWidth;
}
elem_to = document.getElementById("friction_canvas");
elem_from = elem_to.parentElement;
setCanvasDimension(elem_to, elem_from);

var face_colors = function(alpha=200) {
	return [
	 	0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,

		0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,
		0,  51, 102, alpha,

		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,

		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,
		0,  51, 10, alpha,

		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,

		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,
		0,  5, 102, alpha,

  		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,

		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,
		2,  2, 2, alpha,

		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,

		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,
		20,  51, 100, alpha,

		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,

		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,
		2,  2, 200, alpha,
		
		2,  2, 2, alpha,
		2,  2, 2, alpha,
  	];
}

var face_points = function(offset=1.6, offset_u=4) {
	return [
    	-1,-1,1,offset,
    	1,-1,1,offset,
    	-1,0,1,offset,
    	-1,0,1,offset,
    	1,0,1,offset,
    	1,-1,1,offset,

    	-1,-1,-1,offset,
    	1,-1,-1,offset,
    	-1,0,-1,offset,
    	-1,0,-1,offset,
    	1,0,-1,offset,
    	1,-1,-1,offset,

    	-1,-1,-1,offset,
    	1,-1,-1,offset,
    	-1,-1,1,offset,
    	-1,-1,1,offset,
    	1,-1,1,offset,
    	1,-1,-1,offset,

    	-1,0,-1,offset,
    	1,0,-1,offset,
    	-1,0,1,offset,
    	-1,0,1,offset,
    	1,0,1,offset,
    	1,0,-1,offset,

    	-1,-1,-1,offset,
    	-1,-1,1,offset,
    	-1,0,-1,offset,
    	-1,0,-1,offset,
    	-1,0,1,offset,
    	-1,-1,1,offset,

    	1,-1,-1,offset,
    	1,-1,1,offset,
    	1,0,-1,offset,
    	1,0,-1,offset,
    	1,0,1,offset,
    	1,-1,1,offset,

		//uper block
    	-1,0,1,offset_u,
    	1,0,1,offset_u,
    	-1,1,1,offset_u,
    	-1,1,1,offset_u,
    	1,1,1,offset_u,
    	1,0,1,offset_u,

    	-1,0,-1,offset_u,
    	1,0,-1,offset_u,
    	-1,1,-1,offset_u,
    	-1,1,-1,offset_u,
    	1,1,-1,offset_u,
    	1,0,-1,offset_u,

    	-1,0,-1,offset_u,
    	1,0,-1,offset_u,
    	-1,0,1,offset_u,
    	-1,0,1,offset_u,
    	1,0,1,offset_u,
    	1,0,-1,offset_u,

    	-1,1,-1,offset_u,
    	1,1,-1,offset_u,
    	-1,1,1,offset_u,
    	-1,1,1,offset_u,
    	1,1,1,offset_u,
    	1,1,-1,offset_u,

    	-1,0,-1,offset_u,
    	-1,0,1,offset_u,
    	-1,1,-1,offset_u,
    	-1,1,-1,offset_u,
    	-1,1,1,offset_u,
    	-1,0,1,offset_u,

    	1,0,-1,offset_u,
    	1,0,1,offset_u,
    	1,1,-1,offset_u,
    	1,1,-1,offset_u,
    	1,1,1,offset_u,
    	1,0,1,offset_u,

    	//line
    	1,0.5,0,offset_u,
    	0.8*offset_u,0.5,0,offset_u
    ];
}

var vertCode = function() {
	return 'attribute vec4 position;'+
			'attribute vec4 a_color;'+
			'uniform mat4 rotation;'+
			'uniform mat4 u_translation;'+
			'varying vec4 v_color;'+
            'void main() {'+
            	'if(position.w < 2.0) {'+
            		'gl_Position = rotation*vec4(position.x/position.w, position.y/position.w +0.3, position.z/position.w, 1);'+
            	'} else {'+
            		'gl_Position = rotation*u_translation*vec4(position.x/position.w, position.y/position.w+0.3, position.z/position.w, 1);'+
            	'}'+
               	'v_color = a_color;'+
           	'}';
}

var fragCode = function() {
	return 'precision mediump float;'+
			'varying vec4 v_color;'+
			'void main() {'+
		 		'gl_FragColor = vec4(v_color);'+
			'}';
}

var global_context;
var global_program;

function setBlocks() {
	var element = document.getElementById("friction_canvas");
	var context = element.getContext("experimental-webgl");
	var shaderProgram = context.createProgram();
	
	var vertShader = context.createShader(context.VERTEX_SHADER);
	var fragShader = context.createShader(context.FRAGMENT_SHADER);
	
	context.shaderSource(vertShader, vertCode());
	context.compileShader(vertShader);

	context.shaderSource(fragShader, fragCode());
	context.compileShader(fragShader);

	context.attachShader(shaderProgram, vertShader);
    context.attachShader(shaderProgram, fragShader);
    context.linkProgram(shaderProgram);
    context.useProgram(shaderProgram);

  	//buffer faces
  	var vertex_buffer = context.createBuffer();
	context.bindBuffer(context.ARRAY_BUFFER, vertex_buffer);
	context.bufferData(context.ARRAY_BUFFER, new Float32Array(face_points()), context.STATIC_DRAW);
	var positionLocation = context.getAttribLocation(shaderProgram, "position");
	context.enableVertexAttribArray(positionLocation);
	context.vertexAttribPointer(positionLocation, 4, context.FLOAT, false, 0, 0);

	//buffer colors
	var color_buffer = context.createBuffer();
	context.bindBuffer(context.ARRAY_BUFFER, color_buffer);
	context.bufferData(context.ARRAY_BUFFER, new Uint8Array(face_colors()), context.STATIC_DRAW);
	var colorLocation = context.getAttribLocation(shaderProgram, "a_color");
	context.enableVertexAttribArray(colorLocation);
	context.vertexAttribPointer(colorLocation, 4, context.UNSIGNED_BYTE, true, 0, 0);
	global_program = shaderProgram;
	global_context = context;
}

setBlocks();

var draw = function(translation = I()) {
	projection = matrixMultiply(makeYRotation(0.5),makeZRotation(-0.5));

	global_context.uniformMatrix4fv(global_context.getUniformLocation(global_program, "rotation"), false, projection);
	global_context.uniformMatrix4fv(global_context.getUniformLocation(global_program, "u_translation"), false, translation);
	//clear and draw
	global_context.clear(global_context.COLOR_BUFFER_BIT | global_context.DEPTH_BUFFER_BIT);
	global_context.enable(global_context.DEPTH_TEST);
	//global_context.blendFunc(global_context.SRC_COLOR, global_context.ONE_MINUS_SRC_ALPHA);
	//global_context.enable(global_context.BLEND);

	global_context.drawArrays(global_context.TRIANGLES, 0, 72);
	global_context.drawArrays(global_context.LINES, 72, 2);
}


