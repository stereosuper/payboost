function scrollPage(){myScroll=$(document).scrollTop(),$(window).width()>768?$(".wrapper-navbar").length&&(myScroll>=$(".wrapper-navbar").offset().top-$("#header-fixed").outerHeight()-20&&myScroll<$(".wrapper-navbar").offset().top+$(".wrapper-navbar").height()-$(".navbar").outerHeight()-$("#header-fixed").outerHeight()-20?TweenMax.set($(".navbar"),{position:"fixed",top:$("#header-fixed").outerHeight()+20+"px"}):myScroll>=$(".wrapper-navbar").offset().top+$(".wrapper-navbar").height()-$(".navbar").outerHeight()-$("#header-fixed").outerHeight()-20?TweenMax.set($(".navbar"),{position:"absolute",top:$(".wrapper-navbar").height()-$(".navbar").outerHeight()}):TweenMax.set($(".navbar"),{position:"absolute",top:"0"})):TweenMax.set($(".navbar"),{position:"relative",top:"0"}),$(".anim-paper").length&&(myScroll>=280?$(".block-infos").hasClass("visu-visible")||$(".block-infos").addClass("visu-visible"):$(".block-infos").hasClass("visu-visible")&&$(".block-infos").removeClass("visu-visible"),myScroll>=510?$("#header-fixed").removeClass("header-light"):$("#header-fixed").addClass("header-light"),$(window).width()<=768&&(myScroll<=40?$("#header-fixed").addClass("header-light"):$("#header-fixed").removeClass("header-light"))),requestAnimFrame(scrollPage)}function setBackgroundPosY(e,i){var s=e.css("backgroundPosition"),t=s.split(" ")[0];e.css("backgroundPosition",t+" "+i)}function heightSlides(e,i){height=e.outerHeight(!0),i.css("height",height)}function isHome(){return $("body").hasClass("home")?!0:!1}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$.fn.isVisible=function(){var e=this[0].getBoundingClientRect();return(e.height>0||e.width>0)&&e.bottom>=0&&e.right>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)&&e.left<=(window.innerWidth||document.documentElement.clientWidth)},$.fn.switchClass=function(e,i){t=this,t.removeClass(e),setTimeout(function(){t.addClass(i)},300)},$(document).ready(function(){$(".js-scrollTo").on("click",function(){var e=$(this).attr("href"),i=750;return $("html, body").animate({scrollTop:$(e).offset().top},i),!1})}),$(function(){var e,i;scrollPage();var s=$(".label-o-c");$(".o-c",s).addClass("nav"),s.click(function(){$(".o-c",s).hasClass("nav")?$(".o-c",s).switchClass("nav","cross"):$(".o-c",s).switchClass("cross","nav"),$(".menu-burger-close").toggleClass("menu-burger-open")}),$(".infos-onglets").length&&$(window).width()>480&&heightSlides($(".infos-slides.actif"),$("#slides")),$(".infos-onglets").find("a").on("click",function(e){e.preventDefault();var i=$(this),s=$(this).attr("href"),t=0,o=$(this).parents(".infos-onglets").siblings(".infos-onglets"),n=o.length,a,r=$(".infos-slides.actif");a=$(s).hasClass("actif")?!0:!1,$(".infos-slides").removeClass("actif"),$(s).addClass("actif"),$(this).parents(".onglets").addClass("onglet-actif"),o.find(".onglets").removeClass("onglet-actif"),$(window).width()>480?heightSlides($(s),$("#slides")):(0==a?(r.slideToggle(200),$(s).slideToggle(200)):(r.slideToggle(200),$(".infos-slides.actif").removeClass("actif"),$(".onglets.onglet-actif").removeClass("onglet-actif")),setTimeout(function(){$("html,body").animate({scrollTop:i.offset().top-$("#header-fixed").outerHeight()-10},"slow")},200))}),scrollPage();var t=$(window).height(),o=$(window).width();$(window).resize(function(){$(".infos-onglets").length&&($(window).width()>480?heightSlides($(".infos-slides.actif"),$("#slides")):$("#slides").css("height","auto"));var e=$(window).height(),s=$(window).width();if(s!=o&&$(window).width()<=480){var n=$(".infos-onglets").first().find("a").attr("href"),a=0,r=$(".infos-onglets").first().find("a").parents(".infos-onglets").siblings(".infos-onglets"),l=r.length,d;$(".infos-slides.actif").removeClass("actif"),$(".infos-slides").first().addClass("actif"),$(".onglets.onglet-actif").removeClass("onglet-actif"),$(".onglets").first().addClass("onglet-actif"),$(".infos-slides").css("display","")}t=e,o=s,$("#header-fixed .container .menu-burger-close").addClass("no-transition"),clearTimeout(i),i=setTimeout(function(){$("#header-fixed .container .menu-burger-close").removeClass("no-transition")},250)}),$(window).load(function(){}),1==isHome()&&(window.sr=ScrollReveal({reset:!0}),sr.reveal(".sr-anim-nb",{delay:250,duration:400,scale:.7,reset:!1,reset:!0}),sr.reveal(".sr-anim",{duration:400,scale:.7,reset:!0}),sr.reveal(".sr-anim-delay",{delay:500,duration:400,scale:.7,reset:!0}))});