var canvas = document.getElementById("xy_canvas");
var gl = canvas.getContext("experimental-webgl");
var shaderTypeVertex = 'vertex';
var shaderTypeFragment = 'fragment';

var p = function(value) {
	console.log(value);
}
var vertCode = 'attribute vec4 position;'+
				'attribute vec4 a_color;'+
				'uniform mat4 transformation_axis;'+
				'uniform mat4 transformation_line;'+
				'varying vec4 v_color;'+
            'void main() {'+
            	'if(position.w> 0.0) {'+
            		'gl_Position = transformation_line*vec4(position.xyz, 1.42);'+
            	'} else {'+
               		'gl_Position = transformation_axis*vec4(position.xyz, 1.42);'+
               	'}'+
               ' v_color = a_color;'+
           ' }';

var fragCode = 	'precision mediump float;'+
				'varying vec4 v_color;'+
				'void main() {'+
 		 		'gl_FragColor = vec4(v_color);'+
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
	context.drawArrays(context.LINES, lineStartIndex, lineCount);
	context.drawArrays(context.TRIANGLES, triangleStartIndex, triangleCount);
}

var gl = getContext('xy_canvas');
var shaderprogram = gl.createProgram();
programSetup(gl, shaderprogram, vertCode, fragCode);
var vertices = [
				 1,1,1,1,
				-1,0,0,1,
				-1.42,0,0,0,
				1.42,0,0,0,
				0,-1.42,0,0,
				0,1.42,0,0,
				0,0,-1.42,0,
				0,0,1.42,0,
				-1,-1,0,0,
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
				 1,0,1,0
				];
var vertex_buffer = gl.createBuffer ();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
var positionLocation = gl.getAttribLocation(shaderprogram, "position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);

var colorLocation = gl.getAttribLocation(shaderprogram, "a_color");
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAttribArray(colorLocation);
 
gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, true, 0, 0);
var plane_alpha = 200;
var axis_alpha = 250;
var line_alpha = 250;
gl.bufferData(
	gl.ARRAY_BUFFER
    ,new Uint8Array([
    	255,  0, 0, line_alpha,
        0,  250, 0, line_alpha,

		2,  2, 2, axis_alpha,
		2,  2, 2, axis_alpha,
		2,  2, 2, axis_alpha,
		2,  2, 2, axis_alpha,
		2,  2, 2, axis_alpha,
		2,  2, 2, axis_alpha,

        0,  51, 102, plane_alpha,
        0,  51, 102, plane_alpha,
        0,  51, 102, plane_alpha,
        0,  51, 102, plane_alpha,
        0,  51, 102, plane_alpha,
        0,  51, 102, plane_alpha,

        0, 70, 100, plane_alpha,
        0, 70, 100, plane_alpha,
        0, 70, 100, plane_alpha,
        0, 70, 100, plane_alpha,
        0, 70, 100, plane_alpha,
        0, 70, 100, plane_alpha,

        128, 128, 128, plane_alpha,
        128, 128, 128, plane_alpha,
        128, 128, 128, plane_alpha,
        128, 128, 128, plane_alpha,
        128, 128, 128, plane_alpha,
        128, 128, 128, plane_alpha,

        128, 128, 128, plane_alpha,
        128, 128, 128, plane_alpha])
	,gl.STATIC_DRAW
);

