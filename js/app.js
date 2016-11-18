// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     // .openPopup();




/*global muarg, $*/


window.muarg = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Init: {},
    init: function () {
        'use strict';

        this.Init.mapData = new this.Collections.mapCollection({
                model: new this.Models.mapModel()
            });

        this.Init.mapView = new this.Views.mapView({
            el: '#map',
            collection:this.Init.map,
        });

        _.each(this.Init, function(v){
            v.initialize();
        })

    },

};

$(document).ready(function () {
    'use strict';
    muarg.init();
});