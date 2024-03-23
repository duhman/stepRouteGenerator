function generateRoute() {
    const steps = parseInt(document.getElementById('stepsInput').value);
    const distanceKm = convertStepsToDistance(steps); // Convert steps to kilometers
    const userPosition = map.getCenter();

    // Simplification: Assume each step is approximately 0.0008 kilometers.
    // Calculate a rough destination point directly east (longitude) for simplicity.
    // This is a very basic approximation and should be adjusted based on your application's accuracy needs.
    const destination = [userPosition.lng + (0.0008 * steps / 1000), userPosition.lat];

    // Remove previous route from the map if it exists
    if (map.getLayer('route')) {
        map.removeLayer('route');
        map.removeSource('route');
    }

    // Construct a request to the Mapbox Directions API
    const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/walking/${userPosition.lng},${userPosition.lat};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    // Fetch the route from the Mapbox Directions API
    fetch(directionsRequest)
        .then(response => response.json())
        .then(data => {
            if (data.routes.length > 0) {
                const route = data.routes[0].geometry;
                // Display the route on the map
                map.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: route
                    }
                });

                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
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