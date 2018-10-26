$(document).ready(function(){
    //run when page first loads
    doAffixAndScrollSpyStuff()
  
});

$(window).resize($.debounce(250, false, function(e){
    //run once after every window resize motion completed
    doAffixAndScrollSpyStuff();
}));

function doAffixAndScrollSpyStuff() {
	
	// ****************************************
	// JQuery for affix
	// ****************************************
	var offsetHeight = $('.topStopper').outerHeight(true);
	var heightOfSmallestBanner = 464;  // this is the height of the banner/hero image and/or anything else that may appear above the affixed object (not including the height menu bar) - note that the height may change when the screen is narrow
	var heightOfLargestBanner = 840;   // this is the height of the banner/hero image when the screen is at ts widest
	var scrollSpyImagePadding = 20;
	
	// sometimes the jquery values returned for dynamic heights are not correct for  $('.topStopper').outerHeight(true)   or   $('#nav').offset().top
	// if this occurs set offset-top to be the largest value used - this ensures that the mobile image does not overlap the carousel or hero image
	if (offsetHeight >= heightOfSmallestBanner) {
		$('#nav').affix({
			offset: {     
			  top: (offsetHeight - scrollSpyImagePadding),
			  bottom: (($('footer').outerHeight(true) + $('.bottomStopper').outerHeight(true)) + 72)
			}
		});
	} else {
		$('#nav').affix({
			offset: {     
			  top: (heightOfLargestBanner - scrollSpyImagePadding),
			  bottom: (($('footer').outerHeight(true) + $('.bottomStopper').outerHeight(true)) + 72)
			}
		});
	}
	//debug data:
	//alert("#carousel-hero outerheight: " + $('#carousel-hero').outerHeight(true) + " nav id offset top: " + $('#nav').offset().top + "  header outer height: " + $('.navbar-header').outerHeight(true) +  "  equals: "+ ($('#nav').offset().top - $('.navbar-header').outerHeight(true)) + "\n" + "footer: " + $('footer').outerHeight(true) + "  Stopper: "  + $('.stopper').outerHeight(true) + "  Combined plus 72 equals: " + (($('footer').outerHeight(true) + $('.stopper').outerHeight(true)) + 72) + ".");

	// ****************************************
    // JQuery to trigger image transform
	// ****************************************
    $(".scrollspy").on("activate.bs.scrollspy", function(){
        var myImageId = ($('.scrollspy li.active > a').attr('href'))+'-img';

        $("#spyImage img").removeClass("opaque");
        $(myImageId).addClass("opaque");
    });
}