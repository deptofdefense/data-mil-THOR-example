muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.infoView = Backbone.View.extend({
        events: {
        },
        initialize: function(option) {
        	var _this = this
        	// this.user = this.options.user || {};
            this.collection.fetch({
                success: function() {
                    _this.render();
                },
                error: function() {
                    _this.renderError();
                }
            })

			this.listenTo(this.collection, 'change', this.render);
        },

        render: function() {
        	$(this.el).find('#map').html()
        	
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();