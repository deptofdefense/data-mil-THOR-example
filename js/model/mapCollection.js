/*global muarg, Backbone*/

muarg.Collections = muarg.Collections || {};

(function () {
    'use strict';

    muarg.Collections.mapCollection = Backbone.Collection.extend({

        model: muarg.Models.mapModel,
        date: function() {
        	var dr = this.dateRange()
        	return [this._date,dr[this._date]]
        },

        // Shouldn't process each time
        dateRange: function() {
        	var array = []
        	if(this.length > 1)
        	this.forEach(function(v) { array.push(v.get("properties_date")) } )
        	var v = _.uniq(array)
        	return _.object(_.range(v.length),v)
        },

        _date: 0,

    	url: '/js/data/ww1.geojson',
        
        initialize: function(option) {

        },

        parse: function(response) {
	      return response.features
        },

        setDate: function(date) {
        	if(date > this.dateRange().length || date < 0) return;
        	this._date = date
        	this.trigger('change')
        	return this._date
        },
})
})();