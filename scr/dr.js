var canvas = document.getElementById("xy_canvas");
var gl = canvas.getContext("experimental-webgl", { alpha: false });
var shaderTypeVertex = 'vertex';
var shaderTypeFragment = 'fragment';

var p = function(value) {
	console.log(value);
}
var vertCode = 'attribute vec4 position;'+
				'attribute vec4 a_color;'+
				'uniform mat4 rotationX;'+
				'uniform mat4 rotationY;'+
				'uniform mat4 rotationZ;'+
				'uniform mat4 rotationXL;'+
				'uniform mat4 rotationYL;'+
				'uniform mat4 rotationZL;'+
				'varying vec4 v_color;'+
            'void main() {'+
            	'if(position.w> 0.0) {'+
            		'gl_Position = rotationX*rotationY*rotationZ*rotationXL*rotationYL*rotationZL*vec4(position.xyz, 1.0);'+
            	'} else {'+
               		'gl_Position = rotationX*rotationY*rotationZ*vec4(position.xyz, 1.0);'+
               	'}'+
               ' v_color = a_color;'+
           ' }';

var fragCode = 	'precision mediump float;'+
				'varying vec4 v_color;'+
				'void main() {'+
 		 		'gl_FragColor = v_color;'+
	'}';

var getContext = function(doc_id) {
	var plane = document.getElementById(doc_id);
	var xy = plane.getContext("experimental-webgl");
	return xy;
}

var compileCode = function(context, shader, code) {
	context.shaderSource(shader, code);
	context.compileShader(shader);
	return shader;
}

var getShader = function(context, type) {
	if(type === shaderTypeVertex) {
		return context.createShader(context.VERTEX_SHADER);
	} else if(type === shaderTypeFragment){
		return context.createShader(context.FRAGMENT_SHADER);
	}
}

var programSetup = function(context, shaderprogram, vertCode, fragCode) {
	var vertShader = compileCode(context, getShader(context, shaderTypeVertex), vertCode);
	var fragShader = compileCode(context, getShader(context, shaderTypeFragment), fragCode);
    context.attachShader(shaderprogram, vertShader);
    context.attachShader(shaderprogram, fragShader);
    context.linkProgram(shaderprogram);
    context.useProgram(shaderprogram);
}

var drawLineAndTriangle = function(context, triangleStartIndex, triangleCount, lineStartIndex, lineCount) {
	context.drawArrays(context.TRIANGLES, triangleStartIndex, triangleCount);
	context.drawArrays(context.LINES, lineStartIndex, lineCount);
}

var gl = getContext('xy_canvas');
var shaderprogram = gl.createProgram();
programSetup(gl, shaderprogram, vertCode, fragCode);
var vertices = [-1,-1,0,0,
				 -1,1,0,0, 
				 1,-1,0,0, 
				 -1,1,0,0,
				 1,-1,0,0, 
				 1,1,0,0,
				 0,-1,-1,0,
				 0,-1,1,0,
				 0,1,-1,0,
				 0,-1,1,0,
				 0,1,-1,0, 
				 0,1,1,0,
				-1,0,-1,0, 
				-1,0,1,0,
				 1,0,-1,0, 
				-1,0,1,0,
				 1,0,-1,0, 
				 1,0,1,0,
				-1/3,-1/3,1/3,1, 
				1,1,1,1];
var vertex_buffer = gl.createBuffer ();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
var positionLocation = gl.getAttribLocation(shaderprogram, "position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);
//gl.enable(gl.DEPTH_TEST);

var colorLocation = gl.getAttribLocation(shaderprogram, "a_color");
  // Create a buffer for colors.
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(colorLocation);
 
  // We'll supply RGB as bytes.
  gl.vertexAttribPointer(colorLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);
 
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Uint8Array([
          // left column front
        51,  25, 0,
        51,  25, 0,
        51,  25, 0,
        51,  25, 0,
        51,  25, 0,
        51,  25, 0,

        0,  51, 102,
        0,  51, 102,
        0,  51, 102,
        0,  51, 102,
        0,  51, 102,
        0,  51, 102,

        128, 128, 128,
        128, 128, 128,
        128, 128, 128,
        128, 128, 128,
        128, 128, 128,
        128, 128, 128,

        255,  0, 0,
        255,  0, 0]),
      gl.STATIC_DRAW);
