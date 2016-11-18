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
            collection:this.Init.mapData,
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