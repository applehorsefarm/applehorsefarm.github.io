//Everytime user scrolls, function triggers
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    //Fixed navigation once user is past banner
    var bannerheight = document.getElementById('bannercontainer').scrollHeight;
    var nav = document.getElementById('navigation');
    var progressbar = document.getElementById("progressbar");
	var haybale = document.getElementById("haybale");
    if (document.body.scrollTop > bannerheight || document.documentElement.scrollTop > bannerheight) {
    	nav.style.position = "fixed";
    	progressbar.style.position = "fixed";
    	haybale.style.position = "fixed";
    	progressbar.style.visibility = "visible";

	    //Rotating hay bale
	    haybale.style.transform = "rotate("+window.pageYOffset+"deg)";
	} else {
		nav.style.position = "absolute";
		progressbar.style.position = "absolute";
    	haybale.style.position = "absolute";
		progressbar.style.visibility = "hidden";
}
    //Scroll progress bar
    var winScroll = (document.body.scrollTop || document.documentElement.scrollTop) - document.documentElement.clientHeight;
    var height = document.documentElement.scrollHeight - (2 * document.documentElement.clientHeight);
    var scrolled = (winScroll / height) * 100;
    progressbar.style.width = scrolled + "%";
    haybaleoffset = scrolled - (1500 / document.documentElement.clientWidth);
    haybale.style.left = haybaleoffset + "%";

    //Progress bar and hay bale set to stay immediately underneath navigation bar
    progressbar.style.top = nav.offsetHeight + "px";
    haybale.style.top = nav.offsetHeight - 26 + "px";

    //Content starts after navigation
    var contentbackground = document.getElementById('contentbackground');
    contentbackground.style.top = nav.offsetHeight + "px";
}