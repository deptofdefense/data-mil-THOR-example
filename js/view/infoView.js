muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.infoView = Backbone.View.extend({
        events: {
            'click .next':'loadNew'
        },
        initialize: function(option) {
        	var _this = this
        	// this.user = this.options.user || {};
           
            this.render();
			this.listenTo(this.collection, 'change', this.render);
        },

        loadNew: function() {
            console.log('Loading new')
            var target=$(this.el).find('.content')
            // This is bad form, I know
            target.css('max-height',1)
                .delay(300)
                .html('<h3>newContent</h3><p>Lots of new content now right?</p>')
                .css('max-height',600)
        },

        render: function() {
        	$(this.el).find('.content').html()
        	
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();