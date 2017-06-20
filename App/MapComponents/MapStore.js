import {observable, computed} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from '../firebase.js';


class MapStore {
  //@observable markers = [];
  @observable usrLng = 0.0;
  @observable usrLat = 0.0;
  @observable watchID = null;

  getCurLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.usrLat = parseFloat(position.coords.latitude);
      this.usrLng = parseFloat(position.coords.longitude);
    }, (error) => alert(JSON.stringify(error)), {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000
    });
  }

  watchCurLocation() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("Recording GPS data from within the Store!!");
      this.usrLat = parseFloat(position.coords.latitude);
      this.usrLng = parseFloat(position.coords.longitude);
      }, (error) => console.log(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      });
  }

  clearWatch() {
    navigator.geolocation.clearWatch(this.watchID);
  }


}


const mapStore = new MapStore();
export {mapStore};
