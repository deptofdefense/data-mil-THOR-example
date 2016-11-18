/*global muarg, Backbone*/

muarg.Collections = muarg.Collections || {};

(function () {
    'use strict';

    muarg.Collections.mapCollection = Backbone.Collection.extend({

        model: muarg.Models.mapModel,

    	url: '',
        
        initialize: function(option) {
            
        },
    });
})();