gl.enable(gl.DEPTH_TEST);
gl.blendFunc(gl.SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
gl.enable(gl.BLEND);

var vertCodeXYZ = 'attribute vec4 position;'+
				'attribute vec4 a_color;'+
				'uniform mat4 transformation;'+
				'varying vec4 v_color;'+
            'void main(void) {'+
            	'if(position.w > 0.0){'+
            		'gl_Position =  transformation*vec4(position.xyz, 1.05);'+
            	'} else {'+
              		'gl_Position =  vec4(position.xy, 0, 1.05);'+
              	'}'+
               'v_color = a_color;'+
           ' }';

var fragCodeXYZ =	'precision mediump float;'+
				'varying vec4 v_color;'+
				'void main() {'+
 		 		'gl_FragColor =v_color;'+
	'}';

var getUpdatedContext = function (xy, program_plane, vertCode, fragCode, color, vertices) {
	programSetup(xy, program_plane, vertCodeXYZ, fragCodeXYZ);
	var plane_vertex_buffer = xy.createBuffer();
	xy.bindBuffer(xy.ARRAY_BUFFER, plane_vertex_buffer);
	xy.bufferData(xy.ARRAY_BUFFER, new Float32Array(vertices), xy.STATIC_DRAW);
	var positionL= xy.getAttribLocation(program_plane, "position");
	xy.enableVertexAttribArray(positionL);
	xy.vertexAttribPointer(positionL, 4, xy.FLOAT, false, 0, 0);
	var colorLocation = xy.getAttribLocation(program_plane, "a_color");
	var buffer = xy.createBuffer();
	xy.bindBuffer(xy.ARRAY_BUFFER, buffer);
	xy.enableVertexAttribArray(colorLocation);

	// We'll supply RGB as bytes.
	xy.vertexAttribPointer(colorLocation, 3, xy.UNSIGNED_BYTE, true, 0, 0);

	xy.bufferData(xy.ARRAY_BUFFER, new Uint8Array(color), xy.STATIC_DRAW);
	return xy;
}

var xyzPrograms = [null, null, null];
var verticesPlane = [-1,-1,0,0, -1,1,0,0, 1,-1,0,0, -1,1,0,0, 1,-1,0,0, 1,1,0,0, 1,0,0,0, -1,0,0,0, 0,1,0,0, 0,-1,0,0];
var lineCoordinateStart = 0;

var zxContext = getContext('zx_plane_canvas');
var zxProgram = zxContext.createProgram();
zxContext = getUpdatedContext(zxContext, zxProgram, vertCodeXYZ, fragCodeXYZ, [
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,
											128, 128, 128,

											255, 255, 255,
											255, 255, 255,
											255, 255, 255,
											255, 255, 255,
											
											255,0,0,
											0,255,0
										], verticesPlane.concat([vertices[lineCoordinateStart], 
																vertices[lineCoordinateStart+2],vertices[lineCoordinateStart+1],1,
																vertices[lineCoordinateStart+4],
																vertices[lineCoordinateStart+6],vertices[lineCoordinateStart+5],1])
							);

xyzPrograms[2] = zxProgram;
zxContext.drawArrays(zxContext.TRIANGLES, 0, 6);
zxContext.drawArrays(zxContext.LINES, 6, 4);

var yzContext = getContext('yz_plane_canvas');
var yzProgram = yzContext.createProgram();
var yzContext = getUpdatedContext(yzContext, yzProgram, vertCodeXYZ, fragCodeXYZ, [
											75,  95, 110,
											75,  95, 110,
											75,  95, 110,
											75,  95, 110,
											75,  95, 110,
											75,  95, 110,

											255, 255, 255,
											255, 255, 255,
											255, 255, 255,
											255, 255, 255,

											255,0,0,
											0,255,0
										], verticesPlane.concat([vertices[lineCoordinateStart+1], 
																vertices[lineCoordinateStart+2],vertices[lineCoordinateStart],1,
																vertices[lineCoordinateStart+5],
																vertices[lineCoordinateStart+6],vertices[lineCoordinateStart+4],1])
							);
xyzPrograms[1] = yzProgram;
yzContext.drawArrays(yzContext.TRIANGLES, 0, 6);
yzContext.drawArrays(yzContext.LINES, 6, 4);


var xyContext = getContext('xy_plane_canvas');
var xyProgram = xyContext.createProgram();
var xyContext = getUpdatedContext(xyContext, xyProgram, vertCodeXYZ, fragCodeXYZ, [
											70, 80, 115,
											70, 80, 115,
											70, 80, 115,
											70, 80, 115,
											70, 80, 115,
											70, 80, 115,

											255, 255, 255,
											255, 255, 255,
											255, 255, 255,
											255, 255, 255,

											255,0,0,
											0,255,0

										],verticesPlane.concat([vertices[lineCoordinateStart],
																vertices[lineCoordinateStart+1],vertices[lineCoordinateStart+2],1,
																vertices[lineCoordinateStart+4],
																vertices[lineCoordinateStart+5],vertices[lineCoordinateStart+6],1])
							);
xyzPrograms[0] = xyProgram;
xyContext.drawArrays(xyContext.TRIANGLES, 0, 6);
xyContext.drawArrays(xyContext.LINES, 6, 4);


function make2DProjection(width, height, depth) {
  return [
     2 / width, 0, 0, 0,
     0, -2 / height, 0, 0,
     0, 0, 2 / depth, 0,
    -1, 1, 0, 1,
  ];
}

function makeZRotation(angleInRadians) {
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

function makeXRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);
  return [
     c, s, 0, 0,
    -s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1,
  ];
}

