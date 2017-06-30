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
    console.log("Logging interested bike...")
    return new Promise((resolve, reject) => {
      console.log(bn)
      this.interestBikeNo = bn;
      console.log(this.interestBikeNo)
      if (this.interestBikeNo != -1) {
        resolve();
      } else {
        reject();
      }
    });
  }

  @action
  bookInterestedBike() {
    //TODO: add a check whether interestedBike was set!
    console.log("Booking interested bike");
    console.log(this.interestBikeNo);
    console.log(this.bookedBikeNo);
    this.bookedBikeNo = this.interestBikeNo;
    console.log(this.interestBikeNo);
    console.log(this.bookedBikeNo);
    this.startTimer();
    return this.downloadBikeObj()
    .then(this.updateBikeDataStartRide()) //TODO: Make sure this is successful
    .then(this.updateUserDataStartRide())
    .catch((error) => {
      console.log("Something went wrong!");
      console.log(error);
      alert("Something went wrong!");
    });
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
    return Fb.users.child(this.uuid).child('bookedBikeNo').set(this.bookedBikeNo); //depending on whether this was successful or not, return true or false
  };

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
      console.log("Ending to ride bike...");
      console.log(this.bookedBikeNo);
      return this.updateStaticBikeDataStopRide()
      .then(this.updateBikeDataStopRide())
      .then(this.updateUserDataStopRide());
  }

  updateBikeDataStopRide() {
    var updateVals = {}
    console.log("Stopping ride.... Interesting Bike, then Booked Bike is: ");
    console.log(this.interestBikeNo);
    console.log(this.bookedBikeNo);
    updateVals[this.bookedBikeNo] = {
      bike_no: this.bookedBikeNo,
      current_user: 0,
      positionLat: this.usrLat + Math.random() * 0.3 - 0.15,
      positionLng: this.usrLng + Math.random() * 0.3 - 0.15
    };
    return Fb.bikes.update(updateVals);
  }

  updateStaticBikeDataStopRide() {
    return Fb.bikes.child(this.bookedBikeNo).child('last_user').set(this.uuid);
  }

  updateUserDataStopRide() {
    var updateVals = {}
    updateVals[this.uuid] = {
      bookedBikeNo: -1,
      uuid: this.uuid //TODO: remove this in deployment
    };
    this.setInterestBikeNo(-1);
    this.bookedBikeNo = -1;
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
