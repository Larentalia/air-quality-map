// Configuration
const CONFIG = {
    // Mapbox token
    mapboxToken: 'pk.eyJ1IjoiYmVnb3Blbm9uIiwiYSI6ImNtaDRscmg5eTEzd3cya3NocGlwYnlna2cifQ.9L4j5ak5j0o9lCIiRJ1csQ',
   
        // WAQI API token
    waqiToken: 'f5dbc59413842f4440b30b1e64ea41a9d71a5ec7',

    // Map center (Madrid!)
    center: [-3.7038, 40.4168],
    zoom: 6,
    
    // Update interval (30 minutes - WAQI data updates hourly)
    updateInterval: 30 * 60 * 1000,

   // Spanish cities to monitor
    cities: [
        'madrid',
        'barcelona', 
        'valencia',
        'sevilla',
        'zaragoza',
        'malaga',
        'murcia',
        'palma',
        'bilbao',
        'alicante',
        'cordoba',
        'valladolid',
        'vigo',
        'gijon',
        'hospitalet',
        'granada',
        'tarragona',
        'badajoz',
        'santander',
        'pamplona'
    ]
};

// Initialize Mapbox
mapboxgl.accessToken = CONFIG.mapboxToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: CONFIG.center,
    zoom: CONFIG.zoom
});

// Store for air quality data
let airQualityData = {
    type: 'FeatureCollection',
    features: []
};

// Fetch real-time air quality data from WAQI
async function fetchAirQualityData() {
    try {
        updateStatus('Fetching real-time data from WAQI...', true);
        
        const newFeatures = [];
        let successCount = 0;
        let errorCount = 0;
        
        // Fetch data for each city
        for (const city of CONFIG.cities) {
            try {
                const response = await fetch(
                    `https://api.waqi.info/feed/${city}/?token=${CONFIG.waqiToken}`
                );
                
                if (!response.ok) {
                    console.warn(`Failed to fetch data for ${city}`);
                    errorCount++;
                    continue;
                }
                
                const data = await response.json();
                
                if (data.status === 'ok' && data.data) {
                    const station = data.data;
                    
                    // Extract coordinates
                    const lat = station.city.geo[0];
                    const lon = station.city.geo[1];
                    
                    // Extract measurements
                    const measurements = [];
                    if (station.iaqi) {
                        if (station.iaqi.pm25) {
                            measurements.push({
                                parameter: 'PM2.5',
                                value: station.iaqi.pm25.v,
                                unit: 'AQI'
                            });
                        }
                        if (station.iaqi.pm10) {
                            measurements.push({
                                parameter: 'PM10',
                                value: station.iaqi.pm10.v,
                                unit: 'AQI'
                            });
                        }
                        if (station.iaqi.no2) {
                            measurements.push({
                                parameter: 'NO2',
                                value: station.iaqi.no2.v,
                                unit: 'AQI'
                            });
                        }
                        if (station.iaqi.o3) {
                            measurements.push({
                                parameter: 'O3',
                                value: station.iaqi.o3.v,
                                unit: 'AQI'
                            });
                        }
                        if (station.iaqi.so2) {
                            measurements.push({
                                parameter: 'SO2',
                                value: station.iaqi.so2.v,
                                unit: 'AQI'
                            });
                        }
                        if (station.iaqi.co) {
                            measurements.push({
                                parameter: 'CO',
                                value: station.iaqi.co.v,
                                unit: 'AQI'
                            });
                        }
                    }
                    
                    // Create feature
                    const feature = {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        },
                        properties: {
                            name: station.city.name,
                            city: station.city.name,
                            country: 'Spain',
                            aqi: station.aqi,
                            measurements: measurements,
                            lastUpdated: station.time.iso,
                            dominentpol: station.dominentpol || 'N/A'
                        }
                    };
                    
                    newFeatures.push(feature);
                    successCount++;
                    
                } else {
                    console.warn(`No data available for ${city}`);
                    errorCount++;
                }
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.error(`Error fetching ${city}:`, error);
                errorCount++;
            }
        }
        
        // Update the data
        airQualityData.features = newFeatures;
        
        if (successCount > 0) {
            updateMap();
            updateStatus(`${successCount} stations loaded (Live data!) 🟢`, false);
            updateLastUpdateTime();
        } else {
            updateStatus(`Failed to load data. Check API token.`, false);
        }
        
        console.log(`Loaded ${successCount} stations, ${errorCount} errors`);
        
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        updateStatus('Error loading data. Will retry...', false);
    }
}


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
                    5, 6,
                    8, 10,
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

        // Add click handler for popups
        map.on('click', 'air-quality-circles', (e) => {
            const feature = e.features[0];
            const props = feature.properties;
            const measurements = typeof props.measurements === 'string' 
                ? JSON.parse(props.measurements) 
                : props.measurements;
            
            let measurementHTML = '';
            if (measurements && measurements.length > 0) {
                measurementHTML = measurements
                    .map(m => `<li><strong>${m.parameter}:</strong> ${m.value} ${m.unit}</li>`)
                    .join('');
            } else {
                measurementHTML = '<li>No detailed measurements available</li>';
            }
            
            const category = getAQICategory(props.aqi);
            const categoryColor = getAQIColor(props.aqi);

            new mapboxgl.Popup()
                .setLngLat(feature.geometry.coordinates)
                .setHTML(`
                 <div style="min-width: 200px;">
                        <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #333;">
                            📍 ${props.name}
                        </h3>
                        <div style="background: ${categoryColor}; padding: 8px; border-radius: 4px; margin-bottom: 10px;">
                            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #fff; text-align: center;">
                                AQI: ${props.aqi}
                            </p>
                            <p style="margin: 5px 0 0 0; font-size: 12px; color: #fff; text-align: center;">
                                ${category}
                            </p>
                        </div>
                        <p style="margin: 5px 0; font-size: 12px; color: #666;">
                            <strong>Dominant Pollutant:</strong> ${props.dominentpol.toUpperCase()}
                        </p>
                        <p style="margin: 5px 0; font-size: 12px; color: #666;">
                            <strong>Location:</strong> ${props.city}, ${props.country}
                        </p>
                        <ul style="margin: 10px 0; padding-left: 20px; font-size: 12px; color: #333;">
                            ${measurementHTML}
                        </ul>
                        <p style="margin: 5px 0; font-size: 11px; color: #999;">
                            🕐 Updated: ${new Date(props.lastUpdated).toLocaleString()}
                        </p>
                        <p style="margin: 5px 0; font-size: 10px; color: #999; font-style: italic;">
                            Data from World Air Quality Index
                        </p>
                    </div>
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

function getAQIColor(aqi) {
    if (aqi <= 50) return '#00e400'; // Good
    if (aqi <= 100) return '#ffff00'; // Moderate
    if (aqi <= 150) return '#ff7e00'; // Unhealthy for Sensitive Groups
    if (aqi <= 200) return '#ff0000'; // Unhealthy
    if (aqi <= 300) return '#8f3f3f'; // Very Unhealthy
    return '#000000'; // Default to Hazardous
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

// Initial data fetch
map.on('load', () => {
    // Fetch data immediately
    fetchAirQualityData();
    
    // Auto-refresh every 30 minutes
    setInterval(fetchAirQualityData, CONFIG.updateInterval);
});

map.on('error', (e) => {
    console.error('Map error:', e);
    if (e.error && e.error.message && e.error.message.includes('accessToken')) {
        updateStatus('⚠️ Please add your Mapbox token in app.js', false);
    }
});

// Log for debugging
console.log('Map initialized - fetching real-time WAQI data...');
console.log('Monitoring cities:', CONFIG.cities);