function I() {
  return [
     1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1,
  ];
}

function projectionMatrix(width, height, depth) {
	return [
       2/width, 0, 0, 0,
       0, -2/height, 0, 0,
       0, 0, 2/depth, 0,
      -1, 1, 0, 1,
    ];
}

function matrixMultiply(a, b) {
  var a00 = a[0*4+0];
  var a01 = a[0*4+1];
  var a02 = a[0*4+2];
  var a03 = a[0*4+3];
  var a10 = a[1*4+0];
  var a11 = a[1*4+1];
  var a12 = a[1*4+2];
  var a13 = a[1*4+3];
  var a20 = a[2*4+0];
  var a21 = a[2*4+1];
  var a22 = a[2*4+2];
  var a23 = a[2*4+3];
  var a30 = a[3*4+0];
  var a31 = a[3*4+1];
  var a32 = a[3*4+2];
  var a33 = a[3*4+3];
  var b00 = b[0*4+0];
  var b01 = b[0*4+1];
  var b02 = b[0*4+2];
  var b03 = b[0*4+3];
  var b10 = b[1*4+0];
  var b11 = b[1*4+1];
  var b12 = b[1*4+2];
  var b13 = b[1*4+3];
  var b20 = b[2*4+0];
  var b21 = b[2*4+1];
  var b22 = b[2*4+2];
  var b23 = b[2*4+3];
  var b30 = b[3*4+0];
  var b31 = b[3*4+1];
  var b32 = b[3*4+2];
  var b33 = b[3*4+3];
  return [a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
          a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
          a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
          a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
          a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
          a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
          a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
          a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
          a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
          a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
          a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
          a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
          a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
          a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
          a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
          a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33];
}

var updateMatrixElementsInRange = function(start, end, matrix, patch){
	for(i=start; i<end; i++) {
		matrix[i] = patch[i-start];
	}
	return matrix
}

var exchangeRows = function(matrix, row1, row2, numOfColumns) {
	row1_start_index = (row1 <= 1)? 0: (row1-1)*numOfColumns;
	row2_start_index = (row2 <= 1)? 0 : (row2-1)*numOfColumns;
	row1_elems = matrix.slice(row1_start_index, row1_start_index+numOfColumns);
	row2_elems = matrix.slice(row2_start_index, row2_start_index+numOfColumns);
	matrix = updateMatrixElementsInRange(row1_start_index, row1_start_index+numOfColumns, matrix, row2_elems);
	matrix = updateMatrixElementsInRange(row2_start_index, row2_start_index+numOfColumns, matrix, row1_elems);
	return matrix;
}

var exchangeColumns = function(matrix, col1, col2, total_rows, total_columns=4) {
	for(i=0; i<total_rows; i++) {
		col1_index = i*total_columns+col1-1;
		col2_index = i*total_columns+col2-1;
		exc_val = matrix[col1_index];
		matrix[col1_index] = matrix[col2_index];
		matrix[col2_index] = exc_val; 
	}
	return matrix;
}

var transform = function(matrix, transformation, rows=4, columns=4) {
	transformation.forEach(function(item, index){
		matrix = exchangeRows(matrix, item[0], item[1], columns);
		matrix = exchangeColumns(matrix, item[0], item[1], rows, columns);
	});
	return matrix;
}