// var color = gl.getUniformLocation(shaderprogram, "u_color");
//  gl.uniform3fv(color, [0.33, 0.34, 0.39]);

var vertCodeXYZ = 'attribute vec3 position;'+
				'attribute vec4 a_color;'+
				'uniform mat4 rotationXL;'+
				'uniform mat4 rotationYL;'+
				'uniform mat4 rotationZL;'+
				'varying vec4 v_color;'+
            'void main(void) {'+
            	'if(position.z > 0.0){'+
            		'gl_Position =  rotationXL*rotationYL*rotationZL*vec4(position.xy, 0, 1.0);'+
            	'} else {'+
              		'gl_Position =  vec4(position.xy, 0, 1.0);'+
              	'}'+
               'v_color = a_color;'+

           ' }';

var fragCodeXYZ =	'precision mediump float;'+
				'varying vec4 v_color;'+
				'void main() {'+
 		 		'gl_FragColor =v_color;'+
	'}';

var getUpdatedContext = function (xy, program_plan, vertCode, fragCode, color, vertices) {
	programSetup(xy, program_plan, vertCodeXYZ, fragCodeXYZ);
	var plan_vertex_buffer = xy.createBuffer();
	xy.bindBuffer(xy.ARRAY_BUFFER, plan_vertex_buffer);
	xy.bufferData(xy.ARRAY_BUFFER, new Float32Array(vertices), xy.STATIC_DRAW);
	var positionL= xy.getAttribLocation(program_plan, "position");
	xy.enableVertexAttribArray(positionL);
	xy.vertexAttribPointer(positionL, 3, xy.FLOAT, false, 0, 0);
	var colorLocation = xy.getAttribLocation(program_plan, "a_color");
	var buffer = xy.createBuffer();
	xy.bindBuffer(xy.ARRAY_BUFFER, buffer);
	xy.enableVertexAttribArray(colorLocation);

	// We'll supply RGB as bytes.
	xy.vertexAttribPointer(colorLocation, 3, xy.UNSIGNED_BYTE, true, 0, 0);

	xy.bufferData(
	  xy.ARRAY_BUFFER,
	  new Uint8Array(color), xy.STATIC_DRAW);
	return xy;
}

var xyzPrograms = [null, null, null];
var verticesPlan = [-1,-1,0, -1,1,0, 1,-1,0, -1,1,0, 1,-1,0, 1,1,0, 1,0,0, -1,0,0, 0,1,0, 0,-1,0];
var lineCoordinateStart = 18*4;

var zxContext = getContext('zx_plan_canvas');
var zxProgram = zxContext.createProgram();
xyzPrograms[2] = zxProgram;
zxContext = getUpdatedContext(zxContext, zxProgram, vertCodeXYZ, fragCodeXYZ, [
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,
											255,  255, 255,
											255,  255, 255,
											255,  255, 255,
											255,  255, 255,
											255,0,0,
											255,0,0
										], verticesPlan.concat([vertices[lineCoordinateStart], 
																vertices[lineCoordinateStart+2],1,
																vertices[lineCoordinateStart+4],
																vertices[lineCoordinateStart+6],1])
							);
							
zxContext.drawArrays(zxContext.TRIANGLES, 0, 6);
//zxContext.drawArrays(zxContext.LINES, 6, 6);

var yzContext = getContext('yz_plan_canvas');
var yzProgram = yzContext.createProgram();
xyzPrograms[1] = yzProgram;
var yzContext = getUpdatedContext(yzContext, yzProgram, vertCodeXYZ, fragCodeXYZ, [
											0,  51, 102,
											0,  51, 102,
											0,  51, 102,
											0,  51, 102,
											0,  51, 102,
											0,  51, 102,
											255,  255, 255,
											255,  255, 255,
											255,  255, 255,
											255,  255, 255,
											255,0,0,
											255,0,0
										], verticesPlan.concat([vertices[lineCoordinateStart+1], 
																vertices[lineCoordinateStart+2],1,
																vertices[lineCoordinateStart+5],
																vertices[lineCoordinateStart+6],1])
							);
yzContext.drawArrays(yzContext.TRIANGLES, 0, 6);
//yzContext.drawArrays(yzContext.LINES, 6, 6);


