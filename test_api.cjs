const https = require('https');

const API_KEY = 'AIzaSyB_teXSLrTZxADDGkoxtGU60aD9zEBZbIU';
const query = encodeURIComponent('Doolally pub');

const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('STATUS:', json.status);
      if (json.error_message) {
        console.log('ERROR MESSAGE:', json.error_message);
      }
      if (json.results) {
        console.log(`FOUND ${json.results.length} RESULTS.`);
      }
    } catch (e) {
      console.log('Failed to parse response:', data);
    }
  });
}).on('error', (e) => {
  console.error('Request error:', e.message);
});
