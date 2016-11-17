var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
});


var map = L.map('map')
    .addLayer(mapboxTiles)
    .setView([40.72332345541449, -73.99], 10);
    