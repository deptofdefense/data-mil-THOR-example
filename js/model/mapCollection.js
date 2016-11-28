/*global muarg, Backbone*/

muarg.Collections = muarg.Collections || {};

(function () {
    'use strict';

    muarg.Collections.mapCollection = Backbone.Collection.extend({

        model: muarg.Models.mapModel,

        date: function() {
        	var dr = this.dateRange()
        	return [parseInt(this._date),dr[this._date]]
        },

        // Shouldn't process each time
        dateRange: function() {
        	var array = []
        	if(this.length > 1)
        	this.forEach(function(v) { array.push(v.get("properties_date")) } )
        	var v = _.uniq(array)
        	return _.object(_.range(v.length),v)
        },

        _date: 1,

    	url: '/js/data/ww1.geojson',
        
        initialize: function(option) {

        },

        parse: function(response) {
	      return response.features
        },

        getAllCoordsByDate: function(dateIndex) {
        	var dateIndex = dateIndex || this.date()[0]
        	var date = this.dateRange()[dateIndex]

        	var t = this.map(function(model) {
        		if(model.get('properties_date') == date) { 
	        		return [model.get('geometry_coordinates_1'),model.get('geometry_coordinates_0')]
	        	} else {
	        		return
	        	}
        	})

        	t = _.filter(t,function(v){
        		return typeof v !== 'undefined'
        	})

        	return t
        },

        returnAllCoords: function() {
            var t = this.map(function(model) {
                return [model.get('geometry_coordinates_1'),model.get('geometry_coordinates_0')]
            })

            return t
        },

        setDate: function(date) {
        	if(date > this.dateRange().length || date < 0) return;
        	this._date = parseInt(date)
            console.log("change to",date)
        	this.trigger('change')
        	return this._date
        },
})
})();