function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let location = {lat: -12.009037,
    lng: -77.045510};

  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: location
  });

  directionsDisplay.setMap(map);

  // Añade marcador
  let myMarker = new google.maps.Marker({
    position: location,
    map: map
  });

  // autocompletado:
  let startPoint = document.getElementById('input1');
  let finalPoint = document.getElementById('input2');
  new google.maps.places.Autocomplete(startPoint);
  new google.maps.places.Autocomplete(finalPoint);

  // obtener ruta:
  let getRoute = (event) => {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('route').addEventListener('click', getRoute);
}

let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
  directionsService.route({
    origin: document.getElementById('input1').value,
    destination: document.getElementById('input2').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      let distance = Number((response.routes[0].legs[0].distance.text.replace('km', '')).replace(',', '.'));
      localStorage.distance = distance;
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Estamos teniendo inconvenientes para encontrar su ubicación');
    }   
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
  });
};