import {observable, computed, action} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {AsyncStorage} from 'react-native';
import {Fb} from './firebase.js';

class UserStore {

  /** GPS */
  @observable usrLng = 0.0;
  @observable usrLat = 0.0;
  @observable watchID = null;
  @observable startTime;
  @observable bikeObj = null;
  @observable uuid = "sampuuid";
  @observable userObj = null;

  spinnerVisible = false;

  constructor() {
    //TODO: do this only if this.uuid is not null! must have mechanism for this later
    this.downloadUserObj();
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

  /** USER */
  @action
  downloadUserObj() {
    return Fb.users
    .child(String(this.uuid))
    .once('value')
    .then( (userObj) => {
      this.userObj = userObj.val();
    });
  }

  async saveUserToken() {
    try {
      await AsyncStorage.setItem('@LocalStore:userToken', this.uuid);
    } catch (error) {
      console.log("Some funky error with AsyncStorage");
      console.log(error.message);
    }
  }

  async getUserToken() {
    try {
      const value = await AsyncStorage.getItem('@LocalStore:userToken');
      if(value != null) {
        this.uuid = value;
      }
    } catch (error) {
      console.log("Some funky error getting AsyncStorage");
      console.log(error.message);
    }
  }
  /*/ USER */

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
    this.startTimer();
    return this.downloadBikeObj()
    .then( () => this.updateBikeDataStartRide()) //TODO: Make sure this is successful
    .then( () => this.updateUserDataStartRide());
  }

  @action
  downloadBikeObj() {
    return Fb.staticBikes
    .child(String(this.bookedBikeNo))
    .once('value')
    .then( (bikeObj) => {
      this.bikeObj = bikeObj.val();
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
    return Fb.bikes.update(updateVals); //depending on whether this was successful or not, return true or false
  };

  updateUserDataStartRide() {
    var updateVals = {}
    updateVals[this.uuid] = {
      uuid: this.uuid //TODO: remove this in deployment
    };
    return Fb.users.update(updateVals); //depending on whether this was successful or not, return true or false
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
    return Fb.bikes.update(updateVals);
  }

  // BIKE BOOKING END
  endRidingBike() {
    this.setInterestBikeNo(-1);
    this.bookedBikeNo = -1;
    this.updateStaticBikeDataStopRide()
    .then(() => this.updateBikeDataStopRide())
    .then(() => this.updateUserDataStopRide())
    .then(() => this.this.endTimer());
  }

  updateBikeDataStopRide() {
    var updateVals = {}
    updateVals[this.bookedBikeNo] = {
      current_user: 0,
      positionLat: this.usrLat,
      positionLng: this.usrLng
    };
    return Fb.bikes.update(updateVals);
  }

  updateStaticBikeDataStopRide() {
    var updateVals = {};
    updateVals[this.bookedBikeNo] = {
      last_user: this.uuid,
    };
    return Fb.bikes.update(updateVals);
  }

  updateUserDataStopRide() {
    var updateVals = {}
    updateVals[this.uuid] = {
      bookedBikeNo: -1,
      uuid: this.uuid //TODO: remove this in deployment
    };
    return Fb.users.update(updateVals); //depending on whether this was successful or not, return true or false
  }
}

let userStore;
export function getUserStore() {
  if (!userStore) {
    userStore = new UserStore();
  }
  return userStore;
}
