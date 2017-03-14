// portions of code adapted & modified (unknown CC license) from
// http://www.cartographicperspectives.org/index.php/journal/article/view/cp76-donohue-et-al/1307
// copyright © 2014 University of Wisconsin-Madison Board of Regents

$(document).ready(function() {
    var cities;
    var map = L.map('map', {
	center: [37.8, -96],
	zoom: 4,
	minZoom: 4
    });

    /* display the tile layer */
    L.tileLayer(
	'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /* load the GeoJSON file of coordinates */
    $.getJSON("data.geojson").done(function(data) {
	var info = processData(data);
	createPropSymbols(info.timestamps, data);
	createLegend(info.min, info.max);
	createSliderUI(info.timestamps);
    })
	.fail(function() {alert("There has been a problem loading the data.")});

    /* preprocess the data before displaying */
    function processData(data) {
	var timestamps = [];
	var min = Infinity;
	var max = -Infinity;

	for (var feature in data.features) {
	    var properties = data.features[feature].properties;
	    for (var attribute in properties) {
		if (attribute != 'id' &&
		    attribute != 'name' &&
		    attribute != 'lat' &&
		    attribute != 'lon') {

		    if ($.inArray(attribute, timestamps) === -1) {
			timestamps.push(attribute);
		    }

		    if (properties[attribute] < min) {
			min = properties[attribute];
		    }

		    if (properties[attribute] > max) {
			max = properties[attribute];
		    }
		}
	    }
	}

	return {
	    timestamps: timestamps,
	    min: min,
	    max: max
	}
    }

    /* create proportional symbols for the data layer */
    function createPropSymbols(timestamps, data) {
	cities = L.geoJson(data, {
	    pointToLayer: function(feature, latlng) {
		return L.circleMarker(latlng, {
		    fillColor: "#708598",
		    color: '#537898',
		    weight: 1,
		    fillOpacity: 0.6
		}).on({
		    mouseover: function(e) {
			this.openPopup();
			this.setStyle({color: 'yellow'});
		    },
		    mouseout: function(e) {
			this.closePopup();
			this.setStyle({color: '#537898'});
		    }
		});
	    }
	}).addTo(map);

	updatePropSymbols(timestamps[0]);
    }

    /* scale proporitional symbols based on attribute values */
    function updatePropSymbols(timestamp) {
	cities.eachLayer(function(layer) {
	    var props = layer.feature.properties;
	    var radius = calcPropRadius(props[timestamp]);
	    var popupContent = "<b>" + String(props[timestamp]) +
		" units</b><br>" +
		"<i>" + props.name +
		"</i> in </i>" +
		timestamp + "</i>";

	    layer.setRadius(radius);
	    layer.bindPopup(popupContent, {offset: new L.Point(0, -radius)})
	});
    }

    /* calculate the radius of a proportional symbol for scaling */
    function calcPropRadius(attributeValue) {
	var scaleFactor = 16;
	var area = attributeValue * scaleFactor;
	return Math.sqrt(area/Math.PI) * 2;
    }

    /* create a legend of proportional symbols for the map */
    function createLegend(min, max) {
	if (min < 10) {
	    min = 10
	}

	function roundNumber(inNumber) {
	    return (Math.round(inNumber / 10) * 10);
	}

	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function(map) {
	    var legendContainer = L.DomUtil.create("div", "legend");
	    var symbolsContainer = L.DomUtil.create("div", "symbolsContainer");
	    var classes = [roundNumber(min), roundNumber((max - min) / 2), roundNumber(max)];
	    var legendCircle;
	    var lastRadius = 0;
	    var currentRadius;
	    var margin;

	    L.DomEvent.addListener(legendContainer, 'mousedown', function(e) {
		L.DomEvent.stopPropagation(e);
	    });

	    $(legendContainer).append("<h2 id='legendTitle'># of somethings</h2>");

	    for (var i = 0; i <= classes.length - 1; i++) {
		legendCircle = L.DomUtil.create("div", "legendCircle");
		currentRadius = calcPropRadius(classes[i]);
		margin = -currentRadius - lastRadius - 2;
		$(legendCircle).attr("style", "width: " + currentRadius * 2 +
				     "px; height: " + currentRadius * 2 +
				     "px; margin-left: " + margin + "px");
		$(legendCircle).append("<span class='legendValue'>" + classes[i] + "<span>");
		$(symbolsContainer).append(legendCircle);
		lastRadius = currentRadius;
	    }

	    $(legendContainer).append(symbolsContainer);
	    return legendContainer;
	};

	legend.addTo(map);
    } // end createLegend();

    function createSliderUI(timestamps) {
	var sliderControl = L.control({position: 'bottomleft'});

	sliderControl.onAdd = function(map) {
	    var slider = L.DomUtil.create("input", "range-slider");
	    L.DomEvent.addListener(slider, 'mousedown', function(e) {
		L.DomEvent.stopPropagation(e);
	    });

	    $(slider)
		.attr({'type': 'range',
		       'max': timestamps[timestamps.length - 1],
		       'min': timestamps[0],
		       'step': 1,
		       'value': String(timestamps[0])})
		.on('input change', function() {
		    updatePropSymbols($(this).val().toString());
		    $(".temporal-legend").text(this.value);
		});
	    
	    return slider;
	}

	sliderControl.addTo(map);
	createTemporalLegend(timestamps[0]);
    }

    function createTemporalLegend(startTimestamp) {
	var temporalLegend = L.control({position: 'bottomleft'});

	temporalLegend.onAdd = function(map) {
	    var output = L.DomUtil.create("output", "temporal-legend");
	    $(output).text(startTimestamp);
	    return output;
	}

	temporalLegend.addTo(map);
    }
});
