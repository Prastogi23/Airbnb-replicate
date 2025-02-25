const apiKey = process.env.apikey;

module.exports.geocoding = async function getCoordinates(address) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        console.log(data.results[0].geometry                );
        return [lat, lng ];
      } else {
        console.error('No results found for', address);
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      return null;
    }
  }

