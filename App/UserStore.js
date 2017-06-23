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
  @observable uuid = "sb2s42";

  spinnerVisible = false;

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


  // BIKE BOOKING START
  @observable interestBikeNo = -1;
  @observable bookedBikeNo = -1;

  @action
  setInterestBikeNo(bn) {
    this.interestBikeNo = bn;
  }

  @action
  bookInterestedBike() {
    this.bookedBikeNo = this.interestBikeNo;
    this.downloadBikeObj();
    this.updateBikeDataStartRide(); //TODO: Make sure this is successful
    this.updateUserDataStartRide();
    this.startTimer();
  }

  @action
  downloadBikeObj() {
    Fb.staticBikes.child(String(this.bookedBikeNo)).once('value', (bikeObj) => {
      this.bikeObj = bikeObj.val();
      console.log("Save object is: ");
      console.log(this.bikeObj);
    });
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

  updateUserDataStartRide() {
    var updateVals = {}
    updateVals[this.uuid] = {
      bike_no: this.bookedBikeNo,
      uuid: this.uuid //TODO: remove this in deployment
    };
    Fb.users.update(updateVals);
    return false; //depending on whether this was successful or not, return true or false
  };

  // BIKE BOOKING (DURING RIDE)
  autoUpdateBikeWrapper = () => {
    if (this.bookedBikeNo != -1) {
      this.updateBikeSettings();
    }
  }

  updateBikeSettings() {
    var updateVals = {}
    updateVals[this.bookedBikeNo] = {
      positionLat: this.usrLat,
      positionLng: this.usrLng
    }
    console.log("Updating bike settings");
    Fb.bikes.update(updateVals);
  }

  // BIKE BOOKING END
  endRidingBike() {
    this.setInterestBikeNo(-1);
    this.bookedBikeNo = -1;
    this.updateStaticBikeDataStopRide();
    this.updateBikeDataStopRide();
    this.updateUserDataStopRide();
    this.endTimer();
  }

  updateBikeDataStopRide() {
    var updateVals = {}
    updateVals[this.bookedBikeNo] = {
      bike_no: this.bookedBikeNo,
      current_user: 0,
      positionLat: this.usrLat,
      positionLng: this.usrLng
    };
    Fb.bikes.update(updateVals);
  }

  updateStaticBikeDataStopRide() {
    var updateVals = {};
    updateVals[this.bookedBikeNo] = {
      bike_no: this.bookedBikeNo,
      last_user: this.uuid,
    };
    Fb.bikes.update(updateVals);
  }

  updateUserDataStopRide() {
    var updateVals = {}
    updateVals[this.uuid] = {
      bike_no: -1,
      uuid: this.uuid //TODO: remove this in deployment
    };
    Fb.users.update(updateVals);
    return false; //depending on whether this was successful or not, return true or false
  }
}

let userStore;
export function getUserStore() {
  if (!userStore) {
    userStore = new UserStore();
  }
  return userStore;
}
