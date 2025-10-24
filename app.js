// Configuration
const CONFIG = {
    // IMPORTANT: Add your Mapbox token here!
    mapboxToken: 'pk.eyJ1IjoiYmVnb3Blbm9uIiwiYSI6ImNtaDRscmg5eTEzd3cya3NocGlwYnlna2cifQ.9L4j5ak5j0o9lCIiRJ1csQ',
    
    // Map center (Madrid!)
    center: [-3.7038, 40.4168],
    zoom: 6,
    
    // Update interval (5 minutes)
    updateInterval: 5 * 60 * 1000
};

// Initialize Mapbox
mapboxgl.accessToken = CONFIG.mapboxToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: CONFIG.center,
    zoom: CONFIG.zoom
});

// Sample air quality data covering more of Spain
const sampleMadridData = {
    type: 'FeatureCollection',
    features: [
        // Madrid stations
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.7038, 40.4168] },
            properties: {
                name: 'Plaza de España',
                city: 'Madrid',
                country: 'Spain',
                aqi: 45,
                measurements: [
                    { parameter: 'PM2.5', value: 12, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 25, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.6889, 40.4378] },
            properties: {
                name: 'Retiro Park',
                city: 'Madrid',
                country: 'Spain',
                aqi: 32,
                measurements: [
                    { parameter: 'PM2.5', value: 8, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 18, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.7174, 40.4230] },
            properties: {
                name: 'Casa de Campo',
                city: 'Madrid',
                country: 'Spain',
                aqi: 28,
                measurements: [
                    { parameter: 'PM2.5', value: 7, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 15, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.6915, 40.4200] },
            properties: {
                name: 'Atocha Station',
                city: 'Madrid',
                country: 'Spain',
                aqi: 78,
                measurements: [
                    { parameter: 'PM2.5', value: 28, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 45, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Barcelona stations
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [2.1734, 41.3851] },
            properties: {
                name: 'Barcelona Centro',
                city: 'Barcelona',
                country: 'Spain',
                aqi: 62,
                measurements: [
                    { parameter: 'PM2.5', value: 22, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 38, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [2.1543, 41.3977] },
            properties: {
                name: 'Gràcia, Barcelona',
                city: 'Barcelona',
                country: 'Spain',
                aqi: 48,
                measurements: [
                    { parameter: 'PM2.5', value: 13, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 26, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Valencia
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-0.3763, 39.4699] },
            properties: {
                name: 'Valencia Centro',
                city: 'Valencia',
                country: 'Spain',
                aqi: 55,
                measurements: [
                    { parameter: 'PM2.5', value: 18, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 32, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Zaragoza (your city!)
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-0.8891, 41.6488] },
            properties: {
                name: 'Zaragoza Centro',
                city: 'Zaragoza',
                country: 'Spain',
                aqi: 42,
                measurements: [
                    { parameter: 'PM2.5', value: 11, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 23, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-0.9067, 41.6561] },
            properties: {
                name: 'Delicias, Zaragoza',
                city: 'Zaragoza',
                country: 'Spain',
                aqi: 38,
                measurements: [
                    { parameter: 'PM2.5', value: 9, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 20, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Sevilla
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-5.9845, 37.3891] },
            properties: {
                name: 'Sevilla Centro',
                city: 'Sevilla',
                country: 'Spain',
                aqi: 58,
                measurements: [
                    { parameter: 'PM2.5', value: 20, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 35, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Bilbao
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-2.9253, 43.2630] },
            properties: {
                name: 'Bilbao Centro',
                city: 'Bilbao',
                country: 'Spain',
                aqi: 44,
                measurements: [
                    { parameter: 'PM2.5', value: 12, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 24, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Málaga
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-4.4214, 36.7213] },
            properties: {
                name: 'Málaga Centro',
                city: 'Málaga',
                country: 'Spain',
                aqi: 51,
                measurements: [
                    { parameter: 'PM2.5', value: 15, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 28, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Additional Madrid suburbs
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.7260, 40.4450] },
            properties: {
                name: 'Moncloa',
                city: 'Madrid',
                country: 'Spain',
                aqi: 95,
                measurements: [
                    { parameter: 'PM2.5', value: 34, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 52, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.6800, 40.4100] },
            properties: {
                name: 'Vallecas',
                city: 'Madrid',
                country: 'Spain',
                aqi: 110,
                measurements: [
                    { parameter: 'PM2.5', value: 42, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 65, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.7100, 40.4520] },
            properties: {
                name: 'Chamartín',
                city: 'Madrid',
                country: 'Spain',
                aqi: 52,
                measurements: [
                    { parameter: 'PM2.5', value: 15, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 28, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-3.6950, 40.3950] },
            properties: {
                name: 'Usera',
                city: 'Madrid',
                country: 'Spain',
                aqi: 135,
                measurements: [
                    { parameter: 'PM2.5', value: 52, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 78, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
       // Tarragona
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [1.2444, 41.1189] },
            properties: {
                name: 'Tarragona Centro',
                city: 'Tarragona',
                country: 'Spain',
                aqi: 35,
                measurements: [
                    { parameter: 'PM2.5', value: 9, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 19, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [1.2550, 41.1350] },
            properties: {
                name: 'Port de Tarragona',
                city: 'Tarragona',
                country: 'Spain',
                aqi: 48,
                measurements: [
                    { parameter: 'PM2.5', value: 13, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 27, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        
        // Miami Platja - Montroig del Camp
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0.9465, 41.0112] },
            properties: {
                name: 'Miami Platja',
                city: 'Montroig del Camp',
                country: 'Spain',
                aqi: 25,
                measurements: [
                    { parameter: 'PM2.5', value: 6, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 14, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0.8950, 41.0050] },
            properties: {
                name: 'Montroig del Camp',
                city: 'Montroig del Camp',
                country: 'Spain',
                aqi: 22,
                measurements: [
                    { parameter: 'PM2.5', value: 5, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 12, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        }
    ]
};

let airQualityData = sampleMadridData;

function updateMap() {
    const source = map.getSource('air-quality');
    
    if (source) {
        source.setData(airQualityData);
    } else {
        map.addSource('air-quality', {
            type: 'geojson',
            data: airQualityData
        });
        
        map.addLayer({
            id: 'air-quality-circles',
            type: 'circle',
            source: 'air-quality',
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    8, 8,
                    12, 16,
                    16, 24
                ],
                'circle-color': [
                    'case',
                    ['<=', ['get', 'aqi'], 50], '#00e400',
                    ['<=', ['get', 'aqi'], 100], '#ffff00',
                    ['<=', ['get', 'aqi'], 150], '#ff7e00',
                    ['<=', ['get', 'aqi'], 200], '#ff0000',
                    ['<=', ['get', 'aqi'], 300], '#8f3f97',
                    '#7e0023'
                ],
                'circle-opacity': 0.8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });
        
        map.on('click', 'air-quality-circles', (e) => {
            const feature = e.features[0];
            const props = feature.properties;
            const measurements = typeof props.measurements === 'string' 
                ? JSON.parse(props.measurements) 
                : props.measurements;
            
            const measurementHTML = measurements
                .map(m => `<li>${m.parameter}: ${m.value.toFixed(1)} ${m.unit}</li>`)
                .join('');
            
            new mapboxgl.Popup()
                .setLngLat(feature.geometry.coordinates)
                .setHTML(`
                    <h3 style="margin: 0 0 10px 0; font-size: 16px;">${props.name}</h3>
                    <p style="margin: 5px 0; font-size: 14px;">
                        <strong>AQI: ${props.aqi}</strong> - ${getAQICategory(props.aqi)}
                    </p>
                    <p style="margin: 5px 0; font-size: 12px; color: #666;">
                        ${props.city}, ${props.country}
                    </p>
                    <ul style="margin: 10px 0; padding-left: 20px; font-size: 12px;">
                        ${measurementHTML}
                    </ul>
                    <p style="margin: 5px 0; font-size: 11px; color: #999;">
                        Updated: ${new Date(props.lastUpdated).toLocaleString()}
                    </p>
                `)
                .addTo(map);
        });
        
        map.on('mouseenter', 'air-quality-circles', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        
        map.on('mouseleave', 'air-quality-circles', () => {
            map.getCanvas().style.cursor = '';
        });
    }
}

function getAQICategory(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

function updateStatus(message, isLoading) {
    const statusEl = document.querySelector('.status');
    if (statusEl) {
        statusEl.innerHTML = isLoading 
            ? `<span class="loading">● ${message}</span>`
            : `<span style="color: #666;">● ${message}</span>`;
    }
}

function updateLastUpdateTime() {
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        lastUpdateEl.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }
}

map.on('load', () => {
    updateStatus(`${airQualityData.features.length} stations loaded`, false);
    updateMap();
    updateLastUpdateTime();
});

map.on('error', (e) => {
    console.error('Map error:', e);
});

console.log('Map initialized with sample data');