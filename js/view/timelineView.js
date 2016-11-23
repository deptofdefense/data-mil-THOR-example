muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.timelineView = Backbone.View.extend({
        events: {
        },

        initialize: function(option) {
        	var _this = this
            this.render();
            this.renderTicker();
            this.listenTo(this.collection, 'sync', this.render);
			this.listenTo(this.collection, 'change', this.renderTicker);
        },

        render: function() {
            var _this = this
            $('.tick').empty()
            this.collection.each(function(v){
                var range = _this.collection.dateRange();
                var dateIndex = _.toArray(_this.collection.dateRange()).indexOf(v.get('properties_date')) // _.findWhere(_this.collection.dateRange(), v.get('properties_date'))
                console.log(dateIndex)
                var loc = ( dateIndex/_.size(_this.collection.dateRange())) * $('#timeline').width();
                $('.tick').append(
                    $('<div>').addClass('ticked')
                    .attr('id',dateIndex)
                    .css('left',loc)
                    .html(dateIndex))
            })
        },

        renderTicker: function() {
        	// $(this.el).find('').html()
            var _this = this;
        	$('.ticker').css('left',function() {
                var tickerLoc = (_this.collection.date()[0]/_.size(_this.collection.dateRange())) * $('#timeline').width();
                // console.log(tickerLoc)
                return tickerLoc
            }).find('.year').html(_this.collection.date()[1])
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();