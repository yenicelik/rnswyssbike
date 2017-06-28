import {observable, computed} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from '../firebase.js';


class MarkersStore {
  @observable markers = [];

  constructor() {
      console.log("Started downloading markers");
      var localMarkers = [];
      Fb.bikes.on('value', (snap) => {
        localMarkers = [];
        snap.forEach((marker) => {
          console.log("Marker bike number is: ");
          console.log(marker.val().bike_no);
            localMarkers.push({
              longitude: parseFloat(marker.val().positionLng),
              latitude: parseFloat(marker.val().positionLat),
              description: "Bike 1",
              title: "b" + String(marker.val().bike_no),
              bike_no: marker.val().bike_no,
              cur_user: marker.val().current_user,
              key: marker.getKey()
            })
        });
        //Once must make sure that the upper command already finished executing!
        this.markers.replace(localMarkers);
        console.log("Loaded markers");
      });
  }

}

let markersStore;
export function getMarkersStore() {
  if (!markersStore) {
    markersStore = new MarkersStore();
  }
  return markersStore;
}
