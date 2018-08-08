const searchLocals = document.getElementById('search-locals');
const cardRow = document.getElementById('card-row')
let map, infoWindow;

//inicializdor del mapa con geolocalizador
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
            types: ['restaurant', 'cafe']
        };
        //usando google Places para buscar restaurantes cercanos, se crearán marcadores para imprimir la info de cada local
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(sendRequest, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
            //buscador de locales
            const filterCards = (results, search) => {
                return results.filter((option) => {
                    return option.name.toLowerCase().indexOf(search.toLowerCase()) > -1
                })
            }

            searchLocals.addEventListener('keyup', () => {
                const data = searchLocals.value;
                let dataResult = filterCards(results, data);
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
        infoWindow.open(map, marker);
    });
}

const createCardRow = (place) => {
    let photos = place.photos;
    if (!photos) {
        return;
    }
    cardRow.innerHTML += `
    <div class="col s6 m4 l3 card">
        <div class="card-image">
          <img class="activator responsive-img" src="${photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 250 })}">
        </div>
        <div class="card-content">
          <span class="card-title">${place.name}</span>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${place.name}<i class="material-icons right">close</i></span>
          <p>Rating: ${place.rating} puntos</p>
          <p>Dirección: ${place.vicinity} </p>
          <p>Dirección: ${place.locationUser} </p>
          <div style="width: 100px; height: 100px;" id="map_canvas${place.id}"></div>
         </div>
      </div>
      `
      
}





