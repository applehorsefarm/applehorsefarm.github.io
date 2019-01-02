var contentbackground = document.getElementById('contentbackground');

var homebutton = document.getElementById('homebutton');
var peoplebutton = document.getElementById('peoplebutton');
var yellowhousebutton = document.getElementById('yellowhousebutton');
var futurebutton = document.getElementById('futurebutton');
var gallerybutton = document.getElementById('gallerybutton');
var contactbutton = document.getElementById('contactbutton');

var home = document.getElementById('home');
var people = document.getElementById('people');
var yellowhouse = document.getElementById('yellowhouse');
var future = document.getElementById('future');
var gallery = document.getElementById('gallery');
var contact = document.getElementById('contact');

var activediv = home;

setInterval(function(){
	if  (activediv.scrollHeight !== 0) {
		contentbackground.style.height = activediv.scrollHeight + (10 * parseInt(getComputedStyle(document.documentElement).fontSize)) + "px";
	}
}
, 10);

function switchdiv(element1, element2) {
	var divs1 = element1.getElementsByTagName('div');
	var divs2 = element2.getElementsByTagName('div');
	for (var i = 1; i <= divs1.length; i += 1) {
		fadeOutSlideDown(divs1[divs1.length - i], i*200);
	}
	setTimeout(function(){
		for (var j = 0; j < divs2.length; j += 1) {
			fadeInSlideLeft(divs2[j], j*200);
		}
	}, (divs1.length+2)*200);
	activediv = element2;
}

function fadeInSlideLeft(element, pausedur) {
	var style = element.currentStyle || window.getComputedStyle(element);
	var leftpadding = parseInt(style.paddingLeft, 10);
	setTimeout(function(){
		//Fade In
		var op = 0.1;
		var timer1 = setInterval(function () {
			if (op >= 1){
				clearInterval(timer1);
			}
			element.style.display = 'block';
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.2;
		}, 20);
	  	//Slide Left
      	var pos = 800;
      	var timer2 = setInterval(function () {
	      	if (pos <= 1){
	      		clearInterval(timer2);
	      	}
	      	element.style.paddingLeft = leftpadding + pos + "px";
	      	pos -= 10;
    	}, 1);
	}, pausedur);
	setTimeout(function(){
		element.style.paddingLeft = leftpadding + "px";
	}, pausedur + 801);
}
function fadeOutSlideDown(element, pausedur) {
	var style = element.currentStyle || window.getComputedStyle(element);
	var toppadding = parseInt(style.paddingTop, 10);
	setTimeout(function(){
		//Fade Out
		var op = 1;
		var timer1 = setInterval(function () {
			if (op <= 0.1){
				clearInterval(timer1);
				element.style.display = 'none';
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.25;
		}, 20);
	  	//Slide Down
      	var pos = 1;
      	var timer2 = setInterval(function () {
	      	if (pos >= 1000){
	      		clearInterval(timer2);
	      	}
	      	element.style.paddingTop = toppadding + pos + "px";
	      	pos += 20;
      	}, 1);
	}, pausedur);
	setTimeout(function(){
		element.style.paddingTop = toppadding + "px";
	}, pausedur + 1001);
}

homebutton.onclick = function() {
	if (activediv != home) {
		switchdiv(activediv, home);
	}
	var contentoffsets = document.getElementById('contentbackground').getBoundingClientRect();
	var contenttop = contentoffsets.top + window.pageYOffset;
	//scrollToPosition function found in banneranimation.js
	scrollToPosition(document.body, contenttop, 1000);  
};
peoplebutton.onclick = function() {
	if (activediv != people) {
		switchdiv(activediv, people);
	}
	var contentoffsets = document.getElementById('contentbackground').getBoundingClientRect();
	var contenttop = contentoffsets.top + window.pageYOffset;
	scrollToPosition(document.body, contenttop, 1000);  
};
yellowhousebutton.onclick = function() {
	if (activediv != yellowhouse) {
		switchdiv(activediv, yellowhouse);
	}
	var contentoffsets = document.getElementById('contentbackground').getBoundingClientRect();
	var contenttop = contentoffsets.top + window.pageYOffset;
	scrollToPosition(document.body, contenttop, 1000);  
};
futurebutton.onclick = function() {
	if (activediv != future) {
		switchdiv(activediv, future);
	}
	var contentoffsets = document.getElementById('contentbackground').getBoundingClientRect();
	var contenttop = contentoffsets.top + window.pageYOffset;
	scrollToPosition(document.body, contenttop, 1000);  
};
gallerybutton.onclick = function() {
	if (activediv != gallery) {
		switchdiv(activediv, gallery);
	}
	var contentoffsets = document.getElementById('contentbackground').getBoundingClientRect();
	var contenttop = contentoffsets.top + window.pageYOffset;
	scrollToPosition(document.body, contenttop, 1000);  
};
contactbutton.onclick = function() {
	if (activediv != contact) {
		switchdiv(activediv, contact);
	}
	var contentoffsets = document.getElementById('contentbackground').getBoundingClientRect();
	var contenttop = contentoffsets.top + window.pageYOffset;
	scrollToPosition(document.body, contenttop, 1000);  
};