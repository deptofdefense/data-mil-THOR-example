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

        this.Init.infoView = new this.Views.infoView({
            el: '#info',
            collection:this.Init.mapData,
        });

        this.Init.timelineView = new this.Views.timelineView({
            el: '#timeline',
            collection:this.Init.mapData,
        });
        // Auto inits, or use this if not
        // _.each(this.Init, function(v){
        //     // v.initialize();
        // })

    },

};

$(document).ready(function () {
    'use strict';
    muarg.init();
});