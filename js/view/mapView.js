muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.mapView = Backbone.View.extend({
        events: {
        },
        initialize: function(option) {
        	var _this = this

            // this.collection.fetch({
            //     success: function() {
            //         // _this.render();
            //     },
            //     error: function() {
            //         // _this.renderError();
            //     }
            // }).always(function() {
            //     _this.render()
            // })
            this.render()

			this.listenTo(this.collection, 'change', this.render);
        },

        render: function() {
            var map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([51.5, -0.09]).addTo(map)
                // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                // .openPopup();




        	$(this.el).find('#map').html()
        	
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();