import { useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

export const usePubSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchPubs = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE' || API_KEY.startsWith('AIza')) {
      setTimeout(() => {
        setResults([
          {
            id: `mock-${Math.random()}`,
            name: `${query} Tavern`,
            address: `123 Fake St, Cyber City`,
            photoUrl: `https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80`,
            mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(query + ' Tavern')}`
          },
          {
            id: `mock-${Math.random()}`,
            name: `The Neon ${query} Pub`,
            address: `456 Glitch Ave, Neo Tokyo`,
            photoUrl: `https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&q=80`,
            mapsUrl: `https://maps.google.com/?q=${encodeURIComponent('The Neon ' + query + ' Pub')}`
          }
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.photos'
        },
        body: JSON.stringify({
          textQuery: `${query} pub bar`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }

      if (data.places && data.places.length > 0) {
        const parsed = data.places.slice(0, 10).map(place => {
          let photoUrl = 'https://via.placeholder.com/400x300/050510/ff006e?text=No+Image';
          
          if (place.photos && place.photos.length > 0) {
            // Using the Places API (New) media endpoint which supports direct image retrieval
            photoUrl = `https://places.googleapis.com/v1/${place.photos[0].name}/media?key=${API_KEY}&maxWidthPx=400&maxHeightPx=300`;
          }
          
          return {
            id: place.id,
            name: place.displayName?.text || 'Unknown Pub',
            address: place.formattedAddress,
            photoUrl,
            mapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.id}`
          };
        });
        setResults(parsed);
      } else {
        setError('No results found for this search.');
        setResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(`Search failed: ${err.message}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { searchPubs, results, loading, error };
};
