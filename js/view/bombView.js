muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.bombView = Backbone.View.extend({
        parent: {},
        model: {},
        events: {
        },
        initialize: function(option) {
        	var _this = this
            this.parent = option.parent
            this.render();
        },

        render: function() {
            var _this = this;
            var coord = [this.model.get("geometry_coordinates_1"),this.model.get("geometry_coordinates_0")]
            if(coord[0] == null || coord[1] == null) return
            // L.marker(coord).addTo(_this.parent.map)
            L.circleMarker(coord, {
                fillColor: "#708598",
                color: '#537898',
                weight: 1,
                fillOpacity: 0.6
            }).addTo(_this.parent.map)
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();