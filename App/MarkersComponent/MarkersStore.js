import {observable, computed} from 'mobx';
import firebase from '../firebase.js';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from '../firebase.js';


class MarkersStore {
  //@observable markers = [];
  @observable markers = new ObservableMap([]);

  constructor() {
      console.log("Constructing object markers...");
      Fb.bikes.on('value', (snap) => {
        this.markers = [];
        snap.forEach((marker) => {
          this.markers.push({
            title: "b" + String(marker.val().bike_no),
            description: "Bike2",
            current_user: marker.val().current_user,
            lat: parseFloat(marker.val().positionLat),
            lng: parseFloat(marker.val().positionLng),
            _key: marker.key
          }
          )
        })
      });
  }

  getMarkers() {
    console.log("Getting markers.. which are:");
    console.log(JSON.stringify(this.markers));
    setInterval( () => {
      if (this.markers) {
        return this.markers;
      }
    }, 2000);
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
