// Request anim frame
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback){ window.setTimeout(callback, 1000/60); };
})();

function scrollPage(){
	myScroll = $(document).scrollTop();
	if($(window).width()>768){
		if($(".wrapper-navbar").length){
			if( myScroll>= $(".wrapper-navbar").offset().top-$("#header-fixed").outerHeight()-20 && myScroll < $(".wrapper-navbar").offset().top+$(".wrapper-navbar").height()-$(".navbar").outerHeight()-$("#header-fixed").outerHeight()-20 ){
				TweenMax.set($(".navbar"), {position:"fixed", top: $("#header-fixed").outerHeight()+20+"px"});
			}else if(myScroll>= $(".wrapper-navbar").offset().top+$(".wrapper-navbar").height()-$(".navbar").outerHeight()-$("#header-fixed").outerHeight()-20){
				TweenMax.set($(".navbar"), {position:"absolute", top: $(".wrapper-navbar").height()-$(".navbar").outerHeight()});
			}else{
				TweenMax.set($(".navbar"), {position:"absolute", top: "0"});
			}
		}
	}else{
		TweenMax.set($(".navbar"), {position:"relative", top: "0"});
	}
	if($(".anim-paper").length){
	//if($("body").hasClass('home')){
		if(myScroll >= 280){
			if(!$(".block-infos").hasClass("visu-visible")){
				$(".block-infos").addClass("visu-visible");
			}
		}else{
			if($(".block-infos").hasClass("visu-visible")){
				$(".block-infos").removeClass("visu-visible");
			}
		}
		if(myScroll >= 510){
			$( "#header-fixed" ).removeClass("header-light");
		}else{
			$( "#header-fixed" ).addClass("header-light");
		}
		if($(window).width()<=768){
			if(myScroll <= 40){
				$( "#header-fixed" ).addClass("header-light");
			}else{
				$( "#header-fixed" ).removeClass("header-light");
			}
		}
	}

	// Rendre les éléments de la sidebar "actifs" au scroll
	$('.navbar li a.js-scrollTo').each(function () {
		var currentLink = $(this);
		var refElement = $(currentLink.attr("href"));
		var firstLink = $('.navbar li a.js-scrollTo').first();
		var refFirstElement = $(firstLink.attr("href"));
		var lastLink = $('.navbar li a.js-scrollTo').last();
		var refLastElement = $(lastLink.attr("href"));
		var headerHeight = $("#header-fixed").outerHeight();
		if (refElement.offset().top - headerHeight - 30 <= myScroll && refElement.offset().top - headerHeight - 30 + refElement.height() > myScroll) {
			$('.navbar li a.js-scrollTo').closest('li').removeClass('active');
			currentLink.parents('li').addClass('active');
		}else if(myScroll<refFirstElement.offset().top){
			$('.navbar li a.js-scrollTo').closest('li').removeClass('active');
			$('.navbar li a.js-scrollTo').closest('li').first().addClass('active');
		}else if(myScroll>(refLastElement.offset().top+refLastElement.height())){
			$('.navbar li a.js-scrollTo').closest('li').removeClass('active');
			$('.navbar li a.js-scrollTo').closest('li').last().addClass('active');
		}
	});

	requestAnimFrame(scrollPage);
}

