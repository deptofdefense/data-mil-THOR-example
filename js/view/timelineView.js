muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.timelineView = Backbone.View.extend({
        events: {
        },
        initialize: function(option) {
        	var _this = this
            this.render();
			this.listenTo(this.collection, 'change', this.render);
        },

        render: function() {
        	// $(this.el).find('').html()
        	
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();