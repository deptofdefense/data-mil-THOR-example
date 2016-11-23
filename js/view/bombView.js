muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.bombView = Backbone.View.extend({
        parent: {},
        model: {},
        marker: {},
        events: {
        },
        initialize: function(option) {
        	var _this = this
            this.parent = option.parent
            this.render();
            this.listenTo(this.parent.collection, 'change', this.changeColor);
        },

        render: function() {
            var _this = this;
            var coord = [this.model.get("geometry_coordinates_1"),this.model.get("geometry_coordinates_0")]
            if(coord[0] == null || coord[1] == null) return
            // L.marker(coord).addTo(_this.parent.map)
            this.marker = L.circleMarker(coord, {
                fillColor: this.parent.collection.date()[1] == this.model.get("properties_date") ? 'red' : "#708598",
                color: '#537898',
                weight: 1,
                fillOpacity: 0.6
            })
            // console.log(this.marker)
            this.marker.addTo(_this.parent.map);
        },

        changeColor: function() {
            this.marker.setStyle({'fillColor': this.parent.collection.date()[1] == this.model.get("properties_date") ? 'red' : "#708598"})
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();