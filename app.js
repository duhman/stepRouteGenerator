mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFubWFydGVuIiwiYSI6ImNsdTN3aWxweTA1N3Uyam1nc3k2M2J4aXIifQ.-ZZy6VicYz_i2MfOqCO2hQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.0066, 40.7135], // Example coordinates (New York City)
    zoom: 13
});

function convertStepsToDistance(steps) {
    return steps / 1250; // Convert steps to kilometers
}

function generateRoute() {
    const steps = document.getElementById('stepsInput').value;
    const distance = convertStepsToDistance(steps);
    // Placeholder for route generation logic
    console.log(`Generating route for ${distance} kilometers`);
}