var $ = require('jquery');

module.exports = {
    initAnimationItems: function() {
        $('.animated').each(function () {
            var aniDuration, aniDelay;
            
            $(this).attr('data-origin-class', $(this).attr('class'));
            
            aniDuration = $(this).data('ani-duration');
            aniDelay = $(this).data('ani-delay');
            
            $(this).css({
                'visibility': 'hidden',
                'animation-duration': aniDuration,
                '-webkit-animation-duration': aniDuration,
                'animation-delay': aniDelay,
                '-webkit-animation-delay': aniDelay
            });
        });
    },

    playAnimation: function (swiper) {
        var aniItems = swiper.slides[swiper.activeIndex].querySelectorAll('.animated');
        
        $(aniItems).each(function () {
            var aniName = $(this).data('ani-name');
            // Remove animation classes first to restart animation
            $(this).removeClass(aniName);
            $(this).css({ 'visibility': 'hidden' });
            
            // Force a reflow to ensure the animation restarts
            void this.offsetWidth;
            
            // Add the classes back to start animation
            $(this).css({ 'visibility': 'visible' });
            $(this).addClass(aniName);
        });
    },

    clearAnimation: function () {
        $('.animated').each(function () {
            var originClass = $(this).data('origin-class');
            var aniName = $(this).data('ani-name');
            $(this).removeClass(aniName);
            $(this).attr('class', originClass);
            $(this).css({ 'visibility': 'hidden' });
        });
    }
};