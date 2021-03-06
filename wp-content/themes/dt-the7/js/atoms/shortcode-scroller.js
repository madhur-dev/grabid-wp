
/* #Shortcodes scroller
================================================== */
// jQuery(document).ready(function($) {
	$.fn.scrollerSlideSize = function() {

		return this.each(function() {
			var $this = $(this),
				$img = $this.find("img").eq(0),
				imgW = parseInt($img.attr("width")),
				imgH = parseInt($img.attr("height")),
				$container = $this.parents(".slider-wrapper"),
				$containerWidth = $container.width(),
				$maxWidth = $container.attr("data-max-width"),
				 sideSpace = parseInt($container.attr("data-padding-side"));
			
			

			var leftPadding = parseInt($img.parents(".wf-td").eq(0).css("paddingLeft")),
				rightPadding = parseInt($img.parents(".wf-td").eq(0).css("paddingRight")),
				addedW = 0;

			if (leftPadding > 0 && rightPadding > 0) addedW = leftPadding + rightPadding;

			
			//determine if max width has px or %
			if(typeof $maxWidth != "undefined"){
				var dataMaxWidth = ($containerWidth * parseFloat($maxWidth))/100 - addedW - sideSpace;
			}

			if(imgW > dataMaxWidth){
				var colmnW = dataMaxWidth;
			}else{
				var colmnW = parseInt($img.attr("width"));
				if (!$img.exists()) colmnW = 280;
			}

		
			$this.attr("data-width", colmnW + addedW).css({
				width: colmnW + addedW,
				opacity: 1
			});

		
				var $imgPar = $img.parent("a, .rollover-video"),
					imgParW = $imgPar.width(),
					imgParH = (imgH * imgParW) / imgW;

				$img.parent("a, .rollover-video").css({
					height: imgParH
				});
				$(".fs-entry-content:not(.buttons-on-img)", $this).css("opacity", "1");
		})
	}
	$(".fullwidth-slider .fs-entry").not(".text-on-img .fullwidth-slider .fs-entry").scrollerSlideSize();
	
	

	$window.on("debouncedresize", function( event ) {
		$(".fullwidth-slider .fs-entry").not(".text-on-img .fullwidth-slider .fs-entry").scrollerSlideSize();
		$(".fullwidth-slider").find(".ts-wrap").each(function(){
			var scroller = $(this).data("thePhotoSlider");
			if(typeof scroller!= "undefined"){
				scroller.update();
			};
		});
		$(".photoSlider").parents(".ts-wrap").each(function(){
			var photoScroller = $(this).data("thePhotoSlider");
			if(typeof photoScroller!= "undefined"){
				photoScroller.update();
			};
		});

		$(".slider-content").parents(".ts-wrap").each(function(){
			var photoScroller = $(this).data("thePhotoSlider");
			if(typeof photoScroller!= "undefined"){
				photoScroller.update();
			};
		});

		
		$(".text-on-img .fullwidth-slider .fs-entry, .description-on-hover .fs-entry, .dt-photos-shortcode .fs-entry").each(function() {
			var $this = $(this);

			$(".rollover-project", $this).css({
				"width": $this.attr("data-width"),
				"height": $this.attr("data-height")
			});
		});
		
	});

	$.fn.shortcodesScroller = function() {
		var $el = $(this),
			slides = {},
			thumbs = "";

			slides.$items = $el.children(".fs-entry"),
			slides.count = slides.$items.length;

		$el.addClass("ts-cont");
		$el.wrap('<div class="ts-wrap"><div class="ts-viewport"></div></div>');

		var scroller = $el.parents(".ts-wrap"),
			$this_par = $el.parents(".slider-wrapper"),
			windowW = $window.width(),
			paddings = $this_par.attr("data-padding-side") ? parseInt($this_par.attr("data-padding-side")) : 0,
			$sliderAutoslide = ( 'true' === $this_par.attr("data-autoslide") ) ? true : false,
			$sliderAutoslideDelay = $this_par.attr("data-delay") && parseInt($this_par.attr("data-delay")) > 999 ? parseInt($this_par.attr("data-delay")) : 5000,
			$sliderLoop = ( 'true' === $this_par.attr("data-loop") ) ? true : false,
			$enableTransform = dtGlobals.isMobile && !$this_par.hasClass("enable-mobile-arrows") ? false : true,
			$colmnResize = $this_par.hasClass("resize-by-browser-width") ? false : true,
			$resizeHeight = typeof $this_par.attr("data-max-width") != "undefined" ? true : false,
			$enableInfinite = $this_par.parents().hasClass("infinit-scrolle") ? true : false;


		var $sliderData = scroller.thePhotoSlider({
			mode: {
				type: "scroller"
			},
			columBasedResize: $resizeHeight,
			infinite: $enableInfinite,
			resizeHeight: $resizeHeight,
			sidePaddings: paddings,
			autoPlay: {
				enabled: $sliderAutoslide,
				delay: $sliderAutoslideDelay,
				loop: $sliderLoop
			},
			transformEnable: $enableTransform
		}).data("thePhotoSlider");

		$(".prev", $this_par).click(function() {
			if (!$sliderData.noSlide) $sliderData.slidePrev();
		});
		$(".next", $this_par).click(function() {
			if (!$sliderData.noSlide) $sliderData.slideNext();
		});

		$sliderData.ev.on("updateNav sliderReady", function() {
			if ($sliderData.lockRight) {
				$(".next", $this_par).addClass("disabled");
			} else {
				$(".next", $this_par).removeClass("disabled");
			};

			if ($sliderData.lockLeft) {
				$(".prev", $this_par).addClass("disabled");
			} else {
				$(".prev", $this_par).removeClass("disabled");
			};
			if ($sliderData.lockRight && $sliderData.lockLeft) {
				$this_par.addClass("hide-arrows");
			};
		});

		scroller.hover(
			function() {
				if($sliderAutoslide) {
					$sliderData._autoPlayPaused = false;
					$sliderData.pause();
					$sliderData._pausedByHover = true;
				}
			},
			function() {
				if($sliderAutoslide) {
					$sliderData._pausedByHover = false;
					if(!$sliderData._pausedByClick){
						$sliderData.play();
					}
				}
			}
		);
	};

	$(".slider-wrapper .blog-media").css({
		"height": ""
	});
	$(".fullwidth-slider ul.clearfix").each(function(){

		$(this).shortcodesScroller();
	
	});


	var $sliderWrapper = $(".slider-wrapper");

	$sliderWrapper.css("visibility", "visible");

	$sliderWrapper.each(function(){
		var $this = $(this),
			$thisUl = $this.find(".ts-wrap").data("thePhotoSlider");

		$this.append('<a href="#" class="auto-play-btn"></a>');

		$this.on("mouseenter", function(e) {
			$this.addClass("show-arrows");
		});
		$this.on("mouseleave", function(e) {
			$this.removeClass("show-arrows");
		});

		$(".auto-play-btn", $this).on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			if( $this.hasClass("paused")){
				$this.removeClass("paused");
				$thisUl._pausedByClick = true;
				if (!$thisUl.noSlide) $thisUl.pause();
				$thisUl.st.autoPlay.enabled = false;
			}else{
				$this.addClass("paused");
				$thisUl._pausedByClick = false;
				if (!$thisUl.noSlide) $thisUl.play();
				$thisUl.st.autoPlay.enabled = true;
			}
		});

	});
	
	//Scroller slideshow

	$.fn.postTypeScroller = function() {
		var $el = $(this),
			slides = {},
			thumbs = "";

			slides.$items = $el.children("li"),
			slides.count = slides.$items.length;

		$el.addClass("ts-cont");
		$el.wrap('<div class="ts-wrap"><div class="ts-viewport photoSlider-wrap"></div></div>');
		if($el.hasClass("shortcode-photo-slider")){
			$el.parents(".ts-wrap").addClass("shortcode-slider-wrap")
		}

		var $slider = $el.parents(".ts-wrap"),
			$this_par = $el,
			windowW = $window.width(),
			paddings = $this_par.attr("data-padding-side") ? parseInt($this_par.attr("data-padding-side")) : 0,
			$sliderAutoslideEnable = ( 'true' != $this_par.attr("data-paused") && typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
			$sliderAutoslide = ( 'true' === $this_par.attr("data-paused") ) ? false : true,
			$sliderAutoslideDelay = $this_par.attr("data-autoslide") && parseInt($this_par.attr("data-autoslide")) > 999 ? parseInt($this_par.attr("data-autoslide")) : 5000,
			$sliderLoop = (  typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
			$sliderWidth = $this_par.attr("data-width") ? parseInt($this_par.attr("data-width")) : 800,
			$sliderHight = $this_par.attr("data-height") ? parseInt($this_par.attr("data-height")) : 400,
			imgMode = $this_par.attr("data-img-mode") ? $this_par.attr("data-img-mode") : "fill";

		var $sliderData = $slider.thePhotoSlider({
			mode: {
				type: "slider"
			},
			height: $sliderHight,
			width: $sliderWidth,
			resizeImg: true,
			imageScaleMode: imgMode,
			imageAlignCenter:true,
			autoPlay: {
				enabled: $sliderAutoslideEnable,
				delay: $sliderAutoslideDelay,
				loop: $sliderLoop
			}
		}).data("thePhotoSlider");

		//Append slider navigation
		$('<div class="leftArrow"></div><div class="rightArrow"></div>').insertAfter($el);
		//Append slider play/pause btn
		if(typeof $this_par.attr("data-autoslide") != "undefined"){
			$('<div class="psPlay"></div>').insertAfter($el);
		}

		if( 'true' === $this_par.attr("data-paused") ){
			$(".psPlay", $slider).addClass("paused");
		};
		$(".psPlay", $slider).on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			if( $this.hasClass("paused")){
				$this.removeClass("paused");
				if (!$sliderData.noSlide) $sliderData.play();
				$sliderData.st.autoPlay.enabled = true;
			}else{
				$this.addClass("paused");
				if (!$sliderData.noSlide) $sliderData.pause();
				$sliderData.st.autoPlay.enabled = false;
			}
		});

		$(".leftArrow", $slider).click(function() {
			if (!$sliderData.noSlide) $sliderData.slidePrev();
		});
		$(".rightArrow", $slider).click(function() {
			if (!$sliderData.noSlide) $sliderData.slideNext();
		});

		$sliderData.ev.on("updateNav sliderReady", function() {
			if ($sliderData.lockRight) {
				$(".rightArrow", $slider).addClass("disabled");
			} else {
				$(".rightArrow", $slider).removeClass("disabled");
			};

			if ($sliderData.lockLeft) {
				$(".leftArrow", $slider).addClass("disabled");
			} else {
				$(".leftArrow", $slider).removeClass("disabled");
			};
			if ($sliderData.lockRight && $sliderData.lockLeft) {
				$this_par.addClass("hide-arrows");
			};
		});
	};
	$("ul.photoSlider:not(.slider-masonry)").each(function(){
		$(this).postTypeScroller();
	});
	$("ul.photoSlider").css("visibility", "visible");


	
	$.fn.postTypeContentScroller = function() {
		var $el = $(this),
			slides = {},
			thumbs = "";

			slides.$items = $el.children("li"),
			slides.count = slides.$items.length;

		$el.addClass("ts-cont");
		$el.wrap('<div class="ts-wrap contentSlider-wrap"><div class="ts-viewport"></div></div>');
	

		var $slider = $el.parents(".ts-wrap"),
			$this_par = $el,
			windowW = $window.width(),
			paddings = $this_par.attr("data-padding-side") ? parseInt($this_par.attr("data-padding-side")) : 0,
			$sliderAutoslideEnable = ( 'true' != $this_par.attr("data-paused") && typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
			$sliderAutoslide = ( 'true' === $this_par.attr("data-paused") ) ? false : true,
			$sliderAutoslideDelay = $this_par.attr("data-autoslide") && parseInt($this_par.attr("data-autoslide")) > 999 ? parseInt($this_par.attr("data-autoslide")) : 5000,
			$sliderLoop = (  typeof $this_par.attr("data-autoslide") != "undefined" ) ? true : false,
			$sliderWidth = $this_par.attr("data-width") ? parseInt($this_par.attr("data-width")) : 800,
			$sliderHight = $this_par.attr("data-height") ? parseInt($this_par.attr("data-height")) : 400,
			imgMode = $this_par.attr("data-img-mode") ? $this_par.attr("data-img-mode") : "none";

		var $sliderData = $slider.thePhotoSlider({
			mode: {
				type: "slider"
			},
			height: "auto",
			resizeImg: true,
			imageScaleMode: "none",
			imageAlignCenter:true,
			calcAutoHeight: true,
			autoPlay: {
				enabled: $sliderAutoslideEnable,
				delay: $sliderAutoslideDelay,
				loop: $sliderLoop
			}
		}).data("thePhotoSlider");

		//Append slider navigation
		$('<div class="leftArrow"></div><div class="rightArrow"></div>').insertAfter($el);
	

		$(".leftArrow", $slider).click(function() {
			if (!$sliderData.noSlide) $sliderData.slidePrev();
		});
		$(".rightArrow", $slider).click(function() {
			if (!$sliderData.noSlide) $sliderData.slideNext();
		});

		$sliderData.ev.on("updateNav sliderReady", function() {
			if ($sliderData.lockRight) {
				$(".rightArrow", $slider).addClass("disabled");
			} else {
				$(".rightArrow", $slider).removeClass("disabled");
			};

			if ($sliderData.lockLeft) {
				$(".leftArrow", $slider).addClass("disabled");
			} else {
				$(".leftArrow", $slider).removeClass("disabled");
			};
			if ($sliderData.lockRight && $sliderData.lockLeft) {
				$this_par.addClass("hide-arrows");
			};
		});

		//Bullets
		var itemHTML = '<div class="psBullet"></div>';

		$this_par.addClass('psWithBullets');
		var out = '<div class="psNav psBullets">';
		for(var i = 0; i < $sliderData.slides.$items.length; i++) {
			out += itemHTML;
		}
		$sliderData._controlNav = out = $(out + '</div>');
		out.appendTo($slider);

		
		$sliderData.ev.on("sliderReady beforeTransition", function() {
			

			$sliderData._controlNav.find(".psBullet").removeClass("act");
			$sliderData._controlNav.find(".psBullet").eq($sliderData.currSlide).addClass("act");

		});
		$sliderData._controlNav.find(".psBullet").each(function(i) {
			$(this).on("click", function(event) {
				var $this = $(this);
				if ($this.parents(".ts-wrap").hasClass("ts-interceptClicks")) return;
				$sliderData.slideTo(i);
			});
		});
		
		
	
	}
	$(".slider-content").each(function(){
		$(this).postTypeContentScroller();
	});

	$(".slider-content").css("visibility", "visible");

	$('.carousel-shortcode, .team-carousel-shortcode, .testimonials-carousel-shortcode, .blog-carousel-shortcode, .products-carousel-shortcode').each(function(){
		var $this = $(this),
			$slideAll,
			$colGap = $this.attr("data-col-gap") ? parseInt($this.attr("data-col-gap")) : 0,
			$autoHeight = ( 'true' === $this.attr("data-auto-height")) ? true : false,
			$animSpeed =  $this.attr("data-speed") ? parseInt($this.attr("data-speed")) : 600,
			$autoPlay = ( 'true' === $this.attr("data-autoplay")) ? true : false,
			$autoPlayTimeout = $this.attr("data-autoplay_speed") ? parseInt($this.attr("data-autoplay_speed")) : 6000,
			$enableArrows = ( 'true' === $this.attr("data-arrows")) ? true : false,
			$enableDots = ( 'true' === $this.attr("data-bullet")) ? true : false,
			$desktopCol =  $this.attr("data-col-num") ? parseInt($this.attr("data-col-num")) : 3,
			$laptopCol =  $this.attr("data-laptop-col") ? parseInt($this.attr("data-laptop-col")) : 3,
			$hTabletCol =  $this.attr("data-h-tablet-columns-num") ? parseInt($this.attr("data-h-tablet-columns-num")) : 3,
			$vTabletCol =  $this.attr("data-v-tablet-columns-num") ? parseInt($this.attr("data-v-tablet-columns-num")) : 2,
			$phoneCol =  $this.attr("data-phone-columns-num") ? parseInt($this.attr("data-phone-columns-num")) : 1,
			$enableRtl = ( "rtl" == jQuery(document).attr( "dir" ) ) ? true : false,
			$slideBy =  ('1' == $this.attr("data-scroll-mode")) ? parseInt($this.attr("data-scroll-mode")) : 'page',
			$nextIcon = $this.attr("data-next-icon") ? $this.attr("data-next-icon") : 'icon-ar-002-r',
			$prevIcon = $this.attr("data-prev-icon") ? $this.attr("data-prev-icon") : 'icon-ar-001-l',
			$dotsEach = ('1' == $this.attr("data-scroll-mode") && $enableDots) ? true : false;
	
		$this.owlCarousel({
			rtl: $enableRtl,
			items: $desktopCol,
			autoHeight: $autoHeight,
		   	margin:$colGap,
		   	loadedClass: 'owl-loaded',
		   	slideBy: $slideBy,
		    loop:true,
		    smartSpeed: $animSpeed,
		    responsive:{
		        0:{
		            items:$phoneCol,
		            loop:($this.children().length > $phoneCol) ? true : false,
		        },
		        481:{
		        	loop:($this.children().length > $vTabletCol) ? true : false,
		            items:$vTabletCol
		        },
		        751:{
		        	loop:($this.children().length > $hTabletCol) ? true : false,
		            items:$hTabletCol
		        },
		        1025:{
		        	loop:($this.children().length > $laptopCol) ? true : false,
		            items:$laptopCol
		        },
		        1100:{
		        	loop:($this.children().length > $desktopCol) ? true : false,
		            items:$desktopCol
		        }
		    },
		    autoplay: $autoPlay,
		    autoplayTimeout: $autoPlayTimeout,
		    autoplayHoverPause: true,
		    nav: $enableArrows,
		    navElement: "a",
		    navText: ['<i class=' + $prevIcon + ' ></i>', '<i class='+ $nextIcon +' ></i>'],
		    dots: $enableDots,
		    dotsEach:$dotsEach
		});
		//Blog: layout text on image
		if($this.hasClass("content-rollover-layout-list") && ! $this.hasClass("disable-layout-hover")){
			$this.find(".post-entry-wrapper").each(function(){
				var $this = $(this),
					$thisOfTop = $this.find(".entry-excerpt").height() + $this.find(".post-details").innerHeight();
				$this.stop().velocity({
					translateY : $thisOfTop
				}, 0);
				$this.parents(".post").first().on("mouseenter", function(e) {
					$this.stop().velocity({
						translateY : 0
					}, 0);
				});
				$this.parents(".post").first().on("mouseleave", function(e) {
					$this.stop().velocity({
						translateY : $thisOfTop
					}, 0);
				});
			})
		}
		setTimeout(function(){
			$this.trigger('refresh.owl.carousel');

		}, $animSpeed);
		
		addOnloadEvent(function(){ 
			$this.trigger('refresh.owl.carousel');

			$(".dt-owl-item.cloned" ).layzrInitialisation();

			if($this.hasClass("content-rollover-layout-list") && ! $this.hasClass("disable-layout-hover")){
				$this.find(".post-entry-wrapper").each(function(){
					var $this = $(this),
						$thisOfTop = $this.find(".entry-excerpt").height() + $this.find(".post-details").innerHeight();
					$this.stop().velocity({
						translateY : $thisOfTop
					}, 0);
					$this.parents(".post").first().on("mouseenter", function(e) {
						$this.stop().velocity({
							translateY : 0
						}, 0);
					});
					$this.parents(".post").first().on("mouseleave", function(e) {
						$this.stop().velocity({
							translateY : $thisOfTop
						}, 0);
					});
				})
			}
			setTimeout(function(){
				$(".dt-owl-item.cloned .animate-element.animation-triggered:not(.start-animation)").addClass("start-animation");
			},50);
			
		});
		$this.on('changed.owl.carousel', function(event) {
		   if($(".dt-owl-item.cloned .is-loaded", $this ).parents().hasClass("layzr-bg")){
		   		$(".dt-owl-item.cloned .is-loaded", $this ).parents().removeClass("layzr-bg");
		   }
		   $('.dt-owl-item.cloned .photoswipe-wrapper, .dt-owl-item.cloned .photoswipe-item .dt-gallery-container', $this).initPhotoswipe();
		   //setTimeout(function(){
				$(".animate-element:not(.start-animation):in-viewport", $this).checkInViewport();
			//},50)
		})	

		
		$this.find('.dt-owl-item').on('mouseenter',function(e){
			if($autoPlay){
		    	$this.trigger('stop.owl.autoplay');
		    }
		})
		$this.find('.dt-owl-item').on('mouseleave',function(e){
			if($autoPlay){
				$this.trigger('play.owl.autoplay',[$animSpeed]);
			}
		})
		
	});
	