var xyContext = getContext('xy_plan_canvas');
var xyProgram = xyContext.createProgram();
xyzPrograms[0] = xyProgram;
var xyContext = getUpdatedContext(xyContext, xyProgram, vertCodeXYZ, fragCodeXYZ, [
											51,  25, 0,
											51,  25, 0,
											51,  25, 0,
											51,  25, 0,
											51,  25, 0,
											51,  25, 0, 
											255,  255, 255,
											255,  255, 255,
											255,  255, 255,
											255,  255, 255,
											255,0,0,
											255,0,0

										],verticesPlan.concat([vertices[lineCoordinateStart],
																vertices[lineCoordinateStart+1],1,
																vertices[lineCoordinateStart+4],
																vertices[lineCoordinateStart+5],1])
							);

xyContext.drawArrays(xyContext.TRIANGLES, 0, 6);
//xyContext.drawArrays(xyContext.LINES, 6, 6);

function make2DProjection(width, height, depth) {
  // Note: This matrix flips the Y axis so 0 is at the top.
  return [
     2 / width, 0, 0, 0,
     0, -2 / height, 0, 0,
     0, 0, 2 / depth, 0,
    -1, 1, 0, 1,
  ];
}

function makeXRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ];
};

function makeYRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
  ];
};

function makeZRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);
  return [
     c, s, 0, 0,
    -s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1,
  ];
}

var rotate = function(context, program, rotations) {
	//context.enable(gl.DEPTH_TEST);
	var rotationX = makeXRotation(rotations[0]*Math.PI/180);
	var rotationY = makeYRotation(rotations[1]*Math.PI/180);
	var rotationZ = makeZRotation(rotations[2]*Math.PI/180);
	context.uniformMatrix4fv(context.getUniformLocation(program, 'rotationX'),false,rotationX);
	context.uniformMatrix4fv(context.getUniformLocation(program, 'rotationY'),false,rotationY);
	context.uniformMatrix4fv(context.getUniformLocation(program, 'rotationZ'),false,rotationZ);   
}

var setUniformMatrix = function(context, program, lineRotation) {
	////context.enable(gl.DEPTH_TEST);
	var rotationX = makeXRotation(lineRotation[0]*Math.PI/180);
	var rotationY = makeYRotation(lineRotation[1]*Math.PI/180);
	var rotationZ = makeZRotation(lineRotation[2]*Math.PI/180);
	context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
	context.uniformMatrix4fv(context.getUniformLocation(program, 'rotationXL'),false,rotationX);
	context.uniformMatrix4fv(context.getUniformLocation(program, 'rotationYL'),false,rotationY);
	context.uniformMatrix4fv(context.getUniformLocation(program, 'rotationZL'),false,rotationZ);
}

var rotation = {};
rotation.axis = [0,0,0];
rotation.line = [0,0,0];

$('#rot').slider({
	formatter: function(value) {
		rotation.axis[2] = value;
		rotate(gl, shaderprogram, rotation.axis);
		drawLineAndTriangle(gl, 0, 18, 18, 2);
	} 
});

$('#ver').slider({
	formatter: function(value) {
		rotation.axis[1] = value;
		rotate(gl, shaderprogram, rotation.axis);
		drawLineAndTriangle(gl, 0, 18, 18, 2);
	} 
});

$('#hor').slider({
	formatter: function(value) {
		rotation.axis[0] = value;
		rotate(gl, shaderprogram, rotation.axis);
		drawLineAndTriangle(gl, 0, 18, 18, 2);
	} 
});

$('#line_rot').slider({
	formatter: function(value) {
		var lineRotation = [value, value, value];
		setUniformMatrix(gl, shaderprogram, lineRotation);		
		setUniformMatrix(xyContext, xyzPrograms[0], lineRotation);
		setUniformMatrix(yzContext, xyzPrograms[1], lineRotation);
		setUniformMatrix(zxContext, xyzPrograms[2], lineRotation);

		//gl.blendFunc(gl.SRC_ALPHA, gl.ZERO);
          //gl.enable(gl.BLEND);
         gl.enable(gl.DEPTH_TEST);
             gl.uniform1f(shaderprogram.alphaUniform, parseFloat(1));
		drawLineAndTriangle(gl, 0, 18, 18, 2);
		drawLineAndTriangle(xyContext, 0, 6, 6, 6);
		drawLineAndTriangle(yzContext, 0, 6, 6, 6);
		drawLineAndTriangle(zxContext, 0, 6, 6, 6);
	} 
});


