import {observable, computed, action} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from './firebase.js';

class UserStore {

  /** GPS */
  @observable usrLng = 0.0;
  @observable usrLat = 0.0;
  @observable watchID = null;
  @observable startTime;
  @observable bikeObj = null;

  constructor() {
    //As a prototype, refer to the user as 'user1'
    Fb.bikes.child('user1').on('value', (snap) => {
      snap.forEach((marker) => {});
    });
  }

  /** DURATION */
  @action
  startTimer() {
    this.startTime = new Date().toLocaleString(); //Then, put this onto the firebase database
  }

  @computed get getCurDuration() {
    var delta = Date.now() - this.startTime;
    return Math.floor(delta / 1000); //returns how many minutes you've been riding
  }

  @action
  endTimer() {
    var delta = Date.now() - this.startTime;
    this.rideDuration = Math.floor(delta / 1000 / 60); //returns how many minutes you've been riding
  }
  /*/ DURATION */

  /** GPS */
  @action
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

  @action
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

  @action
  clearWatch() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  /*/ GPS */


  /** BIKE BOOKING  */
  @observable interestBikeNo = -1;
  @observable bookedBikeNo = -1;

  @action
  setInterestBikeNo(bn) {
    this.interestBikeNo = bn;
  }

  bookInterestedBike() {
    this.bookedBikeNo = this.interestBikeNo;
    this.updateBikeDataStartRide(); //TODO: Make sure this is successful
    this.downloadBikeObj();
    this.startTimer();
  }

  @action
  downloadBikeObj() {
    console.log("Downloading bike objects!");
    Fb.staticBikes.child(this.bookedBikeNo).on('value', (bikeObj => {
      console.log("The downloaded bike object is: ");
      console.log(bikeObj);
      console.log(JSON.stringify(bikeObj));
      bikeObj = bikeObj.val();
      console.log(bikeObj.bike_no);
      console.log(bikeObj.code);
      this.bikeObj = bikeObj;
    }))
  }

  updateBikeDataStartRide() {
    var updateVals = {}
    updateVals[this.interestBikeNo] = {
      bike_no: this.interestBikeNo,
      current_user: "self",
      positionLat: this.usrLat,
      positionLng: this.usrLng
    };
    Fb.bikes.update(updateVals);
    return false; //depending on whether this was successful or not, return true or false
  };

  /** BIKE BOOKING END */
  endRidingBike() {
    this.setInterestBikeNo(-1);
    this.bookedBikeNo = -1;
    this.updateBikeDataStopRide();
    this.endTimer();
  }

  updateBikeDataStopRide() {
    var updateVals = {}
    updateVals[this.bookedBikeNo] = {
      bike_no: this.bookedBikeNo, //this.bookedBikeNo,
      current_user: 0,
      positionLat: this.usrLat,
      positionLng: this.usrLng
    };
    Fb.bikes.update(updateVals);
  }
}

let userStore;
export function getUserStore() {
  if (!userStore) {
    userStore = new UserStore();
  }
  return userStore;
}
