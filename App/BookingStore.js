import {observable, computed} from 'mobx';
import {ObservableMap, toJS} from 'mobx';
import {Fb} from './firebase.js';

import {mapStore} from './MapComponents/MapStore.js';


class BookingStore {
  @observable bookedBikeNo = -1;

  //Change input to (bikeNo, userID) later on
  bookBike = (bikeNo) => {
    Fb.bikes.update({bikeNo: {
      bike_no: 0,
      current_user: "self",
      positionLat: mapStore.usrLat,
      positionLng: mapStore.usrLng
    }});
    this.bookedBikeNo = bikeNo;
    return false; //depending on whether this was successful or not, return true or false
  };

}

const bookingStore = new BookingStore();
export {bookingStore};
