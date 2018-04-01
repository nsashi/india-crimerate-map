// define access token
mapboxgl.accessToken = 'pk.eyJ1IjoicG1hdGhldyIsImEiOiJjamZndjE5YnEzaGNzMnFtbWV1YzJxd2h2In0.xNYB4P4ljTh4ogGvlGNJ0A';

//create map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/pmathew/cjff56k8rb8mu2rs55ycs27f2' // map style URL from Mapbox Studio
});

// wait for map to load before adjusting it
map.on('load', function() {

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';

  
    // define layer names
    var layers = ['0-0.5', '0.5-0.55', '0.55-0.6', '0.6-0.65', '0.65-0.7', '0.7-0.75'];
    var colors = ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#31a354', '#006837'];

    // create legend
    for (i=0; i<layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });

    map.on('click', 'india-states-hdi', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML('<h3>' + e.features[0].properties.NAME_1 + '</h3><p>HDI: ' + e.features[0].properties.HDI + '</p>')
            .addTo(map);
    });

    map.on('mouseleave', 'earthquakes', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

});