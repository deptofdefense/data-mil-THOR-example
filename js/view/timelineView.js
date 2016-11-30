muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.timelineView = Backbone.View.extend({
        events: {
            'click .ticked':'changeDate'
        },

        initialize: function(option) {
        	var _this = this
            this.render();
            this.renderTicker();
            this.listenTo(this.collection, 'sync', this.render);
			this.listenTo(this.collection, 'change', this.renderTicker);
            $(window).bind("resize", _.bind(this.resize, this));
        },

        render: function() {
            $('#content').width($(window).width()*.9)

            var _this = this
            $('.tick').empty()
             this.collection.each(function(v){
                var range = _this.collection.dateRange();
                var dateIndex = _.toArray(_this.collection.dateRange()).indexOf(v.get('properties_date')) // _.findWhere(_this.collection.dateRange(), v.get('properties_date'))
                // console.log(dateIndex)
                var loc = ( dateIndex/_.size(_this.collection.dateRange())) * $('#timeline').width();
                if( $('.tick').find('#'+dateIndex).length > 0) return
                $('.tick').append(
                    $('<div>').addClass('ticked')
                        .attr('id',dateIndex)
                        .css('left',loc)
                        .html(String(range[dateIndex]).split('-')[1]+'/'+String(range[dateIndex]).split('-')[2]))
            })
        },

        renderTicker: function() {
        	// $(this.el).find('').html()
            var _this = this;
            // Moves ticker around
        	$('.ticker').css('left',function() {
                var tickerLoc = (_this.collection.date()[0]/_.size(_this.collection.dateRange())) * $('#timeline').width();
                // console.log(tickerLoc)
                return tickerLoc+15
            }).find('.year').html(_this.collection.date()[1])
            
            // Render ticker text position to prevent being cut off
            if($('.ticker').position().left > $('#timeline').width()-150 && $('.ticker').find('.year').position().left > 0) {
                $('.ticker').find('.year').fadeOut(function(e){
                    $('.ticker').find('.year').css('left',-100).fadeIn()
                })
            } else if($('.ticker').position().left < $('#timeline').width()-150 && $('.ticker').find('.year').position().left < 0) {
                $('.ticker').find('.year').fadeOut(function(e) {
                    $('.ticker').find('.year').css('left',15).fadeIn()  
                })
            }

            if( $('.legend .active').attr('id') < this.collection.date()[0] &&
                $('.legend .active').next().attr('id') > this.collection.date()[0]) {
                $('.legend .active').removeClass('active').next().addClass('active')
            }

            // Renders the text.
        },

        adjustLegend: function() {

        },

        renderError: function() {

        },

        resize: function() {
            this.render();
            this.renderTicker();
        },

        changeDate: function(e) {
            console.log("Switching to",$(e.currentTarget).attr('id'))
            this.collection.setDate($(e.currentTarget).attr('id'))
        }



    });

})();