var getRotationWithShuffledRowsAndCells = function(matrix, transformation=null) {
	if(transformation != null) {	
		matrix = transform(matrix, transformation);
	}
	return matrix;
}

var setUniformMatrix = function(context, program, variable, transformation) {
	context.uniformMatrix4fv(context.getUniformLocation(program, variable), false, transformation);
}

var drawIndependentPlane = function(context, lineStartIndex=6, lineVertexCount=6, 
								triangleStartIndex=0, triangleVertexCount=6) {
	
	context.drawArrays(context.TRIANGLES, triangleStartIndex, triangleVertexCount);
	context.drawArrays(context.LINES, lineStartIndex, lineVertexCount);					
}

var getRotation = function(rotation) {
	rotationX = makeXRotation(Math.PI*rotation[0]/180);
	rotationY = makeYRotation(Math.PI*rotation[1]/100);
	rotationZ = makeZRotation(Math.PI*rotation[2]/100);
	return matrixMultiply(rotationX, matrixMultiply(rotationY, rotationZ));
}

var getModifiedLineRotation = function(axis_rotation, line_rotation) {
	sum_matrix = []
	for(i=0;i<line_rotation.length;i++){
		sum_matrix[i] = line_rotation[i] + axis_rotation[i];
	}
	return sum_matrix;
}

var roundDecimalPlaces = function(number, places=2) {
	divisor = Math.pow(10, places);
	return Math.round(number * divisor) / divisor;
} 

var getExuationCofficient = function(twoD_points) { //[{a1:1, a2:1}, (a1:-1, a2:1}]  // a1- axis1, a2- axis2
	cofficient = {};
	point1 = twoD_points[0], point2 = twoD_points[1];
	var dif_a2 = point2.a2 - point1.a2;
	var dif_a1 = point2.a1 - point1.a1;
	cofficient.a1 = -1*roundDecimalPlaces(dif_a2);
	cofficient.a2 = roundDecimalPlaces(dif_a1);
	cofficient.constant = roundDecimalPlaces(point1.a2*dif_a1 - point1.a1*dif_a2);
	return cofficient; 
}

var multiplyMatrixVector = function(matrix, vector, coordinates=4) {
	new_vector = [0,0,0,0]
	for(var i=0; i<coordinates; i++) {
		sum = 0;
		for(var j=0; j<coordinates; j++){
			sum = sum + matrix[4*i+j]*vector[j];
		}
		new_vector[i] = sum;
	}
	return new_vector;
}

var getPlaneSpecificEquation = function (cofficients, axis1, axis2) { //aAXIS1+bAXIS2 = constant
	sign = ' + ';
	
	if(cofficients.a2 < 0) {
		sign = ' - ';
	}

	axis1_part = cofficients.a1 == 0? '0'+axis1 : cofficients.a1+axis1;
	axis2_part = cofficients.a2 == 0? '0'+axis2 : Math.abs(cofficients.a2)+axis2;
	c_part = cofficients.constant == 0? '0': cofficients.constant;

	return axis1_part + sign + axis2_part +' = ' + c_part;
}

var getLineEquationIn3D = function(p1, p2) {
	dif_x = p2[0]-p1[0];
	dif_y = p2[1]-p1[1];
	dif_z = p2[2]-p1[2];
	
	sign = p1[0] < 0 ? ' + ':' - ';
	x_part = '(x'+sign+roundDecimalPlaces(Math.abs(p1[0]))+') / '+ roundDecimalPlaces(dif_x);

	sign = p1[1] < 0 ? ' + ':' - ';
	y_part = '(y'+sign+roundDecimalPlaces(Math.abs(p1[1]))+') / '+ roundDecimalPlaces(dif_y);
	
	sign = p1[2] < 0 ? ' + ':' - ';
	z_part = '(z'+sign+roundDecimalPlaces(Math.abs(p1[2]))+') / '+ roundDecimalPlaces(dif_z);

	return x_part + ' = ' + y_part + ' = ' + z_part + '= FREEDOM';
}

