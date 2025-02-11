(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');


    $(document).ready(function () {
        var bgMusic = $('audio').get(0);
        var $btnMusic = $('.btn-music');
        var $upArrow = $('.up-arrow');

        // Try to play music immediately
        var playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Automatic playback started
                $btnMusic.removeClass('paused');
            }).catch(function(error) {
                // Auto-play was prevented
                bgMusic.pause();
                $btnMusic.addClass('paused');
            });
        }

        // background music control
        $btnMusic.click(function () {
            if (bgMusic.paused) {
                bgMusic.play().then(function() {
                    $(this).removeClass('paused');
                }.bind(this)).catch(function(error) {
                    console.log("Play was prevented:", error);
                    $(this).addClass('paused');
                }.bind(this));
            } else {
                bgMusic.pause();
                $(this).addClass('paused');
            }
        });

        // init Swiper
        new Swiper('.swiper-container', {
            mousewheel: true,  // Enable mouse wheel
            effect: 'slide',   // Change back to slide effect
            speed: 800,
            direction: 'vertical',
            slidesPerView: 1,
            touchRatio: 1,
            resistance: true,
            resistanceRatio: 0.85,
            on: {
                init: function () {
                    animationControl.initAnimationItems();  // get items ready for animations
                    animationControl.playAnimation(this); // play animations of the first slide
                },
                slideChangeTransitionStart: function () {
                    if (this.activeIndex === this.slides.length - 1) {
                        $upArrow.hide();
                    } else {
                        $upArrow.show();
                    }
                    animationControl.clearAnimation(); // Clear animations when transition starts
                },
                slideChangeTransitionEnd: function () {
                    animationControl.playAnimation(this); // Play animations when transition ends
                },
                touchStart: function () {    // mobile devices don't allow audios to play automatically
                    if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                        bgMusic.play();
                    }
                }
            }
        });

        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp();
    });
})();
