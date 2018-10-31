(function ($) {
    'use strict'
    $(function () {
        $.extend($.ui.slider.prototype.options, {
            animate: 'fast',
            stop: function () {
                var ident = this.id || this.className
            }
        })
        $('.progress')
            .slider({
            })
    })
}(jQuery))