import { observable, action } from 'mobx';

class Store {
    //@observable orientation = PORTRAIT;

    @action setGPS(lat, lng) {
      this.usr.lng = lng;
      this.usr.lat = lat;
    }


    @action changeOrientation(orientation) {
        this.orientation = orientation;
    }

    @action prevImage() {
        console.log('previous');
    }

    @action nextImage() {
        console.log('next');
    }
}

export default new Store();
