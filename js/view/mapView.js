muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.mapView = Backbone.View.extend({
        events: {
        },
        map : {},
        bombs: [],
        initialize: function(option) {
        	var _this = this

            this.collection.fetch({
                success: function() {
                    // _this.render();
                    _this.map = L.map('map').setView([_this.collection.first().get("geometry_coordinates_1"),_this.collection.first().get("geometry_coordinates_0")], 13);
                    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(_this.map);
                    _this.render()
                },
                error: function() {
                    // _this.renderError();
                }
            })
            // }).always(function() {
            //     _this.render()
            // })
			this.listenTo(this.collection, 'change', this.refocus);
        },

        render: function() {
            var _this = this;
            
            _this.collection.each(function(v,i){
                _this.bombs.push(new window.muarg.Views.bombView({
                    model: v
                    , parent: _this
                }))
                

            })
            
                // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                // .openPopup();




        	$(this.el).find('#map').html()
        	
        },

        refocus: function() {
            var model = this.collection.findWhere({'properties_date':this.collection.date()[1]})
            this.map.panTo([model.get("geometry_coordinates_1"),model.get("geometry_coordinates_0")],model.get("properties_bombings") < 2 ? 13 : 11)
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();