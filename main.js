mapboxgl.accessToken = 'pk.eyJ1IjoicG1hdGhldyIsImEiOiJjamR5aXJmeDIwNHQzMnFzMWxzOTdubTloIn0.eAYLsNu4Kd2UbLU9fLcuDw';

var chapters = {
    'part-1': {
        center: [82.8, 23.88],
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
    },
    'part-2': {
        center: [96.420066, 28.365358],
        zoom: 9,
        bearing: 0,
        pitch: 52,
    },
    'part-3': {
        center: [86.586872, 26.873760],
        zoom: 9,
        bearing: 0,
        pitch: 52,
    },
    'part-4': {
        center: [95.659549, 24.003677],
        zoom: 9,
        bearing: 0,
        pitch: 52,
    }
};

var map;

window.onload = function() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/pmathew/cjff56k8rb8mu2rs55ycs27f2',
        center: [82.8, 23.88],
        zoom: 4,
        bearing: 0,
        pitch: 0,
    });


map.on('click', 'earthquakes', function(e){
    var place = e.features[0].properties.place;
    console.log(place)
    if (place == "eastern Xizang-India border region"){
        setActiveChapter('part-2');
        var top = document.getElementById('part-2').offsetTop; //Getting Y of target element
        window.scrollTo(0, top+5);         
    }
    
    if (place == "Nepal-India border region"){
        setActiveChapter('part-3');
        var top = document.getElementById('part-3').offsetTop; //Getting Y of target element
        window.scrollTo(0, top);         
    }
    if (place == "Myanmar"){
        setActiveChapter('part-4');
        var top = document.getElementById('part-4').offsetTop; //Getting Y of target element
        window.scrollTo(0, top);         
    }
});
    
var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });

    map.on('mouseenter', 'earthquakes', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML('<h3>' + e.features[0].properties.place + '</h3><p>Magnitude: ' + e.features[0].properties.mag + '</p>')
            .addTo(map);
    });

    map.on('mouseleave', 'earthquakes', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

}

// On every scroll event, check which element is on screen
window.onscroll = function() {
    var chapterNames = Object.keys(chapters);
    console.log(chapterNames);
    for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};


var activeChapterName = 'part-1';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

