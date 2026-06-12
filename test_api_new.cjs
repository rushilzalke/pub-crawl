const https = require('https');

const API_KEY = 'AIzaSyB_teXSLrTZxADDGkoxtGU60aD9zEBZbIU';
const query = 'Doolally pub';

const data = JSON.stringify({
  textQuery: query
});

const options = {
  hostname: 'places.googleapis.com',
  path: '/v1/places:searchText',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.photos',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => { responseData += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(responseData);
      if (json.error) {
        console.log('ERROR:', json.error.message);
      } else {
        console.log(`FOUND ${json.places ? json.places.length : 0} RESULTS.`);
        if (json.places && json.places.length > 0) {
          console.log(json.places[0]);
        }
      }
    } catch (e) {
      console.log('Parse error:', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(data);
req.end();
