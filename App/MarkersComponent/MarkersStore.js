import {observable, computed} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from '../firebase.js';


class MarkersStore {
  //@observable markers = [];
  @observable markers = [];

  constructor() {
      console.log("Started downloading markers");
      var localMarkers = [];
      Fb.bikes.on('value', (snap) => {
        localMarkers = [];
        snap.forEach((marker) => {
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

  @computed get getMarkers() {
    console.log("Getting markers.. which are:");
    console.log(JSON.stringify(markers));
    return this.markers.slice();
  }

  @computed get getValidMarkers() {
    return this.markers.slice() //.filter( (marker) => marker.cur_user == 0 )
  }

}

let markersStore;
export function getMarkersStore() {
  if (!markersStore) {
    markersStore = new MarkersStore();
  }
  return markersStore;
}