$.fn.isVisible = function() {
// Am I visible?
// Height and Width are not explicitly necessary in visibility detection, the bottom, right, top and left are the
// essential checks. If an image is 0x0, it is technically not visible, so it should not be marked as such.
// That is why either width or height have to be > 0.
    var rect = this[0].getBoundingClientRect();
    return (
        (rect.height > 0 || rect.width > 0) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

$.fn.switchClass = function(r, a) {
  t = this;
  t.removeClass(r);
  setTimeout(function() {
    t.addClass(a);
  }, 300);
};

function setBackgroundPosY(elt, val){
		var backgroundPos = elt.css('backgroundPosition'),
			backgroundPosX = backgroundPos.split(' ')[0];

		elt.css('backgroundPosition', backgroundPosX + ' ' + val);
	}

function heightSlides(obj, parent){
	height = obj.outerHeight(true);
	parent.css('height', height);
}

function isHome(){
	if($("body").hasClass('home')){
		return true;
	}else{
		return false;
	}
}

//$(document).ready(function() {
$(function(){
	/**** VARIABLES ****/
	var myScroll,
		resizeTimer;

	scrollPage();

	/*if ($('.anim-info h2').isVisible()) {
		var rule = CSSRulePlugin.getRule(".wrapper-align-middle .container .block-infos h2:before");
		TweenMax.to(rule, 1, {transform: 'translate(0px, 0px)'});
	};*/

	
	/**** INIT ****/

	var burger = $('.label-o-c');
	$(".o-c", burger).addClass('nav');
	burger.click(function() {
	    if( $(".o-c", burger).hasClass('nav') ) {
	      	$(".o-c", burger).switchClass('nav', 'cross');
	    } else {
	      	$(".o-c", burger).switchClass('cross', 'nav');
	    }
	    $(".menu-burger-close").toggleClass("menu-burger-open");
	});

	if($('.infos-onglets').length){
		if($(window).width()>480){
			heightSlides($('.infos-slides.actif'), $('#slides'));
		}
	}
	
	$('.infos-onglets').find('a').on('click', function(e){
		e.preventDefault();
		var onglet = $(this);
		var target = $(this).attr('href'), i = 0, 
				ongletsSiblings = $(this).parents('.infos-onglets').siblings('.infos-onglets'),
				nbOngletsSiblings = ongletsSiblings.length,
				targetActif;
		var oldSlideActif = $('.infos-slides.actif');
		if($(target).hasClass("actif")){
			targetActif = true;
		}else{
			targetActif = false;
		}
		$('.infos-slides').removeClass('actif');
			$(target).addClass('actif');
		$(this).parents(".onglets").addClass('onglet-actif');
		ongletsSiblings.find('.onglets').removeClass('onglet-actif');

		if($(window).width()>480){

			heightSlides($(target), $('#slides'));
		}else{
			if(targetActif == false){
				oldSlideActif.slideToggle(200);
				$(target).slideToggle(200);
			}else{
				oldSlideActif.slideToggle(200);
				$(".infos-slides.actif").removeClass("actif");
				$(".onglets.onglet-actif").removeClass("onglet-actif");
			}
			setTimeout(function(){
				$('html,body').animate({scrollTop: onglet.offset().top-$("#header-fixed").outerHeight()- 10}, 'slow');
			}, 200);

		}
	});


	scrollPage();
	$('.js-scrollTo').on('click', function() { // Au clic sur un élément
		var page = $(this).attr('href'); // Page cible
		var speed = 600; // Durée de l'animation (en ms)
		$('html, body').stop().animate( { scrollTop: $(page).offset().top - ($("#header-fixed").outerHeight() + 30)}, speed); // Go
	    var navbarParent = $(this).closest(".navbar");
	    $("li", navbarParent).removeClass("active");
	    $(this).closest("li").addClass('active');
		return false;
	});


	var h = $(window).height(), w = $(window).width();
    $(window).resize(function(){
    	if($('.infos-onglets').length){
    		if($(window).width()>480){
				heightSlides($('.infos-slides.actif'), $('#slides'));
			}else{
				$('#slides').css('height', 'auto');
			}
		}
		var nh = $(window).height(), nw = $(window).width();
    	if (nw != w){
    		if($(window).width()<=480){
	    		// réouvrir l'onglet 1
	    		var target = $('.infos-onglets').first().find('a').attr('href'), i = 0, 
					ongletsSiblings = $('.infos-onglets').first().find('a').parents('.infos-onglets').siblings('.infos-onglets'),
					nbOngletsSiblings = ongletsSiblings.length,
					targetActif;
	    		$(".infos-slides.actif").removeClass("actif");
	    		$(".infos-slides").first().addClass("actif");
	    		$(".onglets.onglet-actif").removeClass("onglet-actif");
	    		$(".onglets").first().addClass("onglet-actif");
	    		$('.infos-slides').css('display', '');
			}
    	}
    	h = nh; w = nw;

    	$("#header-fixed .container .menu-burger-close").addClass("no-transition");
    	clearTimeout(resizeTimer);
		  resizeTimer = setTimeout(function() {
		  	$("#header-fixed .container .menu-burger-close").removeClass("no-transition");
		  }, 250);
	});

	// Google map
	if($("body").hasClass("has-map")){
		var latLngSiege = {lat: 48.8862956, lng: 2.2128028};
		var mapOptionsMapSiege = {
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: false,
			center: latLngSiege,
			zoom: 16
		};
		mapSiege = new google.maps.Map(document.getElementById('map-siege'),
	      mapOptionsMapSiege);
		mapSiege.panBy(0, -($(".agence").height()/4));
		var markerSiege = new google.maps.Marker({
			position: latLngSiege,
			map: mapSiege
		});

		var latLngCentre = {lat: 50.7217229, lng: 3.1569214};
		var mapOptionsMapCentre = {
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: false,
			center: latLngCentre,
			zoom: 16
		};
		mapCentre = new google.maps.Map(document.getElementById('map-centre'),
	      mapOptionsMapCentre);
		mapCentre.panBy(0, -($(".agence").height()/4));
		var markerCentre = new google.maps.Marker({
			position: latLngCentre,
			map: mapCentre
		});
	};
    
    //scrollreveal
	$(window).load(function(){
	});

	window.sr = ScrollReveal({ reset: true });
	if($(window).width()>480){
		sr.reveal('.sr-anim-nb', { 
			delay: 250,
			duration: 400,
			scale: 0.7,
			reset: true,
		});
		sr.reveal('.sr-anim', { 
			duration: 400,
			scale: 0.7,
			reset: true,
		});
		sr.reveal('.sr-anim-delay', { 
			delay:500,
			duration: 400,
			scale: 0.7,
			reset: true,
		});
		sr.reveal('.sr-anim-tl', { 
			duration: 400,
			scale: 0.7,
			reset: true,
			viewOffset  : { top: 0, right: 0, bottom: 40, left: 0 }
		});
	};

});



