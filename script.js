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

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 17
    })

    const nav = new mapboxgl.NavigationControl();
    //Add +,- and rotate
    map.addControl(nav);

    // var directions = new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //   });
      
    // map.addControl(directions, 'top-left');     

    map.on('contextmenu', function(e) {
        console.log('A click event has occurred at ' + e.lngLat);
        
        var geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: e.lngLat
              },
              properties: {
                title: 'Mapbox',
                description: 'DOR IS THE BOSS',
                icon: 'bar'
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