var getEquations = function(p1, p2) {
	equations = {};

	xy_points = [	{'a1':p1[0],'a2':p1[1]},
					{'a1':p2[0], 'a2':p2[1]}
				];
	xy_cofficients = getExuationCofficient(xy_points);
	equations.xy = getPlaneSpecificEquation(xy_cofficients, 'x', 'y');

	xz_points = [	{'a1':p1[0],'a2':p1[2]},
					{'a1':p2[0], 'a2':p2[2]}
				];
	xz_cofficients = getExuationCofficient(xz_points);
	equations.xz = getPlaneSpecificEquation(xz_cofficients, 'x', 'z');

	yz_points = [	{'a1':p1[1],'a2':p1[2]},
					{'a1':p2[1], 'a2':p2[2]}
				];
	yz_cofficients = getExuationCofficient(yz_points);
	equations.yz = getPlaneSpecificEquation(yz_cofficients, 'y', 'z');

	equations.xyz = getLineEquationIn3D(p1, p2);
	return equations;
}

var changeEquationInInterface = function(equations) {
	$('#xy_eqn').html(equations.xy);
	$('#yz_eqn').html(equations.yz);
	$('#xz_eqn').html(equations.xz);
	$('#xyz_eqn').html(equations.xyz);
	//$('#xyz_eqn').html('`'+equations.xyz+'`');
}

var displayEquations = function(transformation_matrix) {
	p1_coorninates = multiplyMatrixVector(transformation_matrix, [vertices[lineCoordinateStart],
																vertices[lineCoordinateStart+1],
																vertices[lineCoordinateStart+2],
																vertices[lineCoordinateStart+3]]);
	p2_coorninates = multiplyMatrixVector(transformation_matrix, [vertices[lineCoordinateStart+4],
																vertices[lineCoordinateStart+5],
																vertices[lineCoordinateStart+6],
																vertices[lineCoordinateStart+7]]);
	line_equations = getEquations(p1_coorninates, p2_coorninates);
	changeEquationInInterface(line_equations);
	setPointValuesInUI(p1_coorninates.slice(0,3), p2_coorninates.slice(0,3));
}


var axis_rotation=[0,0,0];
var line_rotation=[0,0,0];

$('#axis_rot_X').slider({
	formatter: function(value) {
		axis_rotation[0] = value;
		drawIn3D(axis_rotation, line_rotation);
		displayEquations(getRotation(line_rotation));	

	} 
});

$('#axis_rot_Y').slider({
	formatter: function(value) {
		axis_rotation[1] = value;
		drawIn3D(axis_rotation, line_rotation);
		displayEquations(getRotation(line_rotation));
	} 
});

$('#axis_rot_Z').slider({
	formatter: function(value) {
		axis_rotation[2] = value;
		drawIn3D(axis_rotation, line_rotation);
		displayEquations(getRotation(line_rotation));
	} 
});

$('#line_rot_X').slider({
 	formatter: function(value) {
		line_rotation[0] = value;
		draw(axis_rotation, line_rotation);
		displayEquations(getRotation(line_rotation));
 	} 
});

$('#line_rot_Y').slider({
 	formatter: function(value) {
		line_rotation[1] = value;
		draw(axis_rotation, line_rotation);
		displayEquations(getRotation(line_rotation));
 	} 
});

$('#line_rot_Z').slider({
 	formatter: function(value) {
		line_rotation[2] = value;
		draw(axis_rotation, line_rotation);
		displayEquations(getRotation(line_rotation));
 	} 
});

function draw(axis_rotation, line_rotation) {
		drawIn3D(axis_rotation, line_rotation);
		drawIn2D(line_rotation);
}

function drawIn3D(axis_rotation, line_rotation) {
	matrix_axis_rot =getRotation(axis_rotation);
	matrix_line_rot = getRotation(getModifiedLineRotation(axis_rotation, line_rotation));
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	setUniformMatrix(gl, shaderprogram, 'transformation_axis', matrix_axis_rot);
	setUniformMatrix(gl, shaderprogram, 'transformation_line',matrix_line_rot);
	drawLineAndTriangle(gl, 8, 18, 0, 8);
	drawingCtxs = getContextDataForAlias();
	drawingCtxs['xyz'].transformationMatrix = matrix_axis_rot;
	drawPointAlias(drawingCtxs);
}

