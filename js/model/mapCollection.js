/*global muarg, Backbone*/

muarg.Collections = muarg.Collections || {};

(function () {
    'use strict';

    muarg.Collections.mapCollection = Backbone.Collection.extend({

        model: muarg.Models.mapModel,

    	url: '/js/data/ww1.geojson',
        
        initialize: function(option) {
            
        },
        parse: function(response) {
          return response.features;
        },
    });
})();