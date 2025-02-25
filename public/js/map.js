var map = L.map('map').setView(listing.geometry.coordinates, 13); // Set the initial location and zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

console.log(listing);

const customIcon = L.divIcon({
  className: 'custom-div-icon', // Custom CSS class for styling
  html: '<i class="fa-regular fa-compass" style="font-size: 40px; color: red;"></i>', // Insert your FontAwesome icon HTML
  iconSize: [40, 40], // Optional: Size of the div
  popupAnchor: [0, -20] // Adjust popup position
});



var marker = L.marker(listing.geometry.coordinates,{ icon: customIcon }).addTo(map);
marker.bindPopup(`<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`).openPopup();