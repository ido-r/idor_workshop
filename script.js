mapboxgl.accessToken = 'pk.eyJ1IjoiaWRvcm9ldCIsImEiOiJja25vZDRqZ3Iwem1lMnZreHN2Z3dwZG85In0.gNd1loGLGIphBL8sk_dMNA';

navigator.geolocation.getCurrentPosition(successLocation,
     errorLocation, {enableHighAccuracy: true})

function successLocation(postion){
    console.log(postion)
    setupMap([postion.coords.longitude, postion.coords.latitude])
}

function errorLocation(){
    setupMap([34.7818, 32.0853])
}

var places = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'icon': 'theatre'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.038659, 38.931567]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'theatre'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.003168, 38.894651]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'bar'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.090372, 38.881189]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'bicycle'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.052477, 38.943951]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'music'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.031706, 38.914581]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'music'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.020945, 38.878241]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'icon': 'music'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-77.007481, 38.876516]
            }
        },
    ]
};
var filterGroup = document.getElementById('filter-group');

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        //center: [-77.04, 38.907],
        center : center,
        zoom: 17
    })

    const nav = new mapboxgl.NavigationControl();
    //Add +,- and rotate
    map.addControl(nav);

    // var directions = new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //   });
      
    // map.addControl(directions, 'top-left');     

    map.on('load', function () {
        // Add a GeoJSON source containing place coordinates and information.
        map.addSource('places', {
            'type': 'geojson',
            'data': places
        });

        places.features.forEach(function (feature) {
            var symbol = feature.properties['icon'];
            var layerID = 'poi-' + symbol;

            // Add a layer for this symbol type if it hasn't been added already.
            if (!map.getLayer(layerID)) {
                map.addLayer({
                    'id': layerID,
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': symbol + '-15',
                        'icon-allow-overlap': true
                    },
                    'filter': ['==', 'icon', symbol]
                });

                // Add checkbox and label elements for the layer.
                var input = document.createElement('input');
                input.type = 'checkbox';
                input.id = layerID;
                input.checked = true;
                filterGroup.appendChild(input);

                var label = document.createElement('label');
                label.setAttribute('for', layerID);
                label.textContent = symbol;
                filterGroup.appendChild(label);

                // When the checkbox changes, update the visibility of the layer.
                input.addEventListener('change', function (e) {
                    map.setLayoutProperty(
                        layerID,
                        'visibility',
                        e.target.checked ? 'visible' : 'none'
                    );
                });
            }
        });
    });


    map.on('contextmenu', function(e) {
        var geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: e.lngLat
              },
              properties: {
                description: 'DOR IS THE BOSS',
                icon: 'new-entry',
                title: 'marker'
              }
            }]
          };
        
         // add markers to map
        geojson.features.forEach(function(marker) {
            var el = document.createElement('div');
            el.className = 'marker';
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                    '<h3>' +
                    marker.properties.title +
                    '</h3><p>' +
                    marker.properties.description +
                    '</p>'
                    ) 
            )
            .addTo(map);
        });  
    });  
}

