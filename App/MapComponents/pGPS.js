import { Provider as MobXProvider, observer, inject } from 'mobx-react/native';
import { Store } from '../Store.js';
import {React, Component} from 'react-native';

@inject('store') @observer
class pGPS {

  gpsPosLat = 0;
  gpsPosLng = 0;
  watchID = null;

  // constructor(){
  //   this.gpsPos.lat = 0;
  //   this.gpsPos.lng = 0;
  //
  //   this.watchID = null;
  // }

  getCurLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
      var initialRegion = {
        latitude: lat,
        longitude: lng
      };
      this.setState({
        gpsPosition: initialRegion
      });

    }, (error) => alert(JSON.stringify(error)), {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000
    });
  }

  watchCurLocation() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("Recording GPS data!");
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
      var lastRegion = {
        latitude: lat,
        longitude: lng
      };
      this.setState({
        gpsPosition: lastRegion
      }, (error) => console.log(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      });
    });
  }

  clearWatch() {
    navigator.geolocation.clearWatch(this.watchID);
  }

}

export default new pGPS();
