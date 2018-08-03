// var map, infoWindow;
//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -34.397, lng: 150.644},
//           zoom: 15
//         });
//         infoWindow = new google.maps.InfoWindow;

//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('Estás aquí');
//             infoWindow.open(map);
//             map.setCenter(pos);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           handleLocationError(false, infoWindow, map.getCenter());
//         }
//       }

//       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
//         infoWindow.open(map);
//       }
const searchLocals = document.getElementById('search-locals');
const cardRow = document.getElementById('card-row')
let map, infoWindow;
window.initMap = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let locationUser = new google.maps.LatLng(latitude, longitude);
        let currentMap = {
            center: locationUser,
            zoom: 15,
        };
        map = new google.maps.Map(document.getElementById('map'), currentMap)
        infoWindow = new google.maps.InfoWindow();
        let sendRequest = {
            location: locationUser,
            radius: 800,
            types: ['restaurant']
        };

        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(sendRequest, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }

            const filterFood = (results, search) => {
                return results.filter((option) => {
                    return option.name.toLowerCase().indexOf(search.toLowerCase()) > -1
                })
            }

            searchLocals.addEventListener('keyup', () => {
                const data = searchLocals.value;
                let dataResult = filterFood(results, data);
                cardRow.innerHTML = ''
                dataResult.forEach(element => {
                    createCardRow(element);
                })
            })
        });
    });
}
const createMarker = (place) => {
    let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
    });
    createCardRow(place);
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}

const createCardRow = (place) => {
    let photos = place.photos;
    if (!photos) {
        return;
    }
    cardRow.innerHTML += `
    <div class="col s12 m6 l3 card">
        <div class="card-image">
          <img class="activator" src="${photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })}">
        </div>
        <div class="card-content">
          <span class="card-title">${place.name}</span>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${place.name}<i class="material-icons right">close</i></span>
          <p>Rating: ${place.rating} puntos</p>
          <div style="width: 100px; height: 100px;"id="${place.id}"></div>
         </div>
      </div>
      `
}





