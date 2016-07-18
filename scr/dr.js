var canvas = document.getElementById("xy_canvas");
var gl = canvas.getContext("experimental-webgl");
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
            		'gl_Position = rotationXL*rotationYL*rotationZL*rotationX*rotationY*rotationZ*vec4(position.xyz, 1.0);'+
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
gl.enable(gl.DEPTH_TEST);

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

var vertCodeXYZ = 'attribute vec2 position;'+
					'attribute vec4 a_color;'+
					'varying vec4 v_color;'+
            'void main(void) {'+
               'gl_Position =  vec4(position, 0, 1.0);'+
               'v_color = a_color;'+

           ' }';

var fragCodePlan =	'precision mediump float;'+
				'varying vec4 v_color;'+
				'void main() {'+
 		 		'gl_FragColor =v_color;'+
	'}';

var getContext = function (doc_id, vertCode, fragCode, color, vertices) {
var plan = document.getElementById(doc_id);
var xy = plan.getContext("experimental-webgl");
var program_plan = xy.createProgram();
programSetup(xy, program_plan, vertCodeXYZ, fragCodePlan);
var plan_vertex_buffer = xy.createBuffer();
xy.bindBuffer(xy.ARRAY_BUFFER, plan_vertex_buffer);
xy.bufferData(xy.ARRAY_BUFFER, new Float32Array(vertices), xy.STATIC_DRAW);
var positionL= xy.getAttribLocation(program_plan, "position");
xy.enableVertexAttribArray(positionL);
xy.vertexAttribPointer(positionL, 2, xy.FLOAT, false, 0, 0);
var colorLocation = xy.getAttribLocation(program_plan, "a_color");
// Create a buffer for colors.
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

var verticesPlan = [-1,-1, -1,1, 1,-1, -1,1, 1,-1, 1,1, 1,0, -1,0, 0,1, 0,-1];
var lineCoordinateStart = 18*4;
var zxContext = getContext('zx_plan_canvas', vertCodeXYZ, fragCodePlan, [
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
																				 vertices[lineCoordinateStart+2],
																				 vertices[lineCoordinateStart+4],
																				 vertices[lineCoordinateStart+6]
																				 ]
																	)
							);
							
zxContext.drawArrays(zxContext.TRIANGLES, 0, 6);
zxContext.drawArrays(zxContext.LINES, 6, 6);

var yzContext = getContext('yz_plan_canvas', vertCodeXYZ, fragCodePlan, [
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
																				 vertices[lineCoordinateStart+2],
																				 vertices[lineCoordinateStart+5],
																				 vertices[lineCoordinateStart+6]
																				 ]
																	)
							);
yzContext.drawArrays(yzContext.TRIANGLES, 0, 6);
yzContext.drawArrays(yzContext.LINES, 6, 6);


var xyContext = getContext('xy_plan_canvas', vertCodeXYZ, fragCodePlan, [
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
																				 vertices[lineCoordinateStart+1],
																				 vertices[lineCoordinateStart+4],
																				 vertices[lineCoordinateStart+5]
																				 ]
																	)
							);

xyContext.drawArrays(xyContext.TRIANGLES, 0, 6);
xyContext.drawArrays(xyContext.LINES, 6, 6);

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

var rotation = [45,45,45]

var rotate = function(gl, shaderprogram, allRotation) {
	var rotationX = makeXRotation(allRotation[0]*Math.PI/180);
	var rotationY = makeYRotation(allRotation[1]*Math.PI/180);
	var rotationZ = makeZRotation(allRotation[2]*Math.PI/180);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.uniformMatrix4fv(gl.getUniformLocation(shaderprogram, 'rotationX'),false,rotationX);
	gl.uniformMatrix4fv(gl.getUniformLocation(shaderprogram, 'rotationY'),false,rotationY);
	gl.uniformMatrix4fv(gl.getUniformLocation(shaderprogram, 'rotationZ'),false,rotationZ);
    
}

$('#rot').slider({
	formatter: function(value) {
		rotation[2] = value;
		rotate(gl, shaderprogram, rotation);
		gl.drawArrays(gl.TRIANGLES, 0, 18);
		gl.drawArrays(gl.LINES, 18, 2);
	} 
});

$('#ver').slider({
	formatter: function(value) {
		rotation[1] = value;
		rotate(gl, shaderprogram, rotation);
		gl.drawArrays(gl.TRIANGLES, 0, 18);
		gl.drawArrays(gl.LINES, 18, 2);
	} 
});

$('#hor').slider({
	formatter: function(value) {
		rotation[0] = value;
		rotate(gl, shaderprogram, rotation);
		gl.drawArrays(gl.TRIANGLES, 0, 18);
		gl.drawArrays(gl.LINES, 18, 2);
	} 
});

$('#line_rot').slider({
	formatter: function(value) {
		lineRotation = [value, value, value];
		rotate(gl, shaderprogram, rotation);
		var rotationX = makeXRotation(lineRotation[0]*Math.PI/180);
		var rotationY = makeYRotation(lineRotation[1]*Math.PI/180);
		var rotationZ = makeZRotation(lineRotation[2]*Math.PI/180);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.uniformMatrix4fv(gl.getUniformLocation(shaderprogram, 'rotationXL'),false,rotationX);
		gl.uniformMatrix4fv(gl.getUniformLocation(shaderprogram, 'rotationYL'),false,rotationY);
		gl.uniformMatrix4fv(gl.getUniformLocation(shaderprogram, 'rotationZL'),false,rotationZ);
		gl.drawArrays(gl.TRIANGLES, 0, 18);
		gl.drawArrays(gl.LINES, 18, 2);
	} 
});


