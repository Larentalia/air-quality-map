# 🌍 Air Quality Map

**Live Demo:** [https://larentalia.github.io/air-quality-map/](https://larentalia.github.io/air-quality-map/)

An interactive real-time air quality visualization map showing monitoring stations across Spain. Built with Mapbox GL JS.

![Air Quality Map Screenshot](https://img.shields.io/badge/Status-Live-brightgreen)

---

## 📊 Features

- **Interactive Map**: Click on any station to see detailed air quality measurements
- **Color-Coded Stations**: Visual representation of air quality levels
  - 🟢 Green (0-50): Good
  - 🟡 Yellow (51-100): Moderate
  - 🟠 Orange (101-150): Unhealthy for Sensitive Groups
  - 🔴 Red (151-200): Unhealthy
  - 🟣 Purple (201-300): Very Unhealthy
  - 🔴 Dark Red (301+): Hazardous
- **Multiple Cities**: Covers major Spanish cities including Madrid, Barcelona, Valencia, Zaragoza, Tarragona, and more
- **Responsive Design**: Works on desktop and mobile devices

---

## 🗺️ Current Locations

The map currently includes **20 monitoring stations** across Spain:

### Madrid (5 stations)
- Plaza de España
- Retiro Park
- Casa de Campo
- Atocha Station
- Moncloa
- Vallecas
- Chamartín
- Usera

### Barcelona (2 stations)
- Barcelona Centro
- Gràcia

### Other Major Cities
- Valencia Centro
- Zaragoza Centro & Delicias
- Sevilla Centro
- Bilbao Centro
- Málaga Centro
- Tarragona Centro & Port de Tarragona
- Miami Platja & Montroig del Camp

---

## ➕ How to Add New Locations

Want to add a monitoring station for your city or neighborhood? Follow these steps:

### Step 1: Find Your Coordinates

Get the latitude and longitude of your location:
- Use [Google Maps](https://www.google.com/maps): Right-click on the location → Click the coordinates to copy them
- Or use [LatLong.net](https://www.latlong.net/)

**Example:** Madrid center is `40.4168, -3.7038`

### Step 2: Edit `app.js`

1. Open `app.js` in your code editor
2. Find the `sampleMadridData` section (around line 25)
3. Scroll to the end of the `features` array (before the closing `]`)
4. Add a comma after the last station entry
5. Paste this template:

```javascript
        ,
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [LONGITUDE, LATITUDE] },
            properties: {
                name: 'Station Name',
                city: 'City Name',
                country: 'Spain',
                aqi: 45,  // Air Quality Index (0-500)
                measurements: [
                    { parameter: 'PM2.5', value: 12, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 25, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        }
```

### Step 3: Customize Your Station

Replace the template values:
- `LONGITUDE, LATITUDE`: Your coordinates (⚠️ **Important:** Longitude comes FIRST, then Latitude!)
- `Station Name`: Name of the location (e.g., "Salamanca District")
- `City Name`: City name
- `aqi`: Air quality index value (0-500)
  - 0-50 = Good (green)
  - 51-100 = Moderate (yellow)
  - 101-150 = Unhealthy for Sensitive (orange)
  - 151-200 = Unhealthy (red)
  - 201-300 = Very Unhealthy (purple)
  - 301+ = Hazardous (dark red)

### Step 4: Save and Test

1. Save the file
2. Commit and push to GitHub:
   ```bash
   git add app.js
   git commit -m "Added [Location Name] station"
   git push
   ```
3. Wait 1-2 minutes for GitHub Pages to update
4. Refresh your live site!

### Complete Example

Adding a station for "Alicante Centro":

```javascript
        ,
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [-0.4814, 38.3460] },
            properties: {
                name: 'Alicante Centro',
                city: 'Alicante',
                country: 'Spain',
                aqi: 52,
                measurements: [
                    { parameter: 'PM2.5', value: 15, unit: 'µg/m³' },
                    { parameter: 'PM10', value: 28, unit: 'µg/m³' }
                ],
                lastUpdated: new Date().toISOString()
            }
        }
```

---

## ➖ How to Remove Locations

### Step 1: Find the Station

1. Open `app.js`
2. Search for the station name (Ctrl+F or Cmd+F)
3. Find the entire station object (starts with `{` and ends with `}`)

### Step 2: Delete the Entry

1. Select the entire station object including:
   - The opening `{`
   - All the content
   - The closing `}`
   - The comma before or after (but leave one comma between remaining stations)

### Step 3: Save and Deploy

1. Save the file
2. Commit and push:
   ```bash
   git add app.js
   git commit -m "Removed [Location Name] station"
   git push
   ```
3. Wait for GitHub Pages to update

### Example

To remove "Málaga Centro", delete this entire block:

```javascript
        ,
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
        }
```

⚠️ **Warning:** Make sure to keep proper comma separation between remaining stations!

---

## 🛠️ Technical Setup

### Prerequisites
- Mapbox account (free at [mapbox.com](https://account.mapbox.com/))
- Basic text editor or VS Code
- Git installed

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/larentalia/air-quality-map.git
   cd air-quality-map
   ```

2. **Add your Mapbox token:**
   - Open `app.js`
   - Replace `YOUR_MAPBOX_TOKEN_HERE` with your actual Mapbox access token
   - Get your token from: https://account.mapbox.com/access-tokens/

3. **Run locally:**
   - Open `index.html` in a web browser, or
   - Use Live Server in VS Code, or
   - Run a local server:
     ```bash
     python3 -m http.server 8000
     ```

### Deployment

The project is automatically deployed to GitHub Pages:
- Push changes to the `main` branch
- GitHub Pages rebuilds automatically
- Changes are live in 1-2 minutes

---

## 📁 Project Structure

```
air-quality-map/
├── index.html          # Main HTML page with map container and UI
├── app.js              # JavaScript logic, data, and Mapbox configuration
└── README.md           # This file
```

---

## 🎨 Customization

### Change Map Style

In `app.js`, modify the map style (line ~30):

```javascript
style: 'mapbox://styles/mapbox/light-v11',  // Current style
```

Available styles:
- `light-v11` - Light (current)
- `dark-v11` - Dark theme
- `streets-v12` - Detailed streets
- `outdoors-v12` - Topographic
- `satellite-v9` - Satellite imagery

### Adjust Map Center and Zoom

In `app.js`, modify these values (line ~10-11):

```javascript
center: [-3.7038, 40.4168],  // [longitude, latitude]
zoom: 6,                     // Zoom level (higher = more zoomed in)
```

### Change Circle Size

In `app.js`, find the `circle-radius` property (around line 180):

```javascript
'circle-radius': [
    'interpolate',
    ['linear'],
    ['zoom'],
    8, 8,      // At zoom level 8, radius = 8px
    12, 16,    // At zoom level 12, radius = 16px
    16, 24     // At zoom level 16, radius = 24px
],
```

---

## 🐛 Troubleshooting

### Map doesn't load
- Check if your Mapbox token is correct in `app.js`
- Open browser console (F12) to see error messages
- Verify you're using a public Mapbox token (starts with `pk.`)

### Stations don't appear
- Check the browser console for JavaScript errors
- Verify your GeoJSON syntax is correct (commas, brackets, etc.)
- Make sure coordinates are in [longitude, latitude] order

### Changes don't show on live site
- Wait 1-2 minutes after pushing to GitHub
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check GitHub Actions to see if deployment succeeded

---

## 📚 Technologies Used

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) - Interactive mapping library
- [GeoJSON](https://geojson.org/) - Geographic data format
- [GitHub Pages](https://pages.github.com/) - Free hosting
- Vanilla JavaScript - No frameworks needed!

---

## 🎯 Future Enhancements

Ideas for future development:
- [ ] Connect to real-time air quality APIs
- [ ] Add historical data and trends
- [ ] Implement time slider for playback
- [ ] Add search functionality
- [ ] Create heatmap visualization
- [ ] Add filter controls (by AQI level, city, etc.)
- [ ] Show weather overlays
- [ ] Export data to CSV
- [ ] User contributions for new stations

---

## 🤝 Contributing

Want to contribute? Great!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**larentalia**
- GitHub: [@larentalia](https://github.com/larentalia)
- Project Link: [https://github.com/larentalia/air-quality-map](https://github.com/larentalia/air-quality-map)

---

## 🙏 Acknowledgments

- [Mapbox](https://www.mapbox.com/) for the amazing mapping platform
- Inspired by NYT's interactive data visualizations
- Air quality data standards from EPA and WHO

---

## 📞 Support

If you have questions or need help:
- Open an [Issue](https://github.com/larentalia/air-quality-map/issues)
- Check the [Mapbox documentation](https://docs.mapbox.com/)

---

**Enjoy mapping! 🗺️✨**