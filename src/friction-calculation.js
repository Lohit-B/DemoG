var g = function(id = 'g') {
	return document.getElementById(id).value;
}

var mu = function(id='mu') {
	return document.getElementById(id).value;
}

var appliedForce = function(id = 'force') {
	return document.getElementById(id).value;
}

var massUB = function(id = 'm_ub') {
	return document.getElementById(id).value;
}

function calculateMaxFrictionForce() {
	return Math.round(g()*mu()*massUB() * 100) / 100;
}

function calculateCurrentFrictionForce() {
	ff_max = calculateMaxFrictionForce();
	applied_force = appliedForce();
	cur_friction_f = ff_max > applied_force ? applied_force:ff_max;
	return cur_friction_f;
}

function shouldBoxMove() {
	if(calculateMaxFrictionForce() > appliedForce()) {
		return false;
	}
	return true;
}

function setFrictionForces() {
	ff_max = calculateMaxFrictionForce();
	ff_cur = calculateCurrentFrictionForce();
	document.getElementById("mff").innerHTML=ff_max;
	document.getElementById("cff").innerHTML=ff_cur;
}

function loadDefaultConfiguration() {

}

var moveBlockTimer;

function moveBlock(timer = moveBlockTimer) {
	var x = 0;
	moveBlockTimer = window.setInterval(function(){
		if(x >= 1/1.6) {
			window.clearInterval(moveBlockTimer);
		}
		draw(translation(x, 0, 0));
			x = x+0.05;
	}, 100);
}

var sliderAX = new Slider('#m_ub', {
	formatter: function(value) {
		setFrictionForces()
		window.clearInterval(moveBlockTimer);
		if(shouldBoxMove()) {
			moveBlock();
		} 
		return value;
	}
});

var sliderAY = new Slider('#force', {
	formatter: function(value) {
		setFrictionForces();
		window.clearInterval(moveBlockTimer);
		if(shouldBoxMove()) {
			moveBlock();
		} 
		return value;
	}
});

$(function(){
	$('.expandable_link').click( function(e) {
		$(this).find('span').toggleClass('glyphicon-plus').toggleClass('glyphicon-minus');
		href = $(this).attr('href');
		console.log(href);
		$(href).find('.well').focus();
	});
});