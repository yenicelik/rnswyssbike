import {observable, computed} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from './firebase.js';

class UserStore {

  /** GPS */
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


  /** BIKE BOOKING */
  @observable interestBikeNo = -1;
  @observable bookedBikeNo = -1;

  setInterestBikeNo(bn) {
    this.interestBikeNo = bn;
  }

  bookInterestedBike() {
    this.updateBikeData();
  }

  //Change input to (bikeNo, userID) later on
  updateBikeData() {
    console.log("Updating database entry with self...");
    console.log("Bike number is")
    console.log(this.bookedBikeNo);
    bookBikeNo = this.interestBikeNo;
    var updateVals = {}
    updateVals[this.interestBikeNo] = {
      bike_no: bookBikeNo,
      current_user: "self",
      positionLat: this.usrLat,
      positionLng: this.usrLng,
    };
    Fb.bikes.update(updateVals);
    return false; //depending on whether this was successful or not, return true or false
  };

}

const userStore = new UserStore();
export {userStore};
