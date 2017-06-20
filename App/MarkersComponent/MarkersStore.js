import {observable, computed} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from '../firebase.js';


class MarkersStore {
  //@observable markers = [];
  @observable markers = [];

  constructor() {
      console.log("Constructing object markers...");
      Fb.bikes.on('value', (snap) => {
        localMarkers = [];
        snap.forEach((marker) => {
          localMarkers.push({
            longitude: parseFloat(marker.val().positionLng),
            latitude: parseFloat(marker.val().positionLat),
            description: "Bike 1",
            title: "b" + String(marker.val().bike_no)
          })
        });
        this.markers.replace(localMarkers);
      });
  }

  @computed get getMarkers() {
    console.log("Getting markers.. which are:");
    console.log(JSON.stringify(markers));
    return markers.slice();
  }

  add = (bikeNo) => {
  };

  update = (bikeNo, data) => {

  };

  del = (bikeNo) => {

  };

}

const fbMarkers = new MarkersStore();
export {fbMarkers};
