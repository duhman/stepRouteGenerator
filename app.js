mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFubWFydGVuIiwiYSI6ImNsdTN3aWxweTA1N3Uyam1nc3k2M2J4aXIifQ.-ZZy6VicYz_i2MfOqCO2hQ';

let map; // Define global map variable to be initialized after user's location is obtained

function convertStepsToDistance(steps) {
    return steps / 1250; // Convert steps to kilometers
}

// Function to initialize the map centered on the user's location
function initMap(longitude, latitude) {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 14
    });
}

// Attempt to obtain the user's current position and initialize the map with it
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        initMap(position.coords.longitude, position.coords.latitude);
    }, () => {
        console.error("Geolocation is supported, but it failed");
        // Fallback location if geolocation fails
        initMap(-74.0066, 40.7135); // Example: New York City
    });
} else {
    console.error("Geolocation is not supported by this browser.");
    // Fallback location if geolocation is not supported
    initMap(-74.0066, 40.7135);
}

function generateRoute() {
    const steps = parseInt(document.getElementById('stepsInput').value);
    const distanceKm = convertStepsToDistance(steps);
    const userPosition = map.getCenter();

    // Placeholder: Logic to calculate a destination point should be implemented here
    const destination = [userPosition.lng + 0.01, userPosition.lat + 0.01];

    // Construct a request to the Mapbox Directions API
    const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/walking/${userPosition.lng},${userPosition.lat};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    // Fetch the route from the Mapbox Directions API
    fetch(directionsRequest)
        .then(response => response.json())
        .then(data => {
            if (data.routes.length > 0) {
                const route = data.routes[0].geometry;
                // Display the route on the map
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: route
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#888',
                        'line-width': 8
                    }
                });
            } else {
                console.error('No route found');
            }
        })
        .catch(err => console.error('Directions API error:', err));
}