/*global muarg, Backbone*/

muarg.Collections = muarg.Collections || {};

(function () {
    'use strict';

    muarg.Collections.mapCollection = Backbone.Collection.extend({

        model: muarg.Models.mapModel,
        date: function() {
        	return this._date
        },
        // Shouldn't process each time
        dateRange: function() {
        	var array = []
        	if(this.length > 1)
        	this.pluck('properties').forEach(function(v) { array.push(v.date) } )
        	var v = _.uniq(array)
        	return _.object(_.range(v.length),v)
        },
        _date: 0,

    	url: '/js/data/ww1.geojson',
        
        initialize: function(option) {

        },
        parse: function(response) {
          return response.features;
        },
        setDate: function(date) {
        	this._date = date
        	return this._date
        }

    });
})();