function drawIn2D(line_rotation) {
		rotation_xy = getRotation(line_rotation);
		setUniformMatrix(xyContext, xyzPrograms[0], 'transformation', rotation_xy);
		
		rotation_yz = getRotationWithShuffledRowsAndCells(rotation_xy, [[1,2], [2,3]]);
		setUniformMatrix(yzContext, xyzPrograms[1], 'transformation', rotation_yz);
		
		rotation_zx = getRotationWithShuffledRowsAndCells(getRotation(line_rotation), [[2,3]]);
		setUniformMatrix(zxContext, xyzPrograms[2], 'transformation', rotation_zx);

		drawIndependentPlane(xyContext);
		drawIndependentPlane(yzContext);
		drawIndependentPlane(zxContext);
}

// function loadTex(image, gl) {
	
// 	var image = new Image();
// 	image.src = file;
// 	image.addEventListener('load', function() {
  		
//   	//gl.generateMipmap(gl.TEXTURE_2D);
// 	});
//}

// var textCodeXYZ = 'attribute vec4 a_position;'+
// 				'attribute vec2 a_texcoord;'+
// 				'varying vec2 v_texcoord;'+
// 				'void main() {'+
// 					'gl_Position = a_position;'+
// 					'v_texcoord = a_texcoord;'+
// 				'}';

// var textFragCodeXYZ = 'precision mediump float;'+
// 					'varying vec2 v_texcoord;'+
// 					'uniform sampler2D u_texture;'+
// 					'void main() {'+
//    						'gl_FragColor = texture2D(u_texture, v_texcoord);'+
// 					'}';

// function isPowerOf2(value) {
//   return (value & (value - 1)) == 0;
// }

// r=1;
// var vert =  [0,0,1,r,
// 			0,0];

// var texContext = getContext('tex_plane_canvas');
// //var texProgram = texContext.createProgram();



// function drawTex(gl) {
// 	var texProgram  = gl.createProgram();
// 	var buf = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
// 	programSetup(gl, texProgram, textCodeXYZ, textFragCodeXYZ);
// 	var pLocation = gl.getAttribLocation(texProgram, "a_position");
// 	gl.enableVertexAttribArray(pLocation);
// 	gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);
// 	var texLocation = gl.getAttribLocation(texProgram, "a_texcoord");
// 	gl.enableVertexAttribArray(texLocation);
// 	gl.vertexAttribPointer(texLocation, 2, gl.FLOAT, false, 0, 4*4);
// 	gl.drawArrays(gl.POINTS, 0, 1);
// }


// var image = new Image();
// image.src = 'X.png';
// image.crossOrigin = 'Anonymous';
// image.addEventListener('load', function() {
// 	p(image);
// 	var textTex = texContext.createTexture();
// 	texContext.bindTexture(texContext.TEXTURE_2D, textTex);
//   	texContext.texImage2D(texContext.TEXTURE_2D, 0, texContext.RGBA, texContext.RGBA,texContext.UNSIGNED_BYTE, image);
//   	if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
//      texContext.generateMipmap(texContext.TEXTURE_2D);
//   	} else {
//     texContext.texParameteri(texContext.TEXTURE_2D, texContext.TEXTURE_WRAP_S, texContext.CLAMP_TO_EDGE);
//     texContext.texParameteri(texContext.TEXTURE_2D, texContext.TEXTURE_WRAP_T, texContext.CLAMP_TO_EDGE);
//     texContext.texParameteri(texContext.TEXTURE_2D, texContext.TEXTURE_MIN_FILTER, texContext.LINEAR);
//   }
//   	p('x');
// 	drawTex(texContext);
// 	p('y');
// });

function transformVector(m, v, dst) {
    dst = dst || new Float32Array(4);
    for (var i = 0; i < 4; ++i) {
      dst[i] = 0.0;
      for (var j = 0; j < 4; ++j) {
        dst[i] += v[j] * m[j * 4 + i];
      }
    }
    return dst;
}

function getContextDataForAlias() {
	return {
		'xy': {
			'axis': {
				'x=1': [1,0,0,1.4],
				'-x=1': [-1,0,0,1.1],
				'y=1': [0,1,0,1.1],
				'-y=1': [0,-1,0,1.2]
			},
			'container':'xyAxis',
			'context_id':'xy_plane_canvas',
			'color':'#e5e5e5'
		},
		'yz': {
			'axis': {
				'y=1': [1,0,0,1.4],
				'-y=1': [-1,0,0,1.1],
				'z=1': [0,1,0,1.1],
				'-z=1': [0,-1,0,1.2]
			},
			'container':'yzAxis',
			'context_id':'yz_plane_canvas',
			'color':'#e5e5e5'
		},
		'zx': {
			'axis': {
				'z=1': [1,0,0,1.4],
				'-z=1': [-1,0,0,1.1],
				'x=1': [0,1,0,1.1],
				'-x=1': [0,-1,0,1.2]
			},
			'container':'zxAxis',
			'context_id':'zx_plane_canvas',
			'color':'#e5e5e5'
		},
		'xyz': {
			'axis': {
				'x=1': [1,0,0,1.2],
				'-x=1': [-1,0,0,1.1],
				 'y=1': [0,1,0,1.1],
				'-y=1': [0,-1,0,1.2],
				 'z=1': [0,0,1,1.1],
				'-z=1': [0,0,-1,1.2],
				 'A': [1,1,1,1.42],
				 'B':[-1,0,0,1.42]
			},
			'container':'xyzAxis',
			'context_id':'xy_canvas',
			'color':'black'
		}
	};
}

function drawPointAlias(contextData) {
	for(key in contextData) {
		divContainerElement = document.getElementById(contextData[key].container);
		var canvasElem =  document.getElementById(contextData[key].context_id);
		var style = canvasElem.currentStyle || window.getComputedStyle(canvasElem);
		divContainerElement.style.top = '0px';
		divContainerElement.style.width = style.width;
		divContainerElement.style.height = style.height;
		divContainerElement.innerHTML = '';
		axisEnds = contextData[key].axis;
		color = contextData[key].color;
		transformationMatrix = contextData[key].transformationMatrix;
		for(key in axisEnds) {
			var transformedCoord = axisEnds[key];
			if(transformationMatrix != undefined) {
				transformedCoord =transformVector(transformationMatrix, axisEnds[key]);
			}
			var div = createDivPositionAndText(key, transformedCoord, canvasElem.offsetWidth, canvasElem.offsetHeight, color);
			divContainerElement.appendChild(div);	
		}	
	}
}

function createDivPositionAndText(name, coordinates, width, height, color) {
	var div = document.createElement("div");
	var textNode = document.createTextNode("");
	div.appendChild(textNode);
	divContainerElement.appendChild(div);
	coordinates[0] /= coordinates[3];
	coordinates[1] /= coordinates[3];
	var pixelX = (coordinates[0] * 0.5 + 0.52) * width;
	var pixelY = (coordinates[1] * -0.5 + 0.5) * height;
	div.style.position = 'absolute';
	div.style.left = Math.floor(pixelX) + "px";
	div.style.top  = Math.floor(pixelY) + "px";
	div.style.color = color;
	z_index = coordinates[2]/coordinates[3];
	if(z_index > 0.2) {
		div.style.zIndex = 1;
	} else if (z_index < -0.2) {
		z_index = -1
		div.style.zIndex = -1;
	}
	textNode.nodeValue = name;
	return div;
}

function setPointValuesInUI(a, b) {
	points = a.concat(b);
	point_ids = ['point_A_X', 'point_A_Y', 'point_A_Z', 'point_B_X', 'point_B_Y', 'point_B_Z'];
	for(index in points) {
		elemA = document.getElementById(point_ids[index]);
		elemA.value = points[index];
